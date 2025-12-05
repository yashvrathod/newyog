"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { getFeaturedClients } from "@/lib/data";
import { Star, Building2 } from "lucide-react";
import type { Client } from "@/lib/types";

export function ClientsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getFeaturedClients();
        
        // If we have real clients from the database, use them
        if (data && Array.isArray(data) && data.length > 0) {
          setClients(data);
        } else {
          // Fallback to sample data with proper client structure
          setClients([
            {
              id: "1",
              companyName: "TechFlow Solutions",
              contactName: "John Smith",
              email: "contact@techflow.com",
              phone: "+1 (555) 123-4567",
              address: "123 Tech Street, San Francisco, CA",
              website: "https://techflow.com",
              logo: "/techflow-modern-tech-company-logo-minimal.jpg",
              industry: "Technology",
              size: "LARGE",
              notes: "Leading technology partner",
              isActive: true,
              isFeatured: true,
              createdAt: new Date("2024-01-15"),
              updatedAt: new Date("2024-12-15")
            },
            {
              id: "2", 
              companyName: "Innovate Corp",
              contactName: "Sarah Johnson",
              email: "hello@innovatecorp.com",
              phone: "+1 (555) 234-5678",
              address: "456 Innovation Ave, New York, NY",
              website: "https://innovatecorp.com",
              logo: "/innovate-modern-company-logo-minimal.jpg",
              industry: "Innovation",
              size: "MEDIUM",
              notes: "Strategic innovation partner",
              isActive: true,
              isFeatured: true,
              createdAt: new Date("2024-02-10"),
              updatedAt: new Date("2024-12-10")
            },
            {
              id: "3",
              companyName: "GlobalSync Enterprise",
              contactName: "Michael Chen",
              email: "info@globalsync.com",
              phone: "+1 (555) 345-6789",
              address: "789 Global Plaza, Austin, TX",
              website: "https://globalsync.com",
              logo: "/globalsync-enterprise-company-logo-minimal.jpg",
              industry: "Enterprise Software",
              size: "LARGE",
              notes: "Global enterprise solutions",
              isActive: true,
              isFeatured: true,
              createdAt: new Date("2024-01-20"),
              updatedAt: new Date("2024-12-05")
            },
            {
              id: "4",
              companyName: "NextGen Startups",
              contactName: "Emily Davis",
              email: "contact@nextgenstartups.com",
              phone: "+1 (555) 456-7890",
              address: "321 Startup Blvd, Seattle, WA",
              website: "https://nextgenstartups.com",
              logo: "/nextgen-modern-startup-logo-minimal.jpg",
              industry: "Venture Capital",
              size: "SMALL",
              notes: "Next generation startup incubator",
              isActive: true,
              isFeatured: true,
              createdAt: new Date("2024-03-05"),
              updatedAt: new Date("2024-11-20")
            },
            {
              id: "5",
              companyName: "Quantum Technologies",
              contactName: "Dr. Robert Wilson",
              email: "research@quantumtech.com",
              phone: "+1 (555) 567-8901",
              address: "654 Quantum Drive, Boston, MA",
              website: "https://quantumtech.com",
              logo: "/quantum-tech-company-logo-minimal.jpg",
              industry: "Quantum Computing",
              size: "MEDIUM",
              notes: "Quantum computing pioneers",
              isActive: true,
              isFeatured: true,
              createdAt: new Date("2024-02-28"),
              updatedAt: new Date("2024-12-01")
            },
            {
              id: "6",
              companyName: "Apex Business Solutions",
              contactName: "Lisa Martinez",
              email: "solutions@apexbusiness.com",
              phone: "+1 (555) 678-9012",
              address: "987 Business Center, Denver, CO",
              website: "https://apexbusiness.com",
              logo: "/apex-business-company-logo-minimal.jpg",
              industry: "Business Consulting",
              size: "LARGE",
              notes: "Premier business consulting firm",
              isActive: true,
              isFeatured: true,
              createdAt: new Date("2024-03-18"),
              updatedAt: new Date("2024-11-25")
            }
          ]);
        }
      } catch (error) {
        console.error("Failed to load clients:", error);
        setClients([]);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  // If no clients are available, show a message instead of hiding
  if (!loading && clients.length === 0) {
    return (
      <section className="py-20 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Clients</h2>
          <p className="text-muted-foreground">No clients found. Add some clients in the admin panel.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-secondary/30 dark:bg-neutral-900/30"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header - matching your site's style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Star className="w-4 h-4" />
            Trusted Partners
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Companies That Trust Us
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join hundreds of successful businesses that rely on our expertise to drive their digital transformation and achieve exceptional results.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Client Logos - Improved Animation */}
            <div className="relative overflow-hidden">
              {/* Gradient masks */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent dark:from-neutral-900/30 z-10"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent dark:from-neutral-900/30 z-10"></div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="overflow-hidden py-8"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Main scrolling row */}
                <div 
                  className={`flex animate-scroll whitespace-nowrap ${isPaused ? 'animation-paused' : ''}`}
                  style={{ animationDuration: '40s' }}
                >
                  {[...clients, ...clients, ...clients].map((client, index) => (
                    <motion.div
                      key={`${client.id}-${index}`}
                      className="mx-12 flex-shrink-0 group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col items-center space-y-4 w-32">
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 overflow-hidden relative flex items-center justify-center p-2"
                            style={{
                              boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.4), 0 8px 25px rgba(0, 0, 0, 0.15)",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                            whileHover={{
                              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.5), 0 12px 35px rgba(0, 0, 0, 0.2)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={client.logo || "/placeholder.svg"}
                              alt={client.companyName}
                              width={64}
                              height={64}
                              className="object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 w-full h-full"
                              sizes="64px"
                            />
                          </motion.div>
                        </motion.div>
                        <div className="text-center">
                          <h3 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-300 leading-tight">
                            {client.companyName}
                          </h3>
                          {client.industry && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {client.industry}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Stats section - matching your site's style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { number: clients.length + "+", label: "Trusted Clients", icon: Building2 },
                  { number: "99%", label: "Client Satisfaction", icon: Star },
                  { number: "24/7", label: "Support Available", icon: Building2 },
                  { number: "15+", label: "Industries Served", icon: Building2 }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-lg bg-background border border-border hover:border-primary/30 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}