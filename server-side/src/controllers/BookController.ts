import { Request, Response } from "express";
import { BookStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getMyBook = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'You are not Logged In. Please login to continue.'
      });
      return;
    }

    const user = req.user;

    const books = await prisma.book.findMany({
      where: {
        addedById: user.id
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        visibility: true,
        status: true,
      }
    })

    console.log(books);

    res.status(200).json({ 
      success: true,
      message: "Successfully Fetched Your Books",
      data: books
    });

  } catch (error) {
    console.error('Server Error In Fetching your Books: ', error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error In Fetching your Books. Please Try Again." 
    });
  }
};

// GET Book By ID (With all pages & itineraries)
export const getBookDescriptionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId: string = req.params.id;

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        id: true,
        title: true, 
        description: true,
        tags: true,
        imageUrl: true,
        pages: {
          select: {
            id: true,
            title: true,
            description: true,
            tips: true,
            images: true,
            itineraries: {
              select: {
                id: true,
                title: true,
                category: true,
                location: true,
              }
            }
          }
        }
      }
    })
    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: "Book not found" 
      });
      return;
    }

    console.log(book);

    res.status(200).json({ 
      success: true, 
      message: "Successfully fetched book details",
      data: book
    });

  } catch (error) {
    console.error("Error fetching book details: ", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error while fetching book details" 
    });
  }
};


export const getPlanningBookById = async(req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'You are not Logged In. Please login to continue.'
      });
      return;
    }

    const user = req.user;
    const bookId: string = req.params.bookId;
    
    const book = await prisma.book.findFirst({
      where: { id: bookId },
      select: {
        id: true,
        title: true,
        status: true,
        description: true,
        tags: true,
        visibility: true,
        addedById: true,
        pages: {
          select: {
            id: true,
            title: true,
            status: true,
            // location: {
            //   select: {
            //     latitude: true,
            //     longitude: true
            //   }
            // },
            itineraries: {
              select: {
                id: true,
                title: true
              }
            }
          }
        }
      }
    });
    
    if(!book){
      res.status(404).json({
        success: false,
        message: 'Book Not Found'
      })
    }

    if(book?.addedById !== user.id){
      res.status(401).json({
        success: false,
        message: "Not Authorized"
      })
    }

    res.status(200).json({
      success: true,
      message: 'Book Fetched Successfully',
      data: book
    })

  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error while fetching book details" 
    });
  }
}

// POST Add Book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'You are not Logged In. Please login to continue.'
      });
      return;
    }

    const user = req.user;
    const { title } = req.body;

    if(!title){
      res.status(404).json({
        success: false,
        message: 'Title is required'
      });
      return;
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        addedBy: { connect: { id: user.id } },
        status: BookStatus.Planning,
      },
      select: {
        id: true,
        title: true,
        status: true,
        pages: true,
      }
    })

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook
    });

  } catch (error) {
    console.error("Error in Fetching Book Details: ", error);
    res.status(500).json({
      success: false,
      message: 'Failed to Fetching Book Details'
    });
  }
};


export const getBookWithPages = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'You are not Logged In. Please login to continue.'
      });
      return;
    }

    const user = req.user;

    const bookData = await prisma.book.findFirst({
      where: { id: user.id },
      select: { 
        id: true,
        title: true,
        status: true,
        pages: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    console.log(bookData);

    if (!bookData) {
      res.status(404).json({
        success: false,
        message: 'Book not found for this user.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book details fetched successfully.',
      data: bookData
    });

  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch book details.'
    });
  }
};


// POST Add Book
export const addBookDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'You are not Logged In. Please login to continue.'
      });
      return;
    }

    const { id } = req.params; 
    const { title, description, tags, visibility, status } = req.body;

    let imageUrl: string | undefined;

    if (req.file) {
      imageUrl = (req.file as any).path; // Cloudinary returns secure URL here
    } else {
      imageUrl = undefined;
    }


    const book = await prisma.book.findFirst({
      where:{ id }
    })
    if (!book){
      res.status(404).json({ 
        success: false, 
        message: "Book not found" 
      });
      return;
    }

    // Ensure only the book owner can modify details
    if (book.addedById !== req.user?.id) {
      res.status(403).json({ 
        success: false, 
        message: "Access denied"
      });
      return;
    }

    const updateBook = await prisma.book.update({
      where: { id: id },
      data: {
        title: title || book.title,
        description: description || book.description,
        tags: tags || book.tags,
        imageUrl: imageUrl,
        visibility: visibility || book.visibility,
        status: status || book.status
      }
    })

    res.status(201).json({ 
      success: true, 
      message: "Book details updated successfully",
      data: updateBook 
    });

  } catch (error) {
    console.error("Error in Updating Book Details", error);

     // Handle Prisma errors
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === 'P2025') {
    //     return res.status(404).json({ 
    //       success: false, 
    //       message: "Book not found" 
    //     });
    //   }
    // }
    res.status(500).json({ 
      success: false, 
      message: "Failed to update book details" 
    });
  }
};


export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const userId = req.user?.id;

    // Verify book exists and belongs to user
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { addedById: true }
    });

    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
      return;
    }

    if (book.addedById !== userId) {
      res.status(403).json({ 
        success: false, 
        message: 'Unauthorized to delete this book' 
      });
      return;
    }

    // Transaction to delete all related data
    await prisma.$transaction([
      // 1. Delete page itineraries connected to this book's pages
      prisma.itinerary.deleteMany({
        where: {
          page: {
            bookId: bookId
          }
        }
      }),

      // 2. Delete all pages in the book
      prisma.page.deleteMany({
        where: {
          bookId: bookId
        }
      }),

      // 3. Finally delete the book itself
      prisma.book.delete({
        where: {
          id: bookId
        }
      })
    ]);

    res.status(200).json({
      success: true,
      message: 'Book and all associated data deleted successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete book'
    });
  }
};


// POST Add Page to Book
export const addPageToBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const { title } = req.body;

    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    // Create a new page and associate it with the book
    const newPage = await prisma.page.create({
      data: {
        title,
        book: { connect: { id: bookId } },
        status: BookStatus.Planning, 
      },
      select: {
        id: true,
        title: true,
      }
    });

    res.status(201).json({
      success: true,
      message: "Page created successfully",
      data: newPage,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create page",
    });
  }
};
  
// DELETE Page from Book
export const deletePageFromBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId, pageId } = req.params;

    // Check if the book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { pages: true },
    });

    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: "Book not found" 
      });
      return;
    }

    // Check if the page exists in the book
    const pageExists = book.pages.some((page) => page.id === pageId);
    if (!pageExists) {
      res.status(404).json({ success: false, message: "Page not found in the book" });
      return;
    }

    await prisma.$transaction([
      // Disassociate itineraries from the page (set pageId to null)
      prisma.itinerary.updateMany({
        where: { pageId: pageId },
        data: { pageId: null }, // Requires schema change to allow null
      }),
      // Delete the page
      prisma.page.delete({ where: { id: pageId } }),
    ]);

    res.status(200).json({
      success: true,
      message: "Page and associated itineraries deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the page",
    });
  }
};