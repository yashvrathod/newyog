"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, CreditCard, Briefcase, Download, QrCode } from "lucide-react"

export default function AdminQRCodesPage() {
  const [productId, setProductId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDescription, setPaymentDescription] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-muted-foreground">Generate QR codes for products, services, and payments</p>
      </div>

      <Tabs defaultValue="product" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="product" className="gap-2">
            <Package className="h-4 w-4" />
            Product
          </TabsTrigger>
          <TabsTrigger value="service" className="gap-2">
            <Briefcase className="h-4 w-4" />
            Service
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product QR Code</CardTitle>
                <CardDescription>Generate a QR code that links to a product page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">Product ID</Label>
                  <Input
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    placeholder="Enter product ID"
                  />
                </div>
                <Button className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            <Card className="flex items-center justify-center min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">QR code preview will appear here</p>
                <Button variant="outline" className="mt-4 bg-transparent" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="service">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service QR Code</CardTitle>
                <CardDescription>Generate a QR code that links to a service inquiry form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceId">Service ID</Label>
                  <Input
                    id="serviceId"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    placeholder="Enter service ID"
                  />
                </div>
                <Button className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            <Card className="flex items-center justify-center min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">QR code preview will appear here</p>
                <Button variant="outline" className="mt-4 bg-transparent" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment QR Code</CardTitle>
                <CardDescription>Generate a QR code for payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentAmount">Amount (USD)</Label>
                  <Input
                    id="paymentAmount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentDescription">Description</Label>
                  <Input
                    id="paymentDescription"
                    value={paymentDescription}
                    onChange={(e) => setPaymentDescription(e.target.value)}
                    placeholder="Payment description"
                  />
                </div>
                <Button className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate Payment QR
                </Button>
              </CardContent>
            </Card>

            <Card className="flex items-center justify-center min-h-[300px]">
              <div className="text-center p-8">
                <div className="w-48 h-48 mx-auto bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="h-24 w-24 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">QR code preview will appear here</p>
                <Button variant="outline" className="mt-4 bg-transparent" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
