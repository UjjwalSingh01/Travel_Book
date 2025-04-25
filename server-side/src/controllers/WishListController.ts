// import { Request, Response } from "express";
// import Wishlist from "../models/WishListModel";

// export const addToWishlist = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, type, bookId, cardId } = req.body;

//     if (!["book", "card"].includes(type)) {
//       res.status(400).json({ message: "Invalid type. Must be 'book' or 'card'" });
//       return;
//     }

//     let wishlist = await Wishlist.findOne({ user: userId });

//     if (!wishlist) {
//       wishlist = new Wishlist({ user: userId, items: [] });
//     }

//     // Ensure only one type (book or card) is added
//     if (type === "book" && !bookId) {
//       res.status(400).json({ message: "Book ID is required for type 'book'" });
//       return;
//     }
//     if (type === "card" && !cardId) {
//       res.status(400).json({ message: "Card ID is required for type 'card'" });
//       return;
//     }

//     // Check if the book or card is already in the wishlist
//     const exists = wishlist.items.some((item) =>
//       (type === "book" && item.book?.equals(bookId)) ||
//       (type === "card" && item.card?.equals(cardId))
//     );

//     if (exists) {
//       res.status(400).json({ message: "Item already in wishlist" });
//       return;
//     }

//     // Add to wishlist
//     wishlist.items.push({
//       type,
//       book: type === "book" ? bookId : undefined,
//       card: type === "card" ? cardId : undefined,
//       addedAt: new Date(), // Ensure addedAt is included
//     });

//     await wishlist.save();

//     res.status(201).json({ 
//       success: true,
//       message: "Item added to wishlist", 
//       data: wishlist 
//     });
//   } catch (error) {
//     console.log('Internal Error To Add Wishlist: ', error);
//     res.status(500).json({ 
//       success: false,
//       message: "Internal Server Error", error 
//     });
//   }
// };


// export const removeFromWishlist = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { userId, type, bookId, cardId } = req.body;

//     const wishlist = await Wishlist.findOne({ user: userId });

//     if (!wishlist) {
//       res.status(404).json({ message: "Wishlist not found" });
//       return;
//     }

//     wishlist.items = wishlist.items.filter((item) =>
//       !(type === "book" && item.book?.equals(bookId)) &&
//       !(type === "card" && item.card?.equals(cardId))
//     );

//     await wishlist.save();

//     res.status(200).json({
//       success: true,
//       message: "Item removed from wishlist", 
//       data: wishlist 
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };


// export const getWishlist = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.user?.id;

//     const wishlists = await Wishlist.findOne({ user: userId })
//       .populate("items.book")
//       .populate("items.card");
    

//     if (!wishlist) {
//       res.status(404).json({ message: "Wishlist not found" });
//       return;
//     }

//     res.status(200).json(wishlist);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error });
//   }
// };
  