// get Profile
// update Profile
import { Request, Response } from "express";
import bcrypt from "bcryptjs"
import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export const getMap = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId: string | undefined = req.user?.id;
//     const books = await BookModel.find({ userId, status: "Explored" })
//       .populate({
//         path: "pages",
//         select: "location", // Only fetch location field
//       })
//       .lean(); // Converts Mongoose documents to plain JavaScript objects
    
//     const locations = books.flatMap(book => 
//       (book.pages as IPage[]).map(page => ({
//         latitude: page.location.latitude,
//         longitude: page.location.longitude
//       }))
//     );
    
//     res.status(500).json({ 
//       success: true,
//       message: "",
//       data: locations 
//     });

//   } catch (error) {
//     console.error(error);
//       res.status(500).json({
//       success: false,
//       message: ""
//     })
//   }
// };

// GET User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string | undefined = req.user?.id;
    
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      select: {
        password: false
      }
    })

    if (!user) {
      res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
      return;
    }

    res.status(201).json({ 
      success: true, 
      message: "User Details Fetched Successfully",
      data: user 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error in Fetching User Details" 
    });
  }
};

interface UpdateDetails {
  firstName?: string,
  lastName?: string;
  bio?: string;
  profileImage?: string;
  socialLinks?: string;
  email?: string;
  phoneNumber?: string;
  gender?: Gender;
}

// PATCH Update User Profile
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string | undefined = req.user?.id;
    const { firstName, lastName, bio, profileImage, socialLinks, email, phoneNumber, gender }: UpdateDetails = req.body;

    // Find and update the user
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })
    if (!user) {
      res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
      return;
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        bio: bio || user.bio,
        profileImage: profileImage || user.profileImage,
        email: email || user.email,
        phoneNumber: phoneNumber || user.phoneNumber,
        gender: gender || user.gender,
        // socialLinks: 
      }
    })

    res.status(201).json({ 
      success: true, 
      message: "Profile updated successfully", 
      data: user 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error in Updating User Profile" 
    });
  }
};


interface ResetPasword {
  oldPassword: string;
  newPassword: string;
}
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword }: ResetPasword = req.body;
    if(!newPassword || !oldPassword) {
      res.status(401).json({
        success: false,
        message: "All fields Required"
      })
      return;
    }

    const userId = req.user?.id;
    const user = await prisma.user.findFirst({
      where: { id: userId }
    })
    if(!user){
      res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isMatch){
      res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      })
      return;
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: newHashedPassword }
    })

    res.status(201).json({
      success: true,
      message: "Password Reset Successfully",
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
}