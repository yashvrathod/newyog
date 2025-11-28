"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ServiceCard } from "@/components/services/service-card";
import { ServiceInquiryModal } from "@/components/services/service-inquiry-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Service, Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesResponse, categoriesResponse] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/cms/categories?type=SERVICE'),
        ]);
        
        const servicesData = await servicesResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setServices(servicesData.data || []);
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      if (!service.isActive) return false;
      return !selectedCategory || service.category?.slug === selectedCategory;
    });
  }, [services, selectedCategory]);

  const handleInquire = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleScheduleConsultation = () => {
    // Navigate to contact page for consultation booking
    const contactUrl = `/contact?type=consultation&subject=${encodeURIComponent(
      "Schedule a Consultation"
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
                Our <span className="font-serif italic">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Expert solutions tailored to your unique business challenges.
                From strategy to execution, we&apos;re with you every step of
                the way.
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
                All Services
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

        {/* Services Grid */}
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
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ServiceCard
                      service={service}
                      onInquire={handleInquire}
                      onViewDetails={handleViewDetails}
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
                Need a custom solution?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our team of experts is ready to discuss your specific
                requirements and create a tailored solution that fits your
                business needs.
              </p>
              <Button
                size="lg"
                className="rounded-full px-8"
                onClick={handleScheduleConsultation}
              >
                Schedule a Consultation
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <ServiceInquiryModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Service Details Modal */}
      <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold pr-8">
                  {selectedService.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Service Image */}
                {selectedService.image && (
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-secondary/30">
                    <img
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Category */}
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-sm">
                    {typeof selectedService.category === "string"
                      ? selectedService.category
                      : selectedService.category?.name || "Uncategorized"}
                  </Badge>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-3">Service Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                {/* Tags */}
                {selectedService.tags && selectedService.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3">Service Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service Benefits */}
                <div>
                  <h3 className="font-semibold mb-3">What You Get</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Expert consultation and strategy development
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Customized solution design
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Implementation support and guidance
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Ongoing support and optimization
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleInquire(selectedService);
                      setShowServiceModal(false);
                    }}
                  >
                    Learn More
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowServiceModal(false)}
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
