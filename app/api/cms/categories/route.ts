import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // PRODUCT, SERVICE, POST
    const parentId = searchParams.get("parentId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")

    const where: any = {
      isActive: true
    }

    if (parentId) {
      where.parentId = parentId
    } else if (parentId !== "all") {
      where.parentId = null // Root categories only
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        },
        parent: {
          select: { id: true, name: true, slug: true }
        },
        _count: {
          select: {
            products: true,
            services: true,
            posts: true
          }
        }
      },
      orderBy: { sortOrder: 'asc' },
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.category.count({ where })

    return NextResponse.json({
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, parentId, sortOrder } = body

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({ where: { slug } })
    if (existingCategory) {
      return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || "",
        parentId: parentId || null,
        sortOrder: sortOrder || 0,
        isActive: true
      },
      include: {
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    return NextResponse.json({ data: category }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
