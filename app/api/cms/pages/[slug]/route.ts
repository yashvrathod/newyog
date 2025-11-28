import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import type { PageStatus } from "@/lib/types"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const page = await prisma.page.findUnique({
      where: { slug },
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
      }
    })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ data: page })
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()
    const { 
      title, 
      content, 
      excerpt, 
      metaTitle, 
      metaDescription, 
      status, 
      template, 
      sortOrder,
      updaterId 
    } = body

    // Check if page exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })
    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    const page = await prisma.page.update({
      where: { slug },
      data: {
        title: title || existingPage.title,
        content: content !== undefined ? content : existingPage.content,
        excerpt: excerpt !== undefined ? excerpt : existingPage.excerpt,
        metaTitle: metaTitle !== undefined ? metaTitle : existingPage.metaTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : existingPage.metaDescription,
        status: status ? (status as PageStatus) : existingPage.status,
        isPublished: status ? (status === 'PUBLISHED') : existingPage.isPublished,
        template: template || existingPage.template,
        sortOrder: sortOrder !== undefined ? sortOrder : existingPage.sortOrder,
        updaterId: updaterId || existingPage.updaterId,
        updatedAt: new Date()
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

    return NextResponse.json({ 
      data: page,
      message: "Page updated successfully"
    })
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Check if page exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })
    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    // Soft delete by updating status
    await prisma.page.update({
      where: { slug },
      data: { 
        status: 'DELETED' as PageStatus,
        isPublished: false,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
