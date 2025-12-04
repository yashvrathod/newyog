import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both sync and async params for Next.js 16 compatibility
    const resolvedParams = await Promise.resolve(params);
    console.log('📖 API GET /clients/[id] - Params:', resolvedParams);
    
    if (!resolvedParams.id) {
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const client = await prisma.client.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: client });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json(
      { error: "Failed to fetch client" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both sync and async params for Next.js 16 compatibility
    const resolvedParams = await Promise.resolve(params);
    console.log('🔧 API PUT /clients/[id] - Params:', resolvedParams);
    
    const body = await request.json();
    console.log('🔧 API PUT /clients/[id] - Body:', body);
    
    const {
      companyName,
      contactName,
      email,
      phone,
      address,
      website,
      logo,
      industry,
      size,
      notes,
      isFeatured,
      isActive,
    } = body;

    // Check if client exists first
    const existingClient = await prisma.client.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingClient) {
      console.log('🔧 API PUT /clients/[id] - Client not found:', resolvedParams.id);
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    console.log('🔧 API PUT /clients/[id] - Existing client:', existingClient);

    // Check if another client with the same email exists (excluding current client)
    if (email && email !== existingClient.email) {
      const duplicateClient = await prisma.client.findFirst({
        where: {
          email: email.toLowerCase(),
          id: { not: resolvedParams.id },
        },
      });

      if (duplicateClient) {
        console.log('🔧 API PUT /clients/[id] - Duplicate email found');
        return NextResponse.json(
          { error: "Another client with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Build update data more carefully
    const updateData: any = {};
    
    if (companyName !== undefined) updateData.companyName = companyName;
    if (contactName !== undefined) updateData.contactName = contactName || null;
    if (email !== undefined) updateData.email = email ? email.toLowerCase() : null;
    if (phone !== undefined) updateData.phone = phone || null;
    if (address !== undefined) updateData.address = address || null;
    if (website !== undefined) updateData.website = website || null;
    if (logo !== undefined) updateData.logo = logo || null;
    if (industry !== undefined) updateData.industry = industry || null;
    if (size !== undefined) updateData.size = size || null;
    if (notes !== undefined) updateData.notes = notes || null;
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    console.log('🔧 API PUT /clients/[id] - Update data:', updateData);

    const client = await prisma.client.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });

    console.log('🔧 API PUT /clients/[id] - Updated client:', client);

    return NextResponse.json({ data: client });
  } catch (error) {
    console.error("🔧 API PUT /clients/[id] - Error details:", error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error("🔧 API PUT /clients/[id] - Error message:", error.message);
      console.error("🔧 API PUT /clients/[id] - Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { error: `Failed to update client: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    // Handle both sync and async params for Next.js 16 compatibility
    const resolvedParams = await Promise.resolve(params);
    console.log('🗑️ API DELETE /clients/[id] - Params:', resolvedParams);
    console.log('🗑️ API DELETE /clients/[id] - Params.id:', resolvedParams.id);
    
    // Ensure we have a valid ID
    if (!resolvedParams.id) {
      console.error('🗑️ API DELETE /clients/[id] - No ID provided');
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    const client = await prisma.client.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!client) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    await prisma.client.delete({
      where: { id: resolvedParams.id },
    });

    return NextResponse.json({ 
      data: null, 
      message: "Client deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json(
      { error: "Failed to delete client" },
      { status: 500 }
    );
  }
}