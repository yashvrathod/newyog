"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Award, Users, Star } from "lucide-react";

interface ProductHeroProps {
  totalProducts: number;
  featuredCount: number;
  categories: number;
}

export function ProductHero({ totalProducts, featuredCount, categories }: ProductHeroProps) {
  const stats = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: totalProducts,
      label: "Products",
      suffix: ""
    },
    {
      icon: <Star className="h-5 w-5" />,
      value: featuredCount,
      label: "Featured",
      suffix: ""
    },
    {
      icon: <Award className="h-5 w-5" />,
      value: categories,
      label: "Categories",
      suffix: ""
    },
    {
      icon: <Users className="h-5 w-5" />,
      value: 98.5,
      label: "Satisfaction",
      suffix: "%"
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-blue-gradient-soft overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-blue-radial opacity-30" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-white/50 backdrop-blur-sm">
            Premium Product Portfolio
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Innovative <span className="font-serif italic text-primary">Products</span>
            <br />
            for Modern Business
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive product ecosystem designed to accelerate growth, 
            enhance efficiency, and drive measurable business outcomes across industries.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect border-white/20">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Industry-leading innovation
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              Enterprise-grade reliability
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              Comprehensive support
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              Scalable solutions
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}