"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Category } from "@/lib/types";
import { 
  ArrowRight,
  Laptop,
  Smartphone,
  Shield,
  Database,
  Cloud,
  Zap,
  Cog,
  Globe
} from "lucide-react";

interface CategoryShowcaseProps {
  categories: Category[];
  onCategorySelect: (categorySlug: string) => void;
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  "software": <Laptop className="h-6 w-6" />,
  "mobile": <Smartphone className="h-6 w-6" />,
  "security": <Shield className="h-6 w-6" />,
  "database": <Database className="h-6 w-6" />,
  "cloud": <Cloud className="h-6 w-6" />,
  "automation": <Cog className="h-6 w-6" />,
  "analytics": <Zap className="h-6 w-6" />,
  "integration": <Globe className="h-6 w-6" />
};

export function ProductCategoriesShowcase({ categories, onCategorySelect }: CategoryShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Enhanced categories with mock data
  const enhancedCategories = categories.map(category => ({
    ...category,
    icon: categoryIcons[category.slug] || <Laptop className="h-6 w-6" />,
    productCount: Math.floor(Math.random() * 50) + 10,
    trending: Math.random() > 0.7,
    description: `Discover our comprehensive ${category.name.toLowerCase()} solutions designed for modern enterprises.`,
    features: [
      "Enterprise-grade reliability",
      "Scalable architecture",
      "24/7 support included",
      "Advanced security"
    ]
  }));

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
          <Badge variant="outline" className="mb-4">Product Categories</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive Solutions for 
            <span className="text-primary"> Every Need</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore our diverse product portfolio spanning multiple technology domains, 
            each designed to address specific business challenges and opportunities.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {enhancedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group h-full hover:shadow-xl transition-all duration-300 border-border/50 cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{category.productCount}</div>
                        <div className="text-xs text-muted-foreground">Products</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      {category.trending && (
                        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-xs">
                          Trending
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="px-6 pb-6">
                    <div className="space-y-2 mb-4">
                      {category.features.slice(0, 2).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={() => onCategorySelect(category.slug)}
                    >
                      Explore {category.name}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our product experts are here to help you find the perfect solution 
                for your specific business requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="rounded-full">
                  <Link href="/contact">
                    Speak with an Expert
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/services">Custom Solutions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}