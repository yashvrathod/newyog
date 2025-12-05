"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Cpu } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-gradient-soft"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/abstract-holographic-crystal-texture-with-iridesce.jpg"
          alt="Hero background"
          fill
          className="object-cover scale-110"
          priority
          sizes="100vw"
        />

        {/* Enhanced dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
      </motion.div>

      {/* Floating Particles - Reduced and Optimized */}
      {isClient && (
        <div className="absolute inset-0 z-5">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated Tech Icons - Smoother */}
      <div className="absolute inset-0 z-5">
        <motion.div
          className="absolute top-1/4 left-1/6 text-primary/15"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cpu size={35} />
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/6 text-primary/15"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Shield size={30} />
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 left-1/4 text-primary/15"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        >
          <Zap size={28} />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 pt-32 text-center"
        style={{ opacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-white/80 mb-5"
        >
          Since 2008
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: "easeOut",
          }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] text-white"
        >
          Your <span className="font-serif italic text-primary">trusted</span>{" "}
          technology <span className="text-white/90">partner</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mt-8"
        >
          From enterprise IT solutions and computer sales to security camera
          installations and electrical services, we provide comprehensive
          technology solutions for businesses and individuals. Trust Yog
          Computers for reliable, scalable, and long-term tech partnerships.
        </motion.p>

        {/* Key Metrics - Smooth and Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 mb-8"
        >
          {[
            { number: "1000+", label: "Enterprise Clients" },
            { number: "99%", label: "Client Satisfaction" },
            { number: "16+", label: "Years Excellence" },
            { number: "24/7", label: "Business Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.4 + index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.number}
              </div>
              <div className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-200">
                {stat.label}
              </div>
            </motion.div>
          ))}

          {/* Simple Dividers */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="hidden sm:block w-px h-12 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + index * 0.05, duration: 0.3 }}
            />
          ))}
        </motion.div>

        {/* CTA Buttons - Smooth and Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              <Link href="/products" className="flex items-center">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base border-white/30 text-black hover:bg-white/10 transition-colors duration-200"
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Smooth Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">
          Scroll to explore
        </p>

        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 bg-white/5"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-1 h-1 rounded-full bg-white/70"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
