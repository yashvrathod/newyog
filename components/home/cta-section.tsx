"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Need enterprise IT solutions or tech support?
            <br />
            Yog Computers is here to help your business grow!
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-10">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-10">
              <a href="tel:+919850850331">Call Now: +91-9850850331</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
