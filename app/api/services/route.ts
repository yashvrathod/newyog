import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const categoryId = searchParams.get("categoryId")
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "20")

    // Build where clause
    const where: any = {
      isActive: true,
      status: 'PUBLISHED'
    }

    if (featured === "true") {
      where.isFeatured = true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    // Execute queries
    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy: [
          { isFeatured: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: (page - 1) * pageSize,
        take: pageSize
      }),
      prisma.service.count({ where })
    ])

    return NextResponse.json({
      data: services,
      pagination: {
        page,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      slug, 
      description, 
      shortDescription, 
      icon, 
      categoryId, 
      features, 
      priceRange, 
      isFeatured,
      featuredImage 
    } = body

    // Check if slug already exists
    const existingService = await prisma.service.findUnique({ where: { slug } })
    if (existingService) {
      return NextResponse.json({ error: "Service with this slug already exists" }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        icon,
        categoryId,
        features,
        priceRange,
        featuredImage,
        isFeatured: isFeatured ?? false,
        isActive: true,
        status: 'PUBLISHED'
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({ data: service }, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
