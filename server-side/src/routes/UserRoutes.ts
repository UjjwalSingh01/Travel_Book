import express from "express";
import { getUserProfile, resetPassword, updateUserProfile } from "../controllers/UserProfileController";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

// router.get("/map", authMiddleware, getMap)
router.get('/userProfile', authMiddleware, getUserProfile);
router.post('/updateUserProfile', authMiddleware, updateUserProfile);
router.post('/resetPassword', authMiddleware, resetPassword);

export const userRoutes = router;