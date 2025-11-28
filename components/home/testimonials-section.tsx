"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Quote } from "lucide-react"
import { getFeaturedTestimonials } from "@/lib/data"
import type { Testimonial } from "@/lib/types"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getFeaturedTestimonials()
        setTestimonials(data)
      } catch (error) {
        console.error('Failed to load testimonials:', error)
        // Fallback to static data if API fails
        setTestimonials([
          {
            id: '1',
            content: "TechCorp has been our trusted partner for over 15 years. Their equipment reliability and service excellence have been instrumental in our growth.",
            authorName: "Robert Chen",
            authorTitle: "Operations Director",
            authorCompany: "Acme Manufacturing",
            authorImage: "/placeholder.svg?height=60&width=60",
            rating: 5,
            isActive: true,
            isFeatured: true,
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            content: "The maintenance team responds within hours, not days. That level of commitment has saved us countless hours of downtime.",
            authorName: "Lisa Thompson",
            authorTitle: "Plant Manager",
            authorCompany: "Global Steel Corp",
            authorImage: "/placeholder.svg?height=60&width=60",
            rating: 5,
            isActive: true,
            isFeatured: true,
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Quote className="h-12 w-12 mx-auto mb-8 text-muted-foreground/30" />

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground/30"></div>
            </div>
          ) : testimonials.length > 0 ? (
            <>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 text-balance leading-relaxed">
                &ldquo;{testimonials[0].content}&rdquo;
              </blockquote>

              <div className="space-y-1">
                <p className="font-semibold">{testimonials[0].authorName}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[0].authorTitle}, {testimonials[0].authorCompany}
                </p>
              </div>
            </>
          ) : (
            <>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 text-balance leading-relaxed">
                &ldquo;True partners in business innovation – that's what they represent to us.&rdquo;
              </blockquote>

              <div className="space-y-1">
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">
                  CEO, TechFlow Inc.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
