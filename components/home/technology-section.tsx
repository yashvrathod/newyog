"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { 
  Brain,
  Cloud,
  Shield,
  Smartphone,
  Database,
  Cpu,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface Technology {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  capabilities: string[];
  adoptionRate: number;
  category: "AI/ML" | "Cloud" | "Security" | "Infrastructure";
  trending?: boolean;
}

interface TechStack {
  category: string;
  technologies: string[];
  description: string;
}

const technologies: Technology[] = [
  {
    id: "ai-ml",
    name: "Artificial Intelligence & ML",
    icon: <Brain className="h-6 w-6" />,
    description: "Advanced AI and machine learning solutions that automate processes and provide intelligent insights.",
    capabilities: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Automated Decision Making"],
    adoptionRate: 85,
    category: "AI/ML",
    trending: true
  },
  {
    id: "cloud-native",
    name: "Cloud-Native Architecture",
    icon: <Cloud className="h-6 w-6" />,
    description: "Scalable, resilient cloud solutions designed for modern business demands and global reach.",
    capabilities: ["Microservices", "Container Orchestration", "Auto-scaling", "Global Distribution"],
    adoptionRate: 92,
    category: "Cloud"
  },
  {
    id: "cybersecurity",
    name: "Advanced Cybersecurity",
    icon: <Shield className="h-6 w-6" />,
    description: "Comprehensive security frameworks protecting against evolving cyber threats.",
    capabilities: ["Zero-Trust Architecture", "Threat Intelligence", "Identity Management", "Compliance Automation"],
    adoptionRate: 78,
    category: "Security",
    trending: true
  },
  {
    id: "edge-computing",
    name: "Edge Computing",
    icon: <Cpu className="h-6 w-6" />,
    description: "Distributed computing solutions bringing processing power closer to data sources.",
    capabilities: ["Real-time Processing", "Low Latency", "IoT Integration", "Offline Capabilities"],
    adoptionRate: 67,
    category: "Infrastructure"
  },
  {
    id: "data-analytics",
    name: "Advanced Data Analytics",
    icon: <Database className="h-6 w-6" />,
    description: "Powerful data processing and analytics platforms for actionable business intelligence.",
    capabilities: ["Real-time Analytics", "Data Warehousing", "Business Intelligence", "Data Visualization"],
    adoptionRate: 89,
    category: "Infrastructure"
  },
  {
    id: "mobile-first",
    name: "Mobile-First Solutions",
    icon: <Smartphone className="h-6 w-6" />,
    description: "Native and cross-platform mobile applications optimized for performance and user experience.",
    capabilities: ["Cross-platform Development", "Offline Functionality", "Push Notifications", "Biometric Authentication"],
    adoptionRate: 94,
    category: "Infrastructure"
  }
];

const techStack: TechStack[] = [
  {
    category: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
    description: "Modern, responsive interfaces with exceptional user experiences"
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
    description: "Scalable, high-performance server architectures"
  },
  {
    category: "Cloud",
    technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker"],
    description: "Enterprise-grade cloud infrastructure and deployment"
  },
  {
    category: "AI/ML",
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "MLflow"],
    description: "Cutting-edge artificial intelligence and machine learning"
  }
];

export function TechnologySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/[0.02] to-secondary/10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Our Technology</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Powered by 
            <span className="text-primary"> Next-Generation</span> Technology
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We leverage cutting-edge technologies and proven frameworks to deliver 
            solutions that are secure, scalable, and future-ready.
          </p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50 overflow-hidden">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{tech.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {tech.category}
                        </Badge>
                      </div>
                    </div>
                    {tech.trending && (
                      <Badge className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                        <Zap className="h-3 w-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {tech.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-sm">Key Capabilities:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {tech.capabilities.map((capability, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Adoption Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Client Adoption</span>
                      <span className="font-bold">{tech.adoptionRate}%</span>
                    </div>
                    <div className="w-full bg-secondary/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tech.adoptionRate}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        className="h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </CardContent>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Our Technology Stack
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We carefully select and master the most effective technologies to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-2">{stack.category}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {stack.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stack.technologies.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-blue-500/5">
            <CardContent className="p-8">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Let's discuss how our technology solutions can drive your business forward. 
                From strategy to implementation, we're your trusted technology partner.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/products">Explore Solutions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}