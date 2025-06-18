import express from "express";
import { 
  addExperience, 
  addNewItinerary, 
  getAllItineraries, 
  getItineraryById, 
  toggleUpvote 
} from "../controllers/ItineraryController";
import authMiddleware from "../middlewares/AuthMiddleware";
import upload from "../configs/MulterConfig";

const router = express.Router()

router.get("/getItineraries", getAllItineraries);
router.get("/getItineraryDescritpion/:id", getItineraryById);
router.post('/:pageId/addNewItinerary', authMiddleware, upload.array('images', 10), addNewItinerary);
router.post('/:itinerayId/newExperience', authMiddleware, addExperience);
router.post('/:itineraryId/toggleUpvote', authMiddleware, toggleUpvote);

export const itineraryRoutes = router;