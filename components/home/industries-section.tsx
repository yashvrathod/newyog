"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Factory,
  Landmark,
  Smartphone,
  Truck,
  ArrowRight
} from "lucide-react";

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  solutions: string[];
  stats: {
    clients: number;
    projects: number;
    satisfaction: number;
  };
  caseStudy?: {
    title: string;
    result: string;
  };
}

const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    icon: <Stethoscope className="h-6 w-6" />,
    description: "Innovative solutions for healthcare providers, from digital transformation to operational efficiency.",
    solutions: ["Digital health platforms", "Patient management systems", "Compliance solutions"],
    stats: { clients: 50, projects: 120, satisfaction: 99.2 },
    caseStudy: {
      title: "Regional Hospital Network",
      result: "40% reduction in administrative costs"
    }
  },
  {
    id: "education",
    name: "Education",
    icon: <GraduationCap className="h-6 w-6" />,
    description: "Empowering educational institutions with modern learning technologies and management systems.",
    solutions: ["Learning management systems", "Student information systems", "Digital classrooms"],
    stats: { clients: 75, projects: 200, satisfaction: 98.5 },
    caseStudy: {
      title: "State University System",
      result: "60% increase in student engagement"
    }
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: <ShoppingCart className="h-6 w-6" />,
    description: "Comprehensive retail solutions from inventory management to customer experience optimization.",
    solutions: ["E-commerce platforms", "Inventory management", "Customer analytics"],
    stats: { clients: 80, projects: 150, satisfaction: 97.8 },
    caseStudy: {
      title: "National Retail Chain",
      result: "35% increase in online sales"
    }
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: <Factory className="h-6 w-6" />,
    description: "Industrial automation and optimization solutions for modern manufacturing operations.",
    solutions: ["Process automation", "Quality control systems", "Supply chain optimization"],
    stats: { clients: 45, projects: 85, satisfaction: 98.9 },
    caseStudy: {
      title: "Automotive Manufacturer",
      result: "25% improvement in production efficiency"
    }
  },
  {
    id: "finance",
    name: "Financial Services",
    icon: <Landmark className="h-6 w-6" />,
    description: "Secure and compliant financial technology solutions for modern banking and fintech.",
    solutions: ["Digital banking platforms", "Risk management", "Regulatory compliance"],
    stats: { clients: 30, projects: 70, satisfaction: 99.5 },
    caseStudy: {
      title: "Regional Bank",
      result: "50% faster loan processing"
    }
  },
  {
    id: "technology",
    name: "Technology",
    icon: <Smartphone className="h-6 w-6" />,
    description: "Cutting-edge solutions for tech companies looking to scale and innovate faster.",
    solutions: ["Cloud infrastructure", "DevOps automation", "Scalable architectures"],
    stats: { clients: 65, projects: 180, satisfaction: 98.1 },
    caseStudy: {
      title: "SaaS Startup",
      result: "10x scaling capacity achieved"
    }
  }
];

export function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/20 via-primary/[0.02] to-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Industries We Serve</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Expertise Across 
            <span className="text-primary"> Every Sector</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            From healthcare to manufacturing, our deep industry knowledge and specialized solutions 
            drive measurable results across diverse sectors.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden">
                <CardContent className="p-6">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{industry.name}</h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {industry.description}
                  </p>
                  
                  {/* Solutions */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-sm">Key Solutions:</h4>
                    <div className="space-y-1">
                      {industry.solutions.map((solution, i) => (
                        <div key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                          {solution}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="text-center">
                      <div className="font-bold text-lg">{industry.stats.clients}+</div>
                      <div className="text-xs text-muted-foreground">Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{industry.stats.projects}+</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{industry.stats.satisfaction}%</div>
                      <div className="text-xs text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                  
                  {/* Case Study */}
                  {industry.caseStudy && (
                    <div className="border-t border-border pt-4">
                      <div className="text-sm">
                        <div className="font-medium text-primary">{industry.caseStudy.title}</div>
                        <div className="text-muted-foreground">{industry.caseStudy.result}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Don't See Your Industry?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our expertise spans across many sectors. Let's discuss how we can tailor 
                our solutions to meet your specific industry needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    Discuss Your Needs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}