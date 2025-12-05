import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET - Get single gallery item by ID
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = params;

    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!media) {
      return NextResponse.json(
        { 
          success: false,
          error: "Gallery item not found" 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch gallery item",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PUT - Update single gallery item
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getSession();
    if (
      !session ||
      !["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"].includes(session.user.role)
    ) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Check if item exists
    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json(
        { 
          success: false,
          error: "Gallery item not found" 
        },
        { status: 404 }
      );
    }

    // Extract updateable fields
    const {
      filename,
      originalName,
      url,
      alt,
      caption,
      description,
      folder,
      tags,
      width,
      height,
    } = body;

    const updateData: any = {};

    // Only update provided fields
    if (filename !== undefined) updateData.filename = filename;
    if (originalName !== undefined) updateData.originalName = originalName;
    if (url !== undefined) {
      updateData.url = url;
      // Update mime type if URL changes
      const fileExtension = url.toLowerCase();
      if (fileExtension.includes(".png")) {
        updateData.mimeType = "image/png";
      } else if (fileExtension.includes(".jpg") || fileExtension.includes(".jpeg")) {
        updateData.mimeType = "image/jpeg";
      } else if (fileExtension.includes(".gif")) {
        updateData.mimeType = "image/gif";
      } else if (fileExtension.includes(".webp")) {
        updateData.mimeType = "image/webp";
      } else if (fileExtension.includes(".svg")) {
        updateData.mimeType = "image/svg+xml";
      }
    }
    if (alt !== undefined) updateData.alt = alt;
    if (caption !== undefined) updateData.caption = caption;
    if (description !== undefined) updateData.description = description;
    if (folder !== undefined) updateData.folder = folder;
    if (tags !== undefined) updateData.tags = tags;
    if (width !== undefined) updateData.width = width;
    if (height !== undefined) updateData.height = height;

    const updatedMedia = await prisma.media.update({
      where: { id },
      data: updateData,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedMedia,
      message: "Gallery item updated successfully",
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to update gallery item",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete single gallery item
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const session = await getSession();
    if (
      !session ||
      !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.user.role)
    ) {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const { id } = params;

    // Check if item exists
    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json(
        { 
          success: false,
          error: "Gallery item not found" 
        },
        { status: 404 }
      );
    }

    // Delete the item
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Gallery item deleted successfully",
      data: { id },
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to delete gallery item",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}