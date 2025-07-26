import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";
import { Gender, PrismaClient } from '@prisma/client'

dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

export interface RegisterType {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

interface LoginType {
  email: string;
  password: string
}

// User Sign-Up
export const register = async(req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, gender, dateOfBirth, password, confirmPassword }: RegisterType = req.body;

    // Check if All Details are there or not
    if (!firstName || !lastName || !email || !gender || !dateOfBirth || !password || !confirmPassword) {
      res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
      return;
    }

    // Check if Password and Confirm Password match
    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Passwords do not match. Please try again.",
      });
      return;
    }

    // Check if User Already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email is already registered. Please Sign-In to Continue.",
      });
      return;
    }

    // Hashing the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save New User
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth,
        password: hashedPassword,
        dateJoined: new Date(),
        lastLogin: null,
      }
    });

    // Generate JWT Token
    const token = jwt.sign({ 
        email: newUser.email, 
        id: newUser.id 
      }, 
      JWT_SECRET, {
        expiresIn: "1d",
    });

    // Cookie
    res.cookie("user", (token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    });

    res.status(200).json({
      success: true,
      user: `${newUser.firstName} ${newUser.lastName}`,
      message: "User registered successfully",
    });
    return;

  } catch (error) {
    console.error("Error in Sign-Up:", error);
    res.status(500).json({
      success: false,
      message: "Sign-Up Failure. Please Try Again",
    });
    return;
  }
};

// Sign-In
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    const { email, password }: LoginType = req.body;
    
    // Check if all the Fields are Filled
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please Fill up All the Required Fields",
      });
      return;
    }

    // Check if User is Already Registered 
    const user = await prisma.user.findUnique({ 
      where: { email }
    });

    console.log(user);
    
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Email is not Registered with Us. Please Sign-Up to Continue",
      });
      return;
    }
    
    // Check if the Password is Correct
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
      return;
    }
    
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate JWT Token
    const token = jwt.sign({ 
        email: user.email, 
        id: user.id 
      }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Cookie
    res.cookie("user", (token), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    });
  
    res.status(200).json({
      success: true,
      data: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        roles: user.role,
      },
      message: "Welcome back!, Logged in Successfully",
    });

  } catch (error) {
    console.error("Error in User Sign-In:", error);
    res.status(500).json({
      success: false,
      message: "Login Failure. Please Try Again",
    });
  }
};


export const currentUser = async(req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.id || !req.user?.email) {
      res.status(400).json({
        success: false,
        message: "Invalid request. User authentication is required.",
      });
      return;
    }

    const userId: string = req.user.id;
    const email: string = req.user.email;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }, 
      select: {
        firstName: true,
        lastName: true,
        role: true,
      }
    })
      
    res.status(200).json({
      success: true,
      data: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: email,
        roles: user?.role
      },
      message: "Succesfully Fetched Your Details"
    })

  } catch (error) {
    console.error("Error in Fetching Current User Details: ", error);
    res.status(500).json({
      success: false,
      message: "Current User Details Failure. Please Try Again",
    });
  }
}

// Log-out
export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('user', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    
    res.status(200).json({
      success: true,
      message: 'Logout Successful'
    });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ 
      success: false,
      message: "Logout failed" 
    });
  }
}


// Google Authentication
export const googleAuthController = {
  googleLoginSuccess: async (req: Request, res: Response): Promise<void> => {
    try {
      // Extract user information set by Passport Google Strategy
      const user = req.user as {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
      };

      if (!user) {
        res.status(401).json({
          success: false,
          message: "Google authentication failed",
        });
        return;
      }

      // Issue JWT (same logic as local login)
      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
      );

      res.cookie("user", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      // Redirect or respond as needed
      res.redirect(`${process.env.FRONTEND_URL}`);

    } catch (error) {
      console.error("Google login error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  },
};