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
    console.log(`Book descriptiom: ${book}`);
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
        message: 'You are not logged in. Please login to continue.'
      });
      return;
    }

    const userId = req.user.id;

    const books = await prisma.book.findMany({
      where: { addedById: userId },
      select: { 
        id: true,
        title: true,
        status: true,
        description: true,
        tags: true,
        imageUrl: true,
        visibility: true,
        pages: {
          select: {
            id: true,
            title: true,
            status: true,
            images: true,
            description: true,
            tips: true,
            // location: true, // Uncomment if needed
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

    if (!books || books.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No books found for this user.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Book details fetched successfully.',
      data: books
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
        message: 'Authentication required. Please login to continue.'
      });
      return;
    }

    const { bookId } = req.params; 
    const { title, description, tags, visibility, status } = req.body;

    // Validate required fields
    if (!title && !description && !tags && !visibility && !status && !req.file) {
      res.status(400).json({
        success: false,
        message: 'No update data provided'
      });
      return;
    }

    // Handle tags conversion
    let parsedTags: string[] = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
        // if (!Array.isArray(parsedTags) {
        //   throw new Error('Tags must be an array');
        // }
      } catch (e) {
        res.status(400).json({
          success: false,
          message: 'Invalid tags format. Please provide a valid JSON array.'
        });
        return;
      }
    }

    // Find the book to verify ownership
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    });

    if (!book) {
      res.status(404).json({ 
        success: false, 
        message: "Book not found" 
      });
      return;
    }

    // Verify ownership
    if (book.addedById !== req.user.id) {
      res.status(403).json({ 
        success: false, 
        message: "You don't have permission to edit this book" 
      });
      return;
    }

    // Prepare update data - only include provided fields
    const updateData: {
      title?: string;
      description?: string | null;
      tags?: string[];
      imageUrl?: string | null;
      visibility?: 'Private' | 'Public';
      status?: 'Planning' | 'Explored';
    } = {};

    if (title) updateData.title = title;
    if (description !== undefined) updateData.description = description || null;
    if (parsedTags.length > 0) updateData.tags = parsedTags;
    
    // Handle image upload
    if (req.file) {
      updateData.imageUrl = (req.file as any).path;
    }
    
    if (visibility) updateData.visibility = visibility as 'Private' | 'Public';
    if (status) updateData.status = status as 'Planning' | 'Explored';

    // Update the book
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: updateData
    });

    res.status(200).json({ 
      success: true, 
      message: "Book details updated successfully",
      data: updatedBook 
    });

  } catch (error) {
    console.error("Error updating book details:", error);
    
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
      message: "Internal server error" 
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