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
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        console.log('🔄 Loading testimonials...')
        const data = await getFeaturedTestimonials()
        console.log('📝 Testimonials loaded:', data)
        
        if (data && Array.isArray(data) && data.length > 0) {
          setTestimonials(data)
        } else {
          console.log('⚠️ No testimonials found, using fallback data')
          // Fallback to static data if API fails or returns empty
          setTestimonials([
            {
              id: '1',
              content: "Yog Computers has been our trusted technology partner for over 3 years. Their expertise in CCTV systems and electrical services has been instrumental in our business security and operations.",
              authorName: "Rajesh Kumar",
              authorTitle: "Operations Manager",
              authorCompany: "Tech Solutions Pvt Ltd",
              authorImage: "/placeholder-user.jpg",
              rating: 5,
              isActive: true,
              isFeatured: true,
              isVerified: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: '2',
              content: "Their computer maintenance services are exceptional. The team responds quickly and resolves issues efficiently, minimizing our downtime significantly.",
              authorName: "Priya Sharma",
              authorTitle: "IT Head",
              authorCompany: "Digital Innovations Ltd",
              authorImage: "/placeholder-user.jpg",
              rating: 5,
              isActive: true,
              isFeatured: true,
              isVerified: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id: '3',
              content: "Professional electrical installation and reliable ongoing support. Their attention to safety standards gives us complete peace of mind.",
              authorName: "Amit Patel",
              authorTitle: "Facility Manager",
              authorCompany: "Manufacturing Corp",
              authorImage: "/placeholder-user.jpg",
              rating: 5,
              isActive: true,
              isFeatured: true,
              isVerified: true,
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ])
        }
      } catch (error) {
        console.error('❌ Failed to load testimonials:', error)
        // Always provide fallback data on error
        setTestimonials([
          {
            id: 'fallback-1',
            content: "Excellent service quality and professional approach. Yog Computers has exceeded our expectations in every project.",
            authorName: "Customer",
            authorTitle: "Business Owner",
            authorCompany: "Local Business",
            authorImage: "/placeholder-user.jpg",
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

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex] || testimonials[0]

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
          ) : currentTestimonial ? (
            <>
              <motion.blockquote 
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 text-balance leading-relaxed"
              >
                &ldquo;{currentTestimonial.content}&rdquo;
              </motion.blockquote>

              <motion.div 
                key={`author-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-center space-x-1 mb-3">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * i }}
                      className="text-yellow-400 text-lg"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="font-semibold">{currentTestimonial.authorName}</p>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.authorTitle}
                  {currentTestimonial.authorCompany && `, ${currentTestimonial.authorCompany}`}
                </p>
              </motion.div>

              {/* Navigation dots */}
              {testimonials.length > 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center space-x-2 mt-8"
                >
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-primary w-8'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </motion.div>
              )}
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
