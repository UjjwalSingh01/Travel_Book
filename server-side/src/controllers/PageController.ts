import { Request, Response } from "express";
import { BookStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST Add Page Details Once Explored
export const addPageDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageId } = req.params;
    const { title, description, tips } = req.body;

    // Find existing page    
    const page = await prisma.page.findFirst({
      where: {
        id: pageId
      }
    })
    if (!page) {
      res.status(404).json({ 
        success: false, 
        message: "Page not found" 
      });
      return;
    }

    let imageUrls: string[] = [];

    if (Array.isArray(req.files)) {
      imageUrls = (req.files as Express.Multer.File[]).map(file => (file as any).path);
    } else if (req.files && req.files['images']) {
      imageUrls = (req.files['images'] as Express.Multer.File[]).map(file => (file as any).path);
    } else if (req.file) {
      imageUrls = [(req.file as any).path];
    }

    const updatedPage = await prisma.page.update({
      where: { id: pageId },
      data: {
        title: title,
        images: imageUrls,
        description: description,
        tips: tips,
        status: BookStatus.Explored,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Page details updated successfully",
      data: updatedPage,
    });

  } catch (error) {
    console.error("Error updating page:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update page details",
    });
  }
};

// POST Add Itinerary to Page
export const addItineraryToPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageId } = req.params;
    const { itineraryId } = req.body;

    const page = await prisma.page.update({
      where: { id: pageId },
      data: {
        itineraries: {
          connect: { id: itineraryId },
        },
      },
      include: { itineraries: true },
    });

    if (!page) {
      res.status(404).json({
        success: false,
        message: 'Page not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Itinerary added to page",
      data: page,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to add itinerary to page",
    });
  }
};
  

// DELETE Itinerary from Page
// /pages/:pageId/itineraries/:itineraryId
export const deleteItineraryFromPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pageId, itineraryId } = req.params;

    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: { itineraries: true },
    });

    if (!page) {
      res.status(404).json({ 
        success: false, 
        message: "Page not found" 
      });
      return;
    }

    // Check if itinerary exists on the page
    const itineraryExists = page.itineraries.some((itinerary) => itinerary.id === itineraryId);
    if (!itineraryExists) {
      res.status(404).json({ 
        success: false, 
        message: "Itinerary not found on this page" 
      });
      return;
    }

    // Remove the itinerary from the page
    await prisma.page.update({
      where: { id: pageId },
      data: {
        itineraries: {
          disconnect: { id: itineraryId },
        },
      },
    });

    res.status(200).json({ 
      success: true, 
      message: "Itinerary deleted" 
    });
 
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to delete itinerary from page" 
    });
  }
};