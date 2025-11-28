"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, FileText, Shield, Clock } from "lucide-react"

export default function AdminLegalPage() {
  const [privacyPolicy, setPrivacyPolicy] = useState(`# Privacy Policy

Last updated: January 2024

## Information We Collect

We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.

## How We Use Your Information

We use the information we collect to provide, maintain, and improve our services...`)

  const [termsOfService, setTermsOfService] = useState(`# Terms of Service

Last updated: January 2024

## Acceptance of Terms

By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.

## Use License

Permission is granted to temporarily download one copy of the materials on TechCorp Industries' website for personal, non-commercial transitory viewing only...`)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Legal Documents</h1>
        <p className="text-muted-foreground">Manage privacy policy, terms of service, and other legal documents</p>
      </div>

      <Tabs defaultValue="privacy" className="space-y-6">
        <TabsList>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="h-4 w-4" />
            Privacy Policy
          </TabsTrigger>
          <TabsTrigger value="terms" className="gap-2">
            <FileText className="h-4 w-4" />
            Terms of Service
          </TabsTrigger>
          <TabsTrigger value="cookies" className="gap-2">
            <FileText className="h-4 w-4" />
            Cookie Policy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last updated: January 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacy-content">Content (Markdown supported)</Label>
                <Textarea
                  id="privacy-content"
                  value={privacyPolicy}
                  onChange={(e) => setPrivacyPolicy(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last updated: January 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms-content">Content (Markdown supported)</Label>
                <Textarea
                  id="terms-content"
                  value={termsOfService}
                  onChange={(e) => setTermsOfService(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cookie Policy</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last updated: January 15, 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cookies-content">Content (Markdown supported)</Label>
                <Textarea
                  id="cookies-content"
                  rows={20}
                  className="font-mono text-sm"
                  placeholder="# Cookie Policy..."
                />
              </div>
              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
