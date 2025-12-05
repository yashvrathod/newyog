import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET - Get single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        },
        _count: {
          select: {
            products: true,
            services: true,
            posts: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, parentId, sortOrder, image, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current category)
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        id: { not: params.id }
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category with this slug already exists" },
        { status: 400 }
      );
    }

    // Check if category exists
    const currentCategory = await prisma.category.findUnique({
      where: { id: params.id }
    });

    if (!currentCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Prevent setting parent as itself or creating circular references
    if (parentId === params.id) {
      return NextResponse.json(
        { error: "Category cannot be its own parent" },
        { status: 400 }
      );
    }

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description: description || "",
        parentId: parentId || null,
        sortOrder: sortOrder || 0,
        image: image || null,
        isActive: isActive !== undefined ? isActive : true
      },
      include: {
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        },
        _count: {
          select: {
            products: true,
            services: true,
            posts: true
          }
        }
      }
    });

    return NextResponse.json({ data: updatedCategory });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        children: true,
        _count: {
          select: {
            products: true,
            services: true,
            posts: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category has children
    if (category.children && category.children.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with subcategories. Please delete or move subcategories first." },
        { status: 400 }
      );
    }

    // Check if category has associated items
    const totalItems = (category as any)._count.products + (category as any)._count.services + (category as any)._count.posts;
    if (totalItems > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete category. It has ${totalItems} associated items. Please remove or reassign these items first.` 
        },
        { status: 400 }
      );
    }

    // Delete the category
    await prisma.category.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ 
      message: "Category deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}