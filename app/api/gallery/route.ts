import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET - Fetch gallery images with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    const where: any = {
      mimeType: {
        startsWith: "image/", // Only get images for gallery
      },
    };

    if (category && category !== "all") {
      where.folder = category;
    }

    if (search) {
      where.OR = [
        { filename: { contains: search, mode: "insensitive" } },
        { alt: { contains: search, mode: "insensitive" } },
        { caption: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [images, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: images,
      pagination: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch gallery",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    // Check authentication
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

    const body = await request.json();
    const {
      filename,
      originalName,
      url,
      alt,
      caption,
      description,
      folder = "gallery",
      tags = [],
      width,
      height,
      size = 0,
    } = body;

    // Validation
    if (!filename || !url) {
      return NextResponse.json(
        { 
          success: false,
          error: "Filename and URL are required",
          details: "Missing required fields: filename, url"
        },
        { status: 400 }
      );
    }

    // Determine mime type from URL or filename
    const fileExtension = (url || filename).toLowerCase();
    let mimeType = "image/jpeg"; // default
    
    if (fileExtension.includes(".png")) {
      mimeType = "image/png";
    } else if (fileExtension.includes(".jpg") || fileExtension.includes(".jpeg")) {
      mimeType = "image/jpeg";
    } else if (fileExtension.includes(".gif")) {
      mimeType = "image/gif";
    } else if (fileExtension.includes(".webp")) {
      mimeType = "image/webp";
    } else if (fileExtension.includes(".svg")) {
      mimeType = "image/svg+xml";
    }

    // Create media record
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: originalName || filename,
        mimeType,
        size,
        url,
        alt: alt || filename,
        caption,
        description,
        folder,
        tags,
        width,
        height,
        createdById: session.user.id,
      },
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

    return NextResponse.json(
      {
        success: true,
        data: media,
        message: "Gallery image added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to create gallery item",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PUT - Update multiple gallery items (batch operations)
export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    const { action, ids, data } = body;

    if (!action || !ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { 
          success: false,
          error: "Invalid request format",
          details: "Required fields: action, ids (array)"
        },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case "delete":
        result = await prisma.media.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
        break;

      case "update_folder":
        if (!data?.folder) {
          return NextResponse.json(
            { 
              success: false,
              error: "Folder is required for update_folder action" 
            },
            { status: 400 }
          );
        }
        result = await prisma.media.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            folder: data.folder,
          },
        });
        break;

      case "update_tags":
        if (!data?.tags || !Array.isArray(data.tags)) {
          return NextResponse.json(
            { 
              success: false,
              error: "Tags array is required for update_tags action" 
            },
            { status: 400 }
          );
        }
        result = await prisma.media.updateMany({
          where: {
            id: {
              in: ids,
            },
          },
          data: {
            tags: data.tags,
          },
        });
        break;

      default:
        return NextResponse.json(
          { 
            success: false,
            error: "Invalid action",
            details: "Supported actions: delete, update_folder, update_tags"
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ${action} ${result.count} items`,
      data: { count: result.count },
    });
  } catch (error) {
    console.error("Error in batch operation:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to perform batch operation",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete all gallery items (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ 
        success: false,
        error: "Unauthorized - Super Admin required" 
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");

    const where: any = {
      mimeType: {
        startsWith: "image/",
      },
    };

    if (folder) {
      where.folder = folder;
    }

    const result = await prisma.media.deleteMany({
      where,
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.count} gallery items`,
      data: { count: result.count },
    });
  } catch (error) {
    console.error("Error deleting gallery items:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to delete gallery items",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
