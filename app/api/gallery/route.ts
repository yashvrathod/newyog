import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Media } from "@/lib/types";

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
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json({
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
      { error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (
      !session ||
      !["SUPER_ADMIN", "ADMIN", "EDITOR", "AUTHOR"].includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    } = body;

    if (!filename || !url) {
      return NextResponse.json(
        { error: "Filename and URL are required" },
        { status: 400 }
      );
    }

    // Determine mime type from URL
    const mimeType = url.toLowerCase().includes(".png")
      ? "image/png"
      : url.toLowerCase().includes(".jpg") ||
        url.toLowerCase().includes(".jpeg")
      ? "image/jpeg"
      : url.toLowerCase().includes(".gif")
      ? "image/gif"
      : url.toLowerCase().includes(".webp")
      ? "image/webp"
      : "image/jpeg";

    const media = await prisma.media.create({
      data: {
        filename,
        originalName: originalName || filename,
        mimeType,
        size: 0,
        url,
        alt,
        caption,
        description,
        folder,
        tags,
        createdById: session.user.id,
      },
    });

    return NextResponse.json(
      {
        data: media,
        message: "Gallery image added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
