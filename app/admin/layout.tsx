"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/hooks/use-auth"
import {
  LayoutDashboard,
  Package,
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  ImageIcon,
  Settings,
  LogOut,
  Menu,
  Moon,
  Sun,
  QrCode,
  CreditCard,
  Building2,
  Inbox,
  Layers3,
} from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Categories", href: "/admin/categories", icon: Layers3 },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Clients", href: "/admin/clients", icon: Building2 },
  { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Legal Docs", href: "/admin/legal", icon: FileText },
  { name: "QR Codes", href: "/admin/qr-codes", icon: QrCode },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, loading, isAuthenticated, logout } = useAuth()

  // Skip layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    window.location.href = `/admin/login?redirect=${encodeURIComponent(pathname)}`
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold">A</span>
              </div>
              <span className="font-bold text-lg">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 py-4">
            <nav className="px-3 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5 mr-3" /> : <Moon className="h-5 w-5 mr-3" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive" onClick={logout}>
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex items-center gap-4 ml-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "AD"}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || "admin@company.com"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
