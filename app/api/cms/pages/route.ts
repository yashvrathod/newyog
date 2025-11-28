import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { PageStatus } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const parentId = searchParams.get("parentId")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status && status !== 'ALL') {
      where.status = status as PageStatus
    }

    if (parentId) {
      where.parentId = parentId
    } else if (parentId !== "all") {
      where.parentId = null // Root pages only
    }

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        include: {
          creator: {
            select: { id: true, name: true, email: true }
          },
          updater: {
            select: { id: true, name: true, email: true }
          },
          parent: {
            select: { id: true, title: true, slug: true }
          },
          children: {
            where: { status: { not: 'DELETED' } },
            select: { id: true, title: true, slug: true, status: true },
            orderBy: { sortOrder: 'asc' }
          }
        },
        orderBy: [
          { sortOrder: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.page.count({ where })
    ])

    return NextResponse.json({
      data: pages,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      slug, 
      content, 
      excerpt, 
      metaTitle, 
      metaDescription, 
      status = 'DRAFT', 
      template = 'default',
      sortOrder = 0,
      parentId,
      creatorId
    } = body

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })
    if (existingPage) {
      return NextResponse.json({ error: "Page with this slug already exists" }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        content: content || "",
        excerpt: excerpt || "",
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || "",
        status: status as PageStatus,
        isPublished: status === 'PUBLISHED',
        template,
        sortOrder,
        parentId: parentId || null,
        creatorId: creatorId || null,
        updaterId: creatorId || null
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        },
        updater: {
          select: { id: true, name: true, email: true }
        },
        parent: {
          select: { id: true, title: true, slug: true }
        }
      }
    })

    return NextResponse.json({ data: page }, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}
