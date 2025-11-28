"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  Briefcase,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ShoppingCart,
} from "lucide-react"
import { getDashboardStats } from "@/lib/admin-data"
import type { DashboardStats } from "@/lib/types"

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardStats()
        setDashboardData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const stats = [
    {
      title: "Total Products",
      value: dashboardData?.products?.toString() || "0",
      change: "+12%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Active Services",
      value: dashboardData?.services?.toString() || "0",
      change: "+3%",
      trend: "up",
      icon: Briefcase,
    },
    {
      title: "Total Users",
      value: dashboardData?.users?.toString() || "0",
      change: "+24%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Inquiries",
      value: dashboardData?.inquiries?.total?.toString() || "0",
      change: `${dashboardData?.inquiries?.new || 0} new`,
      trend: "up",
      icon: DollarSign,
    },
  ]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "TechFlow Inc.",
    product: "Enterprise Server Pro",
    amount: "$12,999",
    status: "completed",
  },
  { id: "ORD-002", customer: "GlobalSync", product: "Industrial Automation Kit", amount: "$8,499", status: "pending" },
  { id: "ORD-003", customer: "NextGen Corp", product: "Smart Office Hub", amount: "$1,299", status: "processing" },
  {
    id: "ORD-004",
    customer: "Quantum Labs",
    product: "Network Security Appliance",
    amount: "$4,599",
    status: "completed",
  },
]

const recentActivity = [
  { action: "New product added", detail: "Enterprise Server Pro X2", time: "2 hours ago" },
  { action: "Service inquiry received", detail: "AI Strategy Consulting", time: "4 hours ago" },
  { action: "New client registered", detail: "Apex Industries", time: "6 hours ago" },
  { action: "Payment received", detail: "$12,999 from TechFlow Inc.", time: "8 hours ago" },
]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs mt-1">
                  {stat.trend === "up" ? (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">{stat.change}</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">{stat.change}</span>
                    </>
                  )}
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium text-sm">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{order.amount}</p>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-2 h-2 mt-2 rounded-full bg-accent" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Page Views Today</p>
                <p className="text-3xl font-bold mt-1">12,456</p>
              </div>
              <TrendingUp className="h-10 w-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold mt-1">3.24%</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Sessions</p>
                <p className="text-3xl font-bold mt-1">234</p>
              </div>
              <Users className="h-10 w-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
