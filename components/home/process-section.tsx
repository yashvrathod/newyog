"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Target, 
  Cog, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Users,
  Zap
} from "lucide-react";

interface ProcessStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  deliverables: string[];
  tools: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    phase: "01",
    title: "Discovery & Analysis",
    description: "We dive deep into your business needs, challenges, and goals to craft the perfect solution strategy.",
    icon: <Search className="h-6 w-6" />,
    duration: "1-2 weeks",
    deliverables: ["Requirements analysis", "Market research", "Technical audit"],
    tools: ["Stakeholder interviews", "Competitive analysis", "Technical assessment"]
  },
  {
    id: "strategy",
    phase: "02", 
    title: "Strategic Planning",
    description: "Develop a comprehensive roadmap with clear milestones, timelines, and success metrics.",
    icon: <Target className="h-6 w-6" />,
    duration: "1-2 weeks",
    deliverables: ["Project roadmap", "Resource allocation", "Timeline planning"],
    tools: ["Strategy workshops", "Resource mapping", "Risk assessment"]
  },
  {
    id: "implementation",
    phase: "03",
    title: "Implementation",
    description: "Execute the plan with precision, maintaining quality standards and regular communication.",
    icon: <Cog className="h-6 w-6" />,
    duration: "2-12 weeks",
    deliverables: ["Progressive milestones", "Quality assurance", "Regular updates"],
    tools: ["Agile methodology", "Quality control", "Progress tracking"]
  },
  {
    id: "delivery",
    phase: "04",
    title: "Delivery & Support",
    description: "Complete project delivery with thorough testing, training, and ongoing support.",
    icon: <CheckCircle className="h-6 w-6" />,
    duration: "Ongoing",
    deliverables: ["Final delivery", "Training materials", "Support documentation"],
    tools: ["Testing protocols", "Training sessions", "Support systems"]
  }
];

const processHighlights = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: "On-Time Delivery",
    description: "98.5% of projects delivered on schedule"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Expert Team",
    description: "Dedicated specialists for every project"
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Agile Process",
    description: "Flexible methodology adapts to your needs"
  }
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Our Process</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            From Vision to 
            <span className="text-primary"> Reality</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our proven 4-phase methodology ensures every project is delivered with precision, 
            quality, and measurable results. Here's how we turn your ideas into success.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-8 mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Step Content */}
              <div className="flex-1">
                <Card className="group hover:shadow-xl transition-all duration-300 border-border/50">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                      <div>
                        <Badge variant="secondary" className="mb-2">Phase {step.phase}</Badge>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Key Deliverables
                        </h4>
                        <ul className="space-y-1">
                          {step.deliverables.map((deliverable, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Cog className="h-4 w-4 text-blue-600" />
                          Tools & Methods
                        </h4>
                        <ul className="space-y-1">
                          {step.tools.map((tool, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                              <ArrowRight className="h-3 w-3 text-primary" />
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{step.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Visual Connector */}
              <div className="hidden lg:flex items-center justify-center w-16">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{step.phase}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-border"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {processHighlights.map((highlight, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  {highlight.icon}
                </div>
                <h3 className="font-semibold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}