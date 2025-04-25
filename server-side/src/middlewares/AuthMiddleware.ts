import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Define the structure of the decoded JWT payload
export interface DecodedUser {
  id: string;
  email: string;
}

// Extend the Request type to include the `user` property
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenCookie = req.cookies.user; // Get token from cookies

    if (!tokenCookie) {
      res.status(401).json({
        success: false,
        message: "Access Denied: No Token Provided",
      });
      return;
    }

    // Verify and decode the token
    const decoded = jwt.verify(tokenCookie, JWT_SECRET) as DecodedUser;
    req.user = decoded; // Attach user data to the request object

    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Forbidden: Invalid or expired token",
    });
    return;
  }
};

export default authMiddleware;