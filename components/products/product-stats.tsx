"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Star, 
  Users, 
  Award,
  ShoppingCart,
  Clock,
  Globe,
  Zap
} from "lucide-react";

interface ProductStatsProps {
  totalProducts: number;
  categories: number;
  avgRating: number;
  totalSales: number;
}

export function ProductStats({ totalProducts, categories, avgRating, totalSales }: ProductStatsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Market Leading",
      value: "15+",
      subtitle: "Years of innovation",
      description: "Continuous product development and market leadership",
      color: "text-blue-600"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Customer Satisfaction",
      value: avgRating.toFixed(1),
      subtitle: "Average rating",
      description: "Based on 10,000+ verified customer reviews",
      color: "text-yellow-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Global Reach",
      value: "500K+",
      subtitle: "Active users",
      description: "Trusted by businesses in 50+ countries worldwide",
      color: "text-green-600"
    },
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      title: "Proven Success",
      value: totalSales.toLocaleString(),
      subtitle: "Products deployed",
      description: "Successful implementations across industries",
      color: "text-purple-600"
    }
  ];

  const features = [
    {
      icon: <Award className="h-5 w-5" />,
      title: "Industry Awards",
      description: "25+ industry recognition awards"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Deployment",
      description: "Cloud infrastructure in 6 regions"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Lightning Fast",
      description: "99.9% uptime with sub-second response"
    }
  ];

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-primary/[0.02] to-secondary/20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Product Excellence</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Trusted by Industry 
            <span className="text-primary"> Leaders</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Our products consistently deliver exceptional value, backed by industry-leading 
            performance metrics and customer satisfaction scores.
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <h3 className="font-semibold text-lg mb-2">{stat.title}</h3>
                  <p className="text-sm text-primary mb-3">{stat.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Join thousands of satisfied customers worldwide
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-primary font-medium">
            <span>Explore our complete product portfolio</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-1"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}