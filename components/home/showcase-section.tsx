"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ShowcaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-balance"
        >
          Quality products and 
          <br />
          reliable services
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
          >
            <Image
              src="/modern-professional-business-person-working-in-sle.jpg"
              alt="Professional at work"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-background text-2xl font-semibold mb-2">Our Products</h3>
              <p className="text-background/80 text-sm mb-4">Discover our curated collection</p>
              <Button asChild variant="secondary" size="sm" className="rounded-full">
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
          >
            <Image
              src="/modern-professional-team-meeting-in-contemporary-g.jpg"
              alt="Team collaboration"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-background text-2xl font-semibold mb-2">Our Services</h3>
              <p className="text-background/80 text-sm mb-4">Expert solutions tailored for you</p>
              <Button asChild variant="secondary" size="sm" className="rounded-full">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            We are committed to providing personalized technology solutions with transparent communication and reliable support for all your computing needs.
          </p>
          <Button asChild variant="outline" className="rounded-full bg-transparent">
            <Link href="/about">Our commitment</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
