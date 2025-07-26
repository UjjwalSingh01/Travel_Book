import { Request, Response } from 'express';
import { Category, PrismaClient, Visibility } from "@prisma/client";
import { formatDate } from '../utils/FormatDate/FormatDate';

const prisma = new PrismaClient();

export const getAllItineraries = async (req: Request, res: Response): Promise<void> => {
  try {
    const itineraries = await prisma.itinerary.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        location: true,
        images: true,
        rating: true,
        views: true,
        addedBy: {
          select: { 
            firstName: true, 
            lastName: true 
          }
        }
      }
    });

    const transformedItineraries = itineraries.map(itinerary => ({
      ...itinerary,
      images: itinerary.images[0],
      location: typeof itinerary.location === 'object' 
        ? itinerary.location 
        : JSON.parse(itinerary.location as string)
    }));

    const books = await prisma.book.findMany({
      where: { visibility: Visibility.Public },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        addedBy: { 
          select: { 
            firstName: true, 
            lastName: true 
          } 
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Itinerary Fetched Successfully",
      data: {
        itineraries: transformedItineraries,
        books: books
      }
    });

  } catch (error) {
    console.log("Internal Error in Fetching All Itinerary: ", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Error in Fetching All Itinerary"
    });
  }
};

// GET Itinerary By ID
export const getItineraryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const itineraryId = req.params.id;
    
    const itinerary = await prisma.itinerary.findFirst({
      where: { id: itineraryId },
      include: {
        addedBy: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        experiences: {
          select: {
            id: true,
            comment: true,
            upVotes: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
    if (!itinerary) {
      res.status(404).json({ 
        success: false, 
        message: "Itinerary not found" 
      });
      return;
    }

    // Safe image access with fallback
    const primaryImage = itinerary.images?.[0];

    const formattedExperiences = itinerary.experiences.map(exp => ({
      id: exp.id,
      experience: exp.comment,
      upVotes: exp.upVotes,
      user: {
        name: `${exp.user.firstName} ${exp.user.lastName}`,
        avatar: exp.user.profileImage || ""
      }
    }));

    const formattedItinerary = {
      banner: {
        image: primaryImage,
        title: itinerary.title,
        addedBy: `${itinerary.addedBy.firstName} ${itinerary.addedBy.lastName}`,
        lastUpdatedAt: formatDate(itinerary.updatedAt),
      },
      caption: itinerary.caption || "",
      highlights: {
        images: itinerary.images?.slice(1, 6) || [],
      },
      experiences: formattedExperiences,
    };

    res.status(200).json({
      success: true,
      message: "Itinerary fetched successfully",
      data: formattedItinerary
    });

  } catch (error) {
    console.error("Error fetching itinerary:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching itinerary details"
    });
  }
};


export const addExperience = async(req: Request, res: Response): Promise<void> => {
  try {
    if(!req.user){
      res.status(401).json({
        success: false,
        message: 'Not Logged In. Please Login'
      })
      return;
    }

    const user = req.user;
    const { comment } = req.body;
    const itineraryId = req.params.itinerayId;

    // Create new experience
    const newExperience = await prisma.experience.create({
      data: {
        comment,
        userId: user.id, 
        itineraryId,
        upVotes: []
      },
      include: {
        user: true,    // Include user relation if needed
        itinerary: true // Include itinerary relation if needed
      }
    });

    res.status(201).json({
      success: true,
      message: 'Experience added successfully',
      data: newExperience
    });

  } catch (error) {
    console.error("Error fetching itinerary:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching itinerary details"
    });
  }
}


export const toggleUpvote = async(req: Request, res: Response): Promise<void> => {
  try{
    if(!req.user){
      res.status(401).json({
        success: false,
        message: 'Not Logged In. Please Login'
      })
      return;
    }

    const experienceId = req.params.experienceId;
    const userId: string = req.user.id;

    const existingExperience = await prisma.experience.findUnique({
      where: { id: experienceId },
      select: { upVotes: true }
    });

    if (!existingExperience) {
      res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
      return;
    }

    const hasUpvoted = existingExperience.upVotes.includes(userId);

    const updatedExperience = await prisma.experience.update({
      where: { id: experienceId },
      data: {
        upVotes: hasUpvoted
          ? { set: existingExperience.upVotes.filter(id => id !== userId) } // Remove upvote
          : { push: userId }
      },
      include: {
        user: true,
        itinerary: true
      }
    });

    res.status(200).json({
      success: true,
      message: `Upvote ${hasUpvoted ? 'removed' : 'added'} successfully`,
      data: {
        ...updatedExperience,
        upvoteCount: updatedExperience.upVotes.length
      }
    });

  } catch (error) {
    console.error("Error toggling upvote:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating upvote"
    });
  }
}


interface ItineraryData {
  title: string;
  description?: string;
  caption?: string;
  category: Category
  location: {
    latitude: number;
    longitude: number;
    address: string;
  }
  rating: number;
  experience?: {
    comment: string;
    upVotes?: number;
  };
}

//itineraries/:pageId/addNewItinerary
export const addNewItinerary = async(req: Request, res: Response): Promise<void> => {
  try {
    const creator = req.user;

    const userExists = await prisma.user.findFirst({
      where: {
        id: creator?.id
      }
    })
    if(!userExists){
      res.status(404).json({
        success: false,
        message: 'User Not Registered'
      });
      return;
    }

    const pageId = req.params.pageId;

    const pageExists = await prisma.page.findFirst({
      where: { id: pageId }
    })
    if(!pageExists){
      res.status(404).json({
        success: false,
        message: 'Selected Page Not Found'
      });
      return;
    }

    const itinerary: ItineraryData = {
      title: req.body.title,
      description: req.body.description,
      // caption: req.body.caption,
      category: req.body.category,
      location: {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        address: req.body.address,
      },
      rating: parseFloat(req.body.rating),
      experience: req.body.experienceComment,
    };

    let imageUrls: string[] = [];
    if (req.files) {
      if (Array.isArray(req.files)) {
        imageUrls = req.files.map(file => (file as any).path);
      } else if (req.files['images']) {
        imageUrls = req.files['images'].map(file => (file as any).path);
      }
    }

    // Create the itinerary
    const newItinerary = await prisma.itinerary.create({
      data: {
        title: itinerary.title,
        description: itinerary.description || "",
        // caption: itinerary.caption || "", 
        category: itinerary.category,
        images: imageUrls,
        location: itinerary.location,
        rating: itinerary.rating,
        addedById: userExists.id,
        pageId: pageId,
      },
    });

    // If experience was passed, create the related experience
    if (itinerary.experience?.comment) {
      await prisma.experience.create({
        data: {
          comment: itinerary.experience.comment,
          upVotes: [],
          userId: userExists.id,
          itineraryId: newItinerary.id,
        },
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'New Itinerary Added Successfully',
      data: newItinerary
    })

  } catch (error) {
    console.error('Error in Adding New Itinerary: ', error);
    res.status(500).json({
      success: false,
      message: "Internal server error while Adding New Itinerary"
    })
  }
}