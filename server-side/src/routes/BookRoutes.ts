import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware";
import { 
  createBook, 
  addBookDetails, 
  addPageToBook, 
  deletePageFromBook, 
  getBookDescriptionById, 
  getMyBook, 
  getBookWithPages,
  getPlanningBookById,
  deleteBook
} from "../controllers/BookController";
import upload from "../configs/MulterConfig";

const router = express.Router();

router.get("/myBooks", authMiddleware, getMyBook);
router.get('/getBookDescription/:id', getBookDescriptionById);
router.get('/getPlanningBookDescription/:id', authMiddleware, getPlanningBookById);
router.post('/createBook', authMiddleware, createBook);
router.get('/getBookWithPages', authMiddleware, getBookWithPages);
router.put("/:bookId/addBookDetails", authMiddleware, upload.single('image'), addBookDetails);
router.post("/:bookId/addPageToBook", authMiddleware, addPageToBook);
router.delete('/deleteBook/:bookId', authMiddleware, deleteBook);
router.delete("/:bookId/deletePageFromBook/:pageId", authMiddleware, deletePageFromBook);

export const bookRoutes = router;