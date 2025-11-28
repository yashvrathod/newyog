"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Media } from "@/lib/types";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { id: "all", name: "All" },
  { id: "gallery", name: "Gallery" },
  { id: "events", name: "Events" },
  { id: "products", name: "Products" },
  { id: "services", name: "Services" },
  { id: "office", name: "Office" },
];

const galleryData: GalleryImage[] = [
  {
    id: "1",
    title: "Annual Conference 2024",
    description: "Our biggest event of the year",
    url: "/placeholder.svg?key=s5v9o",
    category: "events",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Product Launch Event",
    description: "Introducing our latest innovations",
    url: "/placeholder.svg?key=hqc32",
    category: "events",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Enterprise Server Setup",
    description: "State-of-the-art server room",
    url: "/placeholder.svg?key=a0aev",
    category: "products",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Industrial Automation",
    description: "Smart factory solutions",
    url: "/placeholder.svg?key=nv2gv",
    category: "products",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "Client Workshop",
    description: "Hands-on training session",
    url: "/placeholder.svg?key=i2spi",
    category: "services",
    createdAt: new Date(),
  },
  {
    id: "6",
    title: "Strategy Meeting",
    description: "Planning for success",
    url: "/placeholder.svg?key=p3njz",
    category: "services",
    createdAt: new Date(),
  },
  {
    id: "7",
    title: "Company Headquarters",
    description: "Our modern workspace",
    url: "/placeholder.svg?key=6z1r9",
    category: "office",
    createdAt: new Date(),
  },
  {
    id: "8",
    title: "Open Office Space",
    description: "Collaborative work environment",
    url: "/placeholder.svg?key=97fjy",
    category: "office",
    createdAt: new Date(),
  },
  {
    id: "9",
    title: "Team Building Day",
    description: "Fun and collaboration",
    url: "/placeholder.svg?key=u91sy",
    category: "events",
    createdAt: new Date(),
  },
  {
    id: "10",
    title: "Smart Office Hub",
    description: "Connected workplace",
    url: "/placeholder.svg?key=7dmj7",
    category: "products",
    createdAt: new Date(),
  },
  {
    id: "11",
    title: "Consulting Session",
    description: "Expert guidance",
    url: "/placeholder.svg?key=h3dds",
    category: "services",
    createdAt: new Date(),
  },
  {
    id: "12",
    title: "Rooftop Lounge",
    description: "Relaxation space",
    url: "/placeholder.svg?key=fflmr",
    category: "office",
    createdAt: new Date(),
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [images, setImages] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImages();
  }, [selectedCategory]);

  async function loadImages() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      const response = await fetch(`/api/gallery?${params}`);
      const result = await response.json();

      if (response.ok) {
        setImages(result.data || []);
        setError(null);
      } else {
        setError(result.error || "Failed to load gallery");
        setImages([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
      setImages([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredImages = images;

  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  return (
    <>
      <Header />
      <main className="pt-42 pb-16">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Our <span className="font-serif italic">Gallery</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore moments from our events, products, services, and
                workspace that define who we are.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category filters */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "rounded-full",
                    selectedCategory === category.id &&
                      "bg-foreground text-background hover:bg-foreground/90"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div
              layout
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="break-inside-avoid"
                    >
                      <div className="w-full bg-muted rounded-xl animate-pulse aspect-square" />
                    </div>
                  ))
                ) : error ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <p className="text-destructive mb-4">Error: {error}</p>
                    <Button onClick={loadImages} variant="outline">
                      Retry
                    </Button>
                  </div>
                ) : images.length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center py-16">
                    <p className="text-muted-foreground">No images found</p>
                  </div>
                ) : (
                  filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="break-inside-avoid"
                    >
                      <div
                        className="relative group cursor-pointer overflow-hidden rounded-xl"
                        onClick={() => openLightbox(image)}
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt || image.filename}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div>
                            <h3 className="text-background font-semibold text-lg">
                              {image.caption || image.filename}
                            </h3>
                            {image.description && (
                              <p className="text-background/80 text-sm">
                                {image.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background rounded-full"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}

            {currentIndex < filteredImages.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}

            {selectedImage && (
              <div className="relative">
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.title}
                  width={800}
                  height={600}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-xl">
                  <h3 className="text-background font-semibold text-xl">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-background/80 text-sm mt-1">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}
