import express from "express";
import { addItineraryToPage, addPageDetails, deleteItineraryFromPage } from "../controllers/PageController";
import authMiddleware from "../middlewares/AuthMiddleware";
import upload from "../configs/MulterConfig";

const router = express.Router()

router.post('/:pageId/addPageDetails', authMiddleware, upload.array('images', 10), addPageDetails);
router.post("/:pageId/addItinerariesToPage", authMiddleware, addItineraryToPage);
router.delete("/:pageId/itinerary/:itineraryId", authMiddleware, deleteItineraryFromPage);

export const pageRoutes = router;