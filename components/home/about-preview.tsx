"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function AboutPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section ref={ref} className="py-28 px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-medium text-muted-foreground italic mb-3">
              About Yog Computers
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-6 leading-snug">
              Your trusted technology partner
              <br />
              in Pune since 2003.
            </h2>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Yog Computers, we specialize in enterprise IT solutions, computer sales, repairs, security camera installations, and electrical services. 
              Our expert team delivers scalable technology solutions for businesses of all sizes, from startups to large enterprises. 
              Trust us for comprehensive, reliable, and strategic tech partnerships that drive your business forward.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
