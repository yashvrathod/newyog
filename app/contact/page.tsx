"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Building2,
  Users,
  Truck,
  Briefcase,
} from "lucide-react";

const contactTypes = [
  {
    id: "customer",
    label: "Customer",
    icon: Users,
    description: "General inquiries and support",
  },
  {
    id: "vendor",
    label: "Vendor",
    icon: Truck,
    description: "Partnership opportunities",
  },
  {
    id: "distributor",
    label: "Distributor",
    icon: Building2,
    description: "Distribution inquiries",
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: Briefcase,
    description: "B2B solutions",
  },
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submitted:", { type: selectedType, ...formData });
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    setIsSubmitting(false);
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
                Get in <span className="font-serif italic">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a question or want to work together? We&apos;d love to hear
                from you. Reach out through any of the channels below.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary rounded-full">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground text-sm">
                          info@yogcomputers.com
                        </p>
                        <p className="text-muted-foreground text-sm">
                          support@yogcomputers.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary rounded-full">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground text-sm">
                          +91-9850850331
                        </p>
                        <p className="text-muted-foreground text-sm">
                          24/7 Support Available
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary rounded-full">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p className="text-muted-foreground text-sm">
                          575, 34/1, Bharti Vidyapeeth Campus
                          <br />
                          Shivshankar Complex, Near R K Hostel
                          <br />
                          Tanaje Nagar, Mohan Nagar, Dhankawadi
                          <br />
                          Pune, Maharashtra 411043
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WhatsApp Button */}
                <Button
                  className="w-full rounded-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  asChild
                >
                  <a
                    href="https://wa.me/919850850331"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Select your inquiry type and fill out the form below
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Contact type selector */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                      {contactTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={cn(
                            "p-4 rounded-xl border-2 transition-all text-left",
                            selectedType === type.id
                              ? "border-foreground bg-secondary"
                              : "border-border hover:border-foreground/50"
                          )}
                        >
                          <type.icon className="h-5 w-5 mb-2" />
                          <p className="font-medium text-sm">{type.label}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            {type.description}
                          </p>
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                            placeholder="Your company name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Tell us about your inquiry..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full rounded-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
