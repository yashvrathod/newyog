"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnhancedProductCard } from "@/components/products/enhanced-product-card";
import { ProductModal } from "@/components/products/product-modal";
import { getFeaturedProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { 
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

// Fallback products data when API fails
const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "AI Analytics Platform",
    slug: "ai-analytics-platform",
    description: "Advanced AI-powered analytics platform for enterprise data insights with real-time processing and machine learning capabilities.",
    shortDescription: "AI-powered analytics for enterprises",
    price: 299,
    discount: 20,
    showPrice: true,
    image: "/ai-consulting-business-meeting-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    stockStatus: "IN_STOCK" as any,
    category: {
      id: "1",
      name: "Software",
      slug: "software"
    } as any,
    specifications: ["Real-time processing", "Machine learning models", "Cloud deployment", "API integration"],
    features: ["AI-Powered", "Cloud-Native", "Real-time Analytics"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2", 
    name: "Cloud Infrastructure Suite",
    slug: "cloud-infrastructure-suite",
    description: "Complete cloud infrastructure management platform with automated scaling, monitoring, and security features built for modern enterprises.",
    shortDescription: "Enterprise cloud management platform",
    price: 199,
    discount: 0,
    showPrice: true,
    image: "/cloud-infrastructure-data-center-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    stockStatus: "IN_STOCK" as any,
    category: {
      id: "2",
      name: "Cloud",
      slug: "cloud"
    } as any,
    specifications: ["Auto-scaling", "24/7 monitoring", "Enterprise security", "Multi-region deployment"],
    features: ["Cloud-Native", "Auto-scaling", "Enterprise Security"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Cybersecurity Shield Pro",
    slug: "cybersecurity-shield-pro",
    description: "Advanced cybersecurity platform providing comprehensive threat protection, real-time monitoring, and automated incident response for enterprises.",
    shortDescription: "Enterprise cybersecurity protection",
    price: 399,
    discount: 15,
    showPrice: true,
    image: "/cybersecurity-monitoring-center-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    stockStatus: "IN_STOCK" as any,
    category: {
      id: "3",
      name: "Security",
      slug: "security"
    } as any,
    specifications: ["Threat detection", "Real-time monitoring", "Incident response", "Compliance reporting"],
    features: ["Advanced Security", "Real-time Monitoring", "Automated Response"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Digital Transformation Suite",
    slug: "digital-transformation-suite",
    description: "Complete digital transformation platform helping businesses modernize operations, automate workflows, and enhance customer experiences.",
    shortDescription: "Complete digital transformation platform",
    price: 499,
    discount: 0,
    showPrice: false,
    image: "/digital-transformation-technology-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    stockStatus: "IN_STOCK" as any,
    category: {
      id: "4",
      name: "Digital Services",
      slug: "digital-services"
    } as any,
    specifications: ["Workflow automation", "Customer experience", "Data integration", "Process optimization"],
    features: ["Workflow Automation", "CX Enhancement", "Data Integration"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function FeaturedProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setLoading(true);
        const featuredProducts = await getFeaturedProducts();
        
        if (featuredProducts && featuredProducts.length > 0) {
          setProducts(featuredProducts.slice(0, 4));
        } else {
          // Use fallback data if API returns empty or fails
          setProducts(fallbackProducts);
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
        // Use fallback data on error
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const stats = [
    { icon: <TrendingUp className="h-5 w-5" />, label: "Best Sellers", value: "Top 4" },
    { icon: <Star className="h-5 w-5" />, label: "Avg Rating", value: "4.8/5" },
    { icon: <Award className="h-5 w-5" />, label: "Award Winning", value: "Industry Leaders" },
    { icon: <Zap className="h-5 w-5" />, label: "Performance", value: "99.9% Uptime" }
  ];

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
          <Badge variant="outline" className="mb-4">Featured Products</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our Most 
            <span className="text-primary"> Popular</span> Solutions
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover our top-rated products that businesses worldwide trust to drive growth, 
            enhance efficiency, and achieve breakthrough results.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                  {stat.icon}
                </div>
                <div className="font-bold text-lg mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="h-96 animate-pulse">
                <div className="h-48 bg-secondary/50 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-secondary/50 rounded mb-2"></div>
                  <div className="h-6 bg-secondary/50 rounded mb-3"></div>
                  <div className="h-4 bg-secondary/50 rounded mb-4"></div>
                  <div className="h-10 bg-secondary/50 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <EnhancedProductCard
                  product={product}
                  onViewDetails={handleViewDetails}
                  viewMode="grid"
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Explore Our Complete Product Portfolio
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover over 100+ enterprise-grade solutions designed to transform your business 
                operations and accelerate growth across every department.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/products">
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
              
              {/* Additional Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  100+ Products Available
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  24/7 Expert Support
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  30-Day Money Back Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Free Installation & Setup
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}