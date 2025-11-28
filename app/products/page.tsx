"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { getProducts, getCategories } from "@/lib/data";
import type { Product, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.isActive) return false;
      return !selectedCategory || product.category?.slug === selectedCategory;
    });
  }, [products, selectedCategory]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleContactToBuy = (product: Product) => {
    // Navigate to contact page with product pre-selected
    const contactUrl = `/contact?product=${encodeURIComponent(
      product.name
    )}&type=purchase&subject=${encodeURIComponent(
      `Inquiry about ${product.name}`
    )}`;
    window.location.href = contactUrl;
  };

  const handleRequestCustom = () => {
    // Navigate to contact page for custom product request
    const contactUrl = `/contact?type=custom&subject=${encodeURIComponent(
      "Custom Product Request"
    )}`;
    window.location.href = contactUrl;
  };

  return (
    <>
      <Header />
      <main className="pt-42 pb-16">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Our <span className="font-serif italic">Products</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover our curated selection of high-quality products designed
                to meet your business needs and drive success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category filters */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "rounded-full",
                  !selectedCategory &&
                    "bg-foreground text-background hover:bg-foreground/90"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "rounded-full",
                    selectedCategory === category.slug &&
                      "bg-foreground text-background hover:bg-foreground/90"
                  )}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground/30"></div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      onViewDetails={handleViewDetails}
                      onContactToBuy={handleContactToBuy}
                      showPricing={true}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need a custom product?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team can work with you to create customized solutions that
                perfectly match your specific requirements and business goals.
              </p>
              <Button
                size="lg"
                className="rounded-full px-8"
                onClick={handleRequestCustom}
              >
                Request Custom Product
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Product Details Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold pr-8">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Product Image */}
                {selectedProduct.image && (
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-secondary/30">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Category and Price */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-sm">
                    {typeof selectedProduct.category === "string"
                      ? selectedProduct.category
                      : selectedProduct.category?.name || "Uncategorized"}
                  </Badge>

                  {selectedProduct.showPrice && (
                    <div className="text-right">
                      {selectedProduct.discount ? (
                        <div className="space-y-1">
                          <div className="text-2xl font-bold">
                            $
                            {(
                              (selectedProduct.price || 0) *
                              (1 - selectedProduct.discount / 100)
                            ).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground line-through">
                            ${(selectedProduct.price || 0).toLocaleString()}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {selectedProduct.discount}% OFF
                          </Badge>
                        </div>
                      ) : (
                        <div className="text-2xl font-bold">
                          ${(selectedProduct.price || 0).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Specifications */}
                {selectedProduct.specifications &&
                  selectedProduct.specifications.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Specifications</h3>
                      <ul className="space-y-2">
                        {selectedProduct.specifications.map((spec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {spec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Features */}
                {selectedProduct.features &&
                  selectedProduct.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Key Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.features.map((feature, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleContactToBuy(selectedProduct);
                      setShowProductModal(false);
                    }}
                  >
                    {selectedProduct.showPrice ? "Buy Now" : "Contact to Buy"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowProductModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
