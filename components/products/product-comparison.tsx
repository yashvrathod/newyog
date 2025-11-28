"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/lib/types";
import { 
  Check, 
  X, 
  Star, 
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Award
} from "lucide-react";

interface ProductComparisonProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export function ProductComparison({ products, onSelectProduct }: ProductComparisonProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock comparison features
  const comparisonFeatures = [
    { 
      name: "AI-Powered Analytics", 
      enterprise: true, 
      professional: true, 
      basic: false,
      icon: <Zap className="h-4 w-4" />
    },
    { 
      name: "Advanced Security", 
      enterprise: true, 
      professional: true, 
      basic: true,
      icon: <Shield className="h-4 w-4" />
    },
    { 
      name: "Global Deployment", 
      enterprise: true, 
      professional: false, 
      basic: false,
      icon: <Globe className="h-4 w-4" />
    },
    { 
      name: "24/7 Premium Support", 
      enterprise: true, 
      professional: true, 
      basic: false,
      icon: <Award className="h-4 w-4" />
    },
    { 
      name: "Custom Integration", 
      enterprise: true, 
      professional: false, 
      basic: false,
      icon: <Check className="h-4 w-4" />
    },
    { 
      name: "API Access", 
      enterprise: true, 
      professional: true, 
      basic: true,
      icon: <Check className="h-4 w-4" />
    },
    { 
      name: "Multi-tenant Support", 
      enterprise: true, 
      professional: false, 
      basic: false,
      icon: <Check className="h-4 w-4" />
    },
    { 
      name: "Advanced Reporting", 
      enterprise: true, 
      professional: true, 
      basic: false,
      icon: <Check className="h-4 w-4" />
    }
  ];

  // Mock product tiers
  const productTiers = [
    {
      name: "Basic",
      price: 99,
      popular: false,
      features: comparisonFeatures.map(f => ({ ...f, included: f.basic })),
      description: "Perfect for small teams getting started",
      users: "Up to 10 users",
      storage: "10GB storage",
      support: "Email support"
    },
    {
      name: "Professional",
      price: 299,
      popular: true,
      features: comparisonFeatures.map(f => ({ ...f, included: f.professional })),
      description: "Ideal for growing businesses",
      users: "Up to 100 users",
      storage: "100GB storage",
      support: "Priority support"
    },
    {
      name: "Enterprise",
      price: 999,
      popular: false,
      features: comparisonFeatures.map(f => ({ ...f, included: f.enterprise })),
      description: "Complete solution for large organizations",
      users: "Unlimited users",
      storage: "Unlimited storage",
      support: "Dedicated support"
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
          <Badge variant="outline" className="mb-4">Product Comparison</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Choose the Right 
            <span className="text-primary"> Solution</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Compare our product tiers to find the perfect fit for your business needs. 
            All plans include our core features with varying levels of advanced capabilities.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {productTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              <Card className={`h-full ${tier.popular ? 'ring-2 ring-primary/20 scale-105' : ''} hover:shadow-xl transition-all duration-300`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{tier.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <span className="font-medium">{tier.users}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Storage:</span>
                      <span className="font-medium">{tier.storage}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Support:</span>
                      <span className="font-medium">{tier.support}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Features Included:</h4>
                    <div className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={feature.included ? "" : "text-muted-foreground"}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button 
                      className={`w-full rounded-full ${tier.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                      variant={tier.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {tier.popular ? "Get Started" : "Choose Plan"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <p className="text-center text-xs text-muted-foreground mt-3">
                      14-day free trial • No credit card required
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our enterprise team can create tailored solutions with custom features, 
                dedicated support, and flexible pricing for your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="rounded-full">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full">
                  View Enterprise Features
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}