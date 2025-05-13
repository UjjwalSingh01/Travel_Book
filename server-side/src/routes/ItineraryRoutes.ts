import express from "express";
import { addExperience, addNewItinerary, getAllItineraries, getItineraryById, toggleUpvote } from "../controllers/ItineraryController";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router()

router.get("/getItineraries", authMiddleware, getAllItineraries);
router.get("/getItineraryDescritpion/:id", getItineraryById);
router.post('/addNewItinerary', authMiddleware, addNewItinerary);
router.post('/:itinerayId/newExperience', authMiddleware, addExperience);
router.post('/:itineraryId/toggleUpvote', authMiddleware, toggleUpvote);

export const itineraryRoutes = router;