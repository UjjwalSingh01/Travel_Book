import express, { Router } from "express";
import { addExperience, getAllItinerary, getItineraryById, toggleUpvote } from "../controllers/ItineraryController";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = express.Router()

router.get("/getItinerary", authMiddleware, getAllItinerary);
router.get("/getItineraryDescritpion/:id", authMiddleware, getItineraryById);
router.post('/addNewItinerary', authMiddleware, );
router.post('/:itinerayId/newExperience', authMiddleware, addExperience);
router.post('/:itineraryId/toggleUpvote', authMiddleware, toggleUpvote);

export const itineraryRoutes = router;