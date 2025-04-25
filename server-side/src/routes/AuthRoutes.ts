import express from "express";
import { 
    currentUser,
    login,
    logout, 
    register
} from "../controllers/AuthControllers";

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/me", currentUser);
router.post("/logout", logout);

export const authRoutes = router; 
