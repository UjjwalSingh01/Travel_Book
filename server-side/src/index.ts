import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/AuthRoutes";
import { userRoutes } from "./routes/UserRoutes";
import { DecodedUser } from "./middlewares/AuthMiddleware";
import { wishListRoutes } from "./routes/WishListRoutes";
import { pageRoutes } from "./routes/PageRoutes";
import { bookRoutes } from "./routes/BookRoutes";
import { itineraryRoutes } from "./routes/ItineraryRoutes";
// import multer from "multer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}


app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // Ensure file uploads work properly
app.use(cookieParser());


// Multer middleware for form-data
// const upload = multer(); // No storage configuration needed for non-file fields


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use('/api/v1/page', pageRoutes);
app.use('/api/v1/book', bookRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);
// app.use('/api/v1/wishlist', wishListRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});