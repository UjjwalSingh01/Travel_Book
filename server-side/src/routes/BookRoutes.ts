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

const router = express.Router();

router.get("/myBook", authMiddleware, getMyBook);
router.get('/getBookDescription/:id', getBookDescriptionById);
router.get('/getPlanningBookDescription/:id', authMiddleware, getPlanningBookById);
router.post('/createBook', authMiddleware, createBook);
router.get('/getBookWithPages', authMiddleware, getBookWithPages);
router.post('/addBookDetails', authMiddleware, addBookDetails);
router.post("/:bookId/addPageToBook", authMiddleware, addPageToBook);
router.delete('/deleteBook/:bookId', authMiddleware, deleteBook);
router.delete("/:bookId/pages/:pageId", authMiddleware, deletePageFromBook);

export const bookRoutes = router;