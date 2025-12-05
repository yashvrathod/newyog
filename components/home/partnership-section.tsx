"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Handshake,
  Users2,
  Globe2,
  Award,
  TrendingUp,
  Calendar,
  ArrowRight,
  Star,
  CheckCircle2
} from "lucide-react";

interface Partnership {
  id: string;
  type: "Technology" | "Strategic" | "Channel" | "Integration";
  partner: string;
  logo?: string;
  description: string;
  benefits: string[];
  tier: "Premier" | "Elite" | "Gold" | "Silver";
  established: string;
  projects: number;
}

interface Program {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  requirements: string[];
  featured?: boolean;
}

const partnerships: Partnership[] = [
  {
    id: "dell",
    type: "Technology",
    partner: "Dell Technologies",
    description: "Authorized Dell partner providing enterprise computers, servers, and hardware solutions to businesses across Pune.",
    benefits: ["Wholesale pricing", "Technical support", "Training programs", "Extended warranties"],
    tier: "Gold",
    established: "2015",
    projects: 45
  },
  {
    id: "hp",
    type: "Technology", 
    partner: "HP Inc.",
    description: "Certified HP partner specializing in business laptops, printers, and enterprise computing solutions.",
    benefits: ["Partner discounts", "Priority support", "Training resources", "Marketing support"],
    tier: "Silver",
    established: "2012",
    projects: 38
  },
  {
    id: "hikvision",
    type: "Strategic",
    partner: "Hikvision India",
    description: "Authorized security partner providing CCTV cameras, surveillance systems, and security solutions.",
    benefits: ["Product training", "Technical support", "Competitive pricing", "Installation guidance"],
    tier: "Gold",
    established: "2018",
    projects: 62
  },
  {
    id: "lenovo",
    type: "Technology",
    partner: "Lenovo India",
    description: "Lenovo business partner offering ThinkPad laptops, desktops, and enterprise computing solutions.",
    benefits: ["Business pricing", "Extended support", "Training access", "Marketing materials"],
    tier: "Silver",
    established: "2016",
    projects: 28
  }
];

const programs: Program[] = [
  {
    id: "technology-partner",
    title: "Technology Partner Program",
    description: "Join our ecosystem of technology partners and expand your market reach through strategic collaboration.",
    icon: <Handshake className="h-6 w-6" />,
    benefits: [
      "Joint go-to-market strategies",
      "Technical integration support", 
      "Co-marketing opportunities",
      "Shared customer success"
    ],
    requirements: [
      "Complementary technology stack",
      "Proven track record",
      "Dedicated partner resources",
      "Mutual customer value"
    ],
    featured: true
  },
  {
    id: "channel-partner",
    title: "Channel Partner Program",
    description: "Expand your service offerings with our proven solutions and comprehensive partner support.",
    icon: <Users2 className="h-6 w-6" />,
    benefits: [
      "Revenue sharing model",
      "Sales training and certification",
      "Marketing support and leads",
      "Technical enablement"
    ],
    requirements: [
      "Established client base",
      "Sales and technical team",
      "Market presence",
      "Service delivery capability"
    ]
  },
  {
    id: "startup-accelerator",
    title: "Startup Accelerator",
    description: "Fast-track your startup growth with our technology, mentorship, and market access.",
    icon: <TrendingUp className="h-6 w-6" />,
    benefits: [
      "Technology credits and resources",
      "Mentorship and guidance",
      "Investor introductions",
      "Market validation support"
    ],
    requirements: [
      "Early to growth stage startup",
      "Innovative technology solution",
      "Scalable business model",
      "Committed founding team"
    ]
  }
];

const partnershipStats = [
  { label: "Technology Partners", value: "12+", icon: <Handshake className="h-5 w-5" /> },
  { label: "Partner Projects", value: "175+", icon: <Globe2 className="h-5 w-5" /> },
  { label: "Partnership Value", value: "₹50L+", icon: <TrendingUp className="h-5 w-5" /> },
  { label: "Success Rate", value: "98%", icon: <Award className="h-5 w-5" /> }
];

export function PartnershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/10 via-primary/[0.02] to-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Strategic Partnerships</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Growing Together Through 
            <span className="text-primary"> Strategic Alliances</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our partnership ecosystem enables us to deliver comprehensive solutions while creating 
            mutual value for all stakeholders in the technology landscape.
          </p>
        </motion.div>

        {/* Partnership Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {partnershipStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Featured Partnerships */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">Strategic Technology Partners</h3>
            <div className="space-y-4">
              {partnerships.map((partnership, index) => (
                <Card key={partnership.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{partnership.partner}</h4>
                          <Badge variant={partnership.tier === 'Premier' ? 'default' : 'secondary'} className="text-xs">
                            {partnership.tier}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {partnership.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {partnership.description}
                        </p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="h-3 w-3" />
                          Since {partnership.established}
                        </div>
                        <div>{partnership.projects}+ projects</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Partnership Benefits:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {partnership.benefits.slice(0, 4).map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Partner Programs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Partner Programs</h3>
            <div className="space-y-6">
              {programs.map((program, index) => (
                <Card key={program.id} className={`group hover:shadow-xl transition-all duration-300 ${
                  program.featured ? 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 to-blue-500/5' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                        {program.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{program.title}</h4>
                        {program.featured && (
                          <Badge className="text-xs">Featured</Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                      {program.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h5 className="font-medium mb-3 text-sm flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Benefits
                        </h5>
                        <ul className="space-y-1">
                          {program.benefits.map((benefit, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3 text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Requirements
                        </h5>
                        <ul className="space-y-1">
                          {program.requirements.map((req, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full rounded-full" size="sm">
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardContent className="p-8">
              <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Ready to Partner with Us?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join our growing ecosystem of partners and unlock new opportunities for growth, 
                innovation, and mutual success in the technology marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/partnerships">
                    Become a Partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Schedule a Discussion</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}