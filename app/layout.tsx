import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/ui/smooth-scroll"
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Premium Business Solutions | Est. 2003",
  description: "Leading provider of innovative products and services. Trusted by industry leaders since 2008.",
  keywords: ["business solutions", "products", "services", "enterprise"],
  authors: [{ name: "Company Name" }],
  openGraph: {
    title: "Premium Business Solutions",
    description: "Leading provider of innovative products and services since 2003.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Business Solutions",
    description: "Leading provider of innovative products and services since 2003.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <SmoothScroll />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
