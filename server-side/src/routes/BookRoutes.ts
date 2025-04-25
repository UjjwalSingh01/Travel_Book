import express from "express";
import authMiddleware from "../middlewares/AuthMiddleware";
import { 
    createBook, 
    addBookDetails, 
    addPageToBook, 
    deletePageFromBook, 
    getBookDescriptionById, 
    getMyBook, 
    getBookWithPages
} from "../controllers/BookController";

const router = express.Router();

router.get("/myBook", authMiddleware, getMyBook);
router.get('/getBookDescription/:id', getBookDescriptionById);
router.get('/getBookWithPages', authMiddleware, getBookWithPages);
router.post('/createBook', authMiddleware, createBook);
router.post("/:bookId/addPageToBook", authMiddleware, addPageToBook);

router.post('/add-book-details', authMiddleware, addBookDetails);
router.delete("/:bookId/pages/:pageId", authMiddleware, deletePageFromBook);

export const bookRoutes = router;