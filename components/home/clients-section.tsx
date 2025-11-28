"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { getFeaturedClients } from "@/lib/data";
import type { Client } from "@/lib/types";

export function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getFeaturedClients();
        setClients(data);
      } catch (error) {
        console.error("Failed to load clients:", error);

        setClients([
          {
            id: "1",
            companyName: "TechFlow",
            logo: "/techflow-modern-tech-company-logo-minimal.jpg",
          },
          {
            id: "2",
            companyName: "Innovate",
            logo: "/innovate-modern-company-logo-minimal.jpg",
          },
          {
            id: "3",
            companyName: "GlobalSync",
            logo: "/globalsync-enterprise-company-logo-minimal.jpg",
          },
          {
            id: "4",
            companyName: "NextGen",
            logo: "/nextgen-modern-startup-logo-minimal.jpg",
          },
          {
            id: "5",
            companyName: "Quantum",
            logo: "/quantum-tech-company-logo-minimal.jpg",
          },
          {
            id: "6",
            companyName: "Apex",
            logo: "/apex-business-company-logo-minimal.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 bg-secondary/60 dark:bg-neutral-900/60 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xl font-semibold text-foreground/80 mb-10"
        >
          Trusted by teams worldwide
        </motion.h2>

        {/* Mask for edges (premium fade) */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary/60 dark:from-neutral-900/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary/60 dark:from-neutral-900/60 to-transparent z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="overflow-hidden"
          >
            {loading ? (
              <div className="flex justify-center items-center h-16">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground/30"></div>
              </div>
            ) : (
              <div className="flex animate-scroll whitespace-nowrap">
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`${client.companyName}-${index}`}
                    className="mx-12 flex-shrink-0 transition-all grayscale hover:grayscale-0 opacity-60 hover:opacity-100 hover:scale-[1.05] duration-300"
                  >
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      alt={client.companyName}
                      width={120}
                      height={48}
                      className="h-12 w-auto object-contain"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
