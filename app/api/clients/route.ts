import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {
      isActive: true,
    };

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { companyName: { contains: search, mode: "insensitive" } },
        { contactName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { industry: { contains: search, mode: "insensitive" } },
      ];
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.client.count({ where }),
    ]);

    return NextResponse.json({
      data: clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      address,
      website,
      logo,
      logoUrl, // Support both fields for backward compatibility
      industry,
      size,
      notes,
      isFeatured,
    } = body;

    if (!companyName || !contactName || !email) {
      return NextResponse.json(
        { error: "Company name, contact name, and email are required" },
        { status: 400 }
      );
    }

    // Check if client with email already exists (only if email is provided)
    if (email) {
      const existingClient = await prisma.client.findFirst({
        where: { email: email.toLowerCase() },
      });

      if (existingClient) {
        return NextResponse.json(
          { error: "Client with this email already exists" },
          { status: 400 }
        );
      }
    }

    const client = await prisma.client.create({
      data: {
        companyName,
        contactName: contactName || null,
        email: email ? email.toLowerCase() : null,
        phone: phone || null,
        address: address || null,
        website: website || null,
        logo: logo || logoUrl || null, // Support both field names
        industry: industry || null,
        size: size || null,
        notes: notes || null,
        isFeatured: isFeatured ?? false,
        isActive: true,
      },
    });

    return NextResponse.json({ data: client }, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
