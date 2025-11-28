"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { legalDocuments } from "@/lib/sample-data"
import { FileText, Download, Shield, Scale, FileCheck, Building2 } from "lucide-react"

const categoryIcons = {
  gst: Shield,
  ownership: Building2,
  service: FileCheck,
  product: FileText,
  other: Scale,
}

const categoryLabels = {
  gst: "GST & Tax",
  ownership: "Ownership",
  service: "Service Agreements",
  product: "Product Documents",
  other: "Other",
}

export default function LegalPage() {
  const groupedDocuments = legalDocuments.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    },
    {} as Record<string, typeof legalDocuments>,
  )

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Legal <span className="font-serif italic">Documents</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Access our official documentation, certifications, and legal agreements. All documents are available for
                download.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-12">
            {Object.entries(groupedDocuments).map(([category, docs], categoryIndex) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || FileText

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold">{categoryLabels[category as keyof typeof categoryLabels]}</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {docs.map((doc, index) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 + index * 0.05 }}
                      >
                        <Card className="border-border/50 hover:shadow-md transition-shadow h-full">
                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex items-start justify-between mb-4">
                              <div className="p-3 bg-secondary rounded-lg">
                                <FileText className="h-6 w-6" />
                              </div>
                              <Badge variant="outline" className="text-xs uppercase">
                                {doc.fileType}
                              </Badge>
                            </div>

                            <h3 className="font-semibold mb-2">{doc.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-1">{doc.description}</p>

                            <Button variant="outline" className="w-full rounded-full mt-auto bg-transparent" asChild>
                              <a href={doc.fileUrl} download>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="px-4 sm:px-6 lg:px-8 mt-16">
          <div className="mx-auto max-w-3xl">
            <Card className="bg-secondary/50 border-border/50">
              <CardContent className="p-8 text-center">
                <Scale className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">Legal Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  All documents provided are for informational purposes. For specific legal advice, please consult with
                  a qualified legal professional. Documents are subject to change without prior notice.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
