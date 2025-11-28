import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { InquiryStatus } from "@/lib/types"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    const inquiry = await prisma.inquiry.findUnique({
      where: { id }
    })

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({ data: inquiry })
  } catch (error) {
    console.error("Error fetching inquiry:", error)
    return NextResponse.json({ error: "Failed to fetch inquiry" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check authentication for admin operations
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status, notes, assignedTo } = body

    // Check if inquiry exists
    const existingInquiry = await prisma.inquiry.findUnique({ where: { id } })
    if (!existingInquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: status as InquiryStatus || existingInquiry.status,
        notes: notes !== undefined ? notes : existingInquiry.notes,
        assignedTo: assignedTo !== undefined ? assignedTo : existingInquiry.assignedTo,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ 
      data: inquiry,
      message: "Inquiry updated successfully" 
    })
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Check authentication
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Check if inquiry exists
    const existingInquiry = await prisma.inquiry.findUnique({ where: { id } })
    if (!existingInquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    // Soft delete
    await prisma.inquiry.update({
      where: { id },
      data: { 
        status: 'DELETED' as InquiryStatus,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({ message: "Inquiry deleted successfully" })
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 })
  }
}
