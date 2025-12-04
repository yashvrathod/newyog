"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Mail, Phone, Eye, CheckCircle, Clock, XCircle } from "lucide-react"

const statusConfig = {
  NEW: { label: "New", icon: Clock, variant: "default" as const },
  OPEN: { label: "Open", icon: Eye, variant: "secondary" as const },
  IN_PROGRESS: { label: "In Progress", icon: Eye, variant: "secondary" as const },
  RESOLVED: { label: "Resolved", icon: CheckCircle, variant: "outline" as const },
  CLOSED: { label: "Closed", icon: XCircle, variant: "outline" as const },
  SPAM: { label: "Spam", icon: XCircle, variant: "destructive" as const },
}

const typeConfig = {
  GENERAL: { label: "General", color: "blue" },
  PRODUCT: { label: "Product", color: "green" },
  SERVICE: { label: "Service", color: "purple" },
  SUPPORT: { label: "Support", color: "orange" },
  PARTNERSHIP: { label: "Partnership", color: "indigo" },
  SALES: { label: "Sales", color: "pink" },
}

export default function AdminInquiriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [inquiries, setInquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    inProgress: 0,
    resolvedThisMonth: 0
  })

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/inquiries', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch inquiries')
      }
      
      const result = await response.json()
      const inquiriesData = result.data || []
      setInquiries(inquiriesData)
      
      // Calculate stats
      const total = inquiriesData.length
      const newCount = inquiriesData.filter((i: any) => i.status === 'NEW').length
      const inProgressCount = inquiriesData.filter((i: any) => ['OPEN', 'IN_PROGRESS'].includes(i.status)).length
      const thisMonth = new Date()
      thisMonth.setMonth(thisMonth.getMonth())
      const resolvedThisMonth = inquiriesData.filter((i: any) => {
        return i.status === 'RESOLVED' && new Date(i.createdAt) >= new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1)
      }).length
      
      setStats({ total, new: newCount, inProgress: inProgressCount, resolvedThisMonth })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
          <p className="text-muted-foreground">Manage customer inquiries and requests</p>
        </div>
      </div>

      {error && (
        <Card>
          <CardContent className="p-6">
            <p className="text-red-500">Error: {error}</p>
            <Button onClick={fetchInquiries} className="mt-2">Retry</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{loading ? "..." : stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{loading ? "..." : stats.new}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-500">{loading ? "..." : stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{loading ? "..." : stats.resolvedThisMonth}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading inquiries...
                      </TableCell>
                    </TableRow>
                  ) : inquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No inquiries found. Contact form submissions will appear here.
                      </TableCell>
                    </TableRow>
                  ) : (
                    inquiries
                      .filter((inquiry) => 
                        searchQuery === "" || 
                        inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (inquiry.company && inquiry.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (inquiry.subject && inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()))
                      )
                      .map((inquiry) => {
                        const status = statusConfig[inquiry.status as keyof typeof statusConfig]
                        const type = typeConfig[inquiry.type as keyof typeof typeConfig]
                        return (
                          <TableRow key={inquiry.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{inquiry.name}</p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  {inquiry.email}
                                </div>
                                {inquiry.company && (
                                  <p className="text-xs text-muted-foreground mt-1">{inquiry.company}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {type?.label || inquiry.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px]">
                              <div className="truncate">{inquiry.subject || "No subject"}</div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {inquiry.message.substring(0, 100)}...
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge variant={status.variant} className="gap-1">
                                <status.icon className="h-3 w-3" />
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              <div>{new Date(inquiry.createdAt).toLocaleDateString()}</div>
                              <div className="text-xs">{new Date(inquiry.createdAt).toLocaleTimeString()}</div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => alert(`Message: ${inquiry.message}`)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Email
                                  </DropdownMenuItem>
                                  {inquiry.phone && (
                                    <DropdownMenuItem onClick={() => window.open(`tel:${inquiry.phone}`, '_blank')}>
                                      <Phone className="h-4 w-4 mr-2" />
                                      Call
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark Resolved
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        )
                      })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">New inquiries will appear here</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              In-progress inquiries will appear here
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Resolved inquiries will appear here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
