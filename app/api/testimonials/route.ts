import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Testimonial } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where: any = {
      isActive: true,
    };

    if (featured === "true") {
      where.isFeatured = true;
    }

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication for admin access
    const session = await getSession();
    if (!session || !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      content,
      authorName,
      authorTitle,
      authorCompany,
      authorImage,
      authorEmail,
      rating = 5,
      source,
      isFeatured = false,
      isActive = true,
      isVerified = false,
    } = body;

    // Validate required fields
    if (!content || !authorName) {
      return NextResponse.json(
        { error: "Content and author name are required" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        content,
        authorName,
        authorTitle: authorTitle || null,
        authorCompany: authorCompany || null,
        authorImage: authorImage || null,
        authorEmail: authorEmail || null,
        rating,
        source: source || null,
        isFeatured,
        isActive,
        isVerified,
      },
    });

    return NextResponse.json(
      {
        data: testimonial,
        message: "Testimonial created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
