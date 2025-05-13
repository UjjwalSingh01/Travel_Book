import express from "express";
import { addItineraryToPage, addPageDetails, deleteItineraryFromPage } from "../controllers/PageController";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router()

router.post('/:pageId/addPageDetails', authMiddleware, addPageDetails);
router.post("/:pageId/addItinerariesToPage'", authMiddleware, addItineraryToPage);
router.delete("/:pageId/itinerary/:itineraryId", authMiddleware, deleteItineraryFromPage);

export const pageRoutes = router;