import express from "express";
import { 
  currentUser,
  login,
  logout, 
  register
} from "../controllers/AuthControllers";
import authMiddleware from "../middlewares/AuthMiddleware";
import { googleAuthController } from "../controllers/AuthControllers";
import passport from "../configs/passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, currentUser);
router.post("/logout", logout);

// Initiate Google login
router.get("/google/login", passport.authenticate("google", { 
  scope: ["profile", "email"],
  prompt: "select_account",
}));

// Handle Google login callback
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL + "/login", // Redirect on failure,
    session: false, // Use JWT, not session
  }),
  googleAuthController.googleLoginSuccess
  // async (req, res) => {
  //   // This callback handles login success!
  //   // We'll delegate to a controller
  //   // (see below for implementation)
  //   await (req as any).controllers.googleAuthController.googleLoginSuccess(req, res);
  // }
);

// // Optionally: Logout route for Google login (just clears cookie)
// router.post("/google/logout", (req, res) => {
//   res.clearCookie("user", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//   });
//   res.status(200).json({ success: true, message: "Logged out from Google" });
// });


export const authRoutes = router; 