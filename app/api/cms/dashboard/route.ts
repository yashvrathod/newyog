import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import type { DashboardStats } from "@/lib/types"

export async function GET() {
  try {
    // Check authentication
    const session = await getSession()
    if (!session || !['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get dashboard statistics
    const [
      usersCount,
      pagesCount,
      postsCount,
      productsCount,
      servicesCount,
      inquiriesTotal,
      inquiriesNew,
      inquiriesInProgress
    ] = await Promise.all([
      prisma.user.count({ where: { isActive: true } }),
      prisma.page.count(),
      prisma.post.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.inquiry.count({ where: { status: 'IN_PROGRESS' } })
    ])

    const stats: DashboardStats = {
      users: usersCount,
      pages: pagesCount,
      posts: postsCount,
      products: productsCount,
      services: servicesCount,
      inquiries: {
        total: inquiriesTotal,
        new: inquiriesNew,
        inProgress: inquiriesInProgress
      }
    }

    // Get recent activities
    const recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        status: true,
        createdAt: true
      }
    })

    const recentPages = await prisma.page.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        updatedAt: true,
        updater: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json({
      data: {
        stats,
        recentInquiries,
        recentPages
      }
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
