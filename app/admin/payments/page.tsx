"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, DollarSign, TrendingUp, CreditCard, Clock } from "lucide-react"

const mockPayments = [
  {
    id: "PAY-001",
    customer: "Acme Manufacturing",
    amount: 24999.99,
    status: "completed",
    method: "Bank Transfer",
    date: "2024-01-15",
    description: "Industrial Generator Pro X500",
  },
  {
    id: "PAY-002",
    customer: "TechForge Industries",
    amount: 15750.0,
    status: "completed",
    method: "Credit Card",
    date: "2024-01-14",
    description: "Heavy-Duty Conveyor System",
  },
  {
    id: "PAY-003",
    customer: "Global Steel Corp",
    amount: 5000.0,
    status: "pending",
    method: "Invoice",
    date: "2024-01-13",
    description: "Maintenance Contract - Q1",
  },
  {
    id: "PAY-004",
    customer: "Precision Parts Ltd",
    amount: 89500.0,
    status: "processing",
    method: "Wire Transfer",
    date: "2024-01-12",
    description: "Precision CNC Lathe Model A",
  },
]

const statusConfig = {
  completed: { label: "Completed", variant: "default" as const },
  pending: { label: "Pending", variant: "secondary" as const },
  processing: { label: "Processing", variant: "outline" as const },
  failed: { label: "Failed", variant: "destructive" as const },
}

export default function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const totalRevenue = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = mockPayments
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track and manage payment transactions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-amber-500">${pendingAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockPayments.length}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg. Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${Math.round(totalRevenue / mockPayments.filter((p) => p.status === "completed").length).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Per completed order</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayments.map((payment) => {
                const status = statusConfig[payment.status as keyof typeof statusConfig]
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                    <TableCell className="font-medium">{payment.customer}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                      {payment.description}
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell className="font-medium">${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
