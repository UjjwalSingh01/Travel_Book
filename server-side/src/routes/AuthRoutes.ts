import express from "express";
import { 
  currentUser,
  login,
  logout, 
  register
} from "../controllers/AuthControllers";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, currentUser);
router.post("/logout", logout);

export const authRoutes = router; 