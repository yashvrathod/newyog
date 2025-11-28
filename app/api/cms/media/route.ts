import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder")
    const mimeType = searchParams.get("mimeType") 
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: any = {}

    if (folder) {
      where.folder = folder
    }

    if (mimeType) {
      where.mimeType = { startsWith: mimeType }
    }

    if (search) {
      where.OR = [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        include: {
          creator: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.media.count({ where })
    ])

    return NextResponse.json({
      data: media,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      filename, 
      originalName, 
      url, 
      mimeType, 
      size, 
      alt, 
      caption, 
      folder, 
      width, 
      height,
      creatorId 
    } = body

    if (!filename || !url || !mimeType) {
      return NextResponse.json({ error: "Filename, URL, and MIME type are required" }, { status: 400 })
    }

    // Check if file with same filename already exists
    const existingMedia = await prisma.media.findFirst({
      where: { 
        filename,
        folder: folder || "uploads"
      }
    })

    if (existingMedia) {
      return NextResponse.json({ error: "File with this name already exists in the folder" }, { status: 400 })
    }

    const media = await prisma.media.create({
      data: {
        filename,
        originalName: originalName || filename,
        mimeType,
        size: size || 0,
        url,
        alt: alt || "",
        caption: caption || "",
        folder: folder || "uploads",
        width: width || null,
        height: height || null,
        creatorId: creatorId || null
      },
      include: {
        creator: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({ data: media }, { status: 201 })
  } catch (error) {
    console.error("Error creating media:", error)
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 })
  }
}
