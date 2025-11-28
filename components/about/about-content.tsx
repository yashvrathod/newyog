"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { 
  CheckCircle, Users, Award, Globe, Zap, Shield, Heart, 
  Cpu, Monitor, Wrench, Camera, Phone, MapPin, ArrowRight,
  Lightbulb, Target, Star, Clock, Settings, Wifi
} from "lucide-react"

const milestones = [
  {
    year: "2003",
    title: "Yog Computers Founded",
    description: "Started with a mission to provide reliable technology solutions to Pune's growing business community.",
    icon: Lightbulb,
  },
  {
    year: "2008",
    title: "CCTV Services Launch",
    description: "Expanded into security camera installation, becoming Pune's trusted security solutions provider.",
    icon: Camera,
  },
  {
    year: "2015",
    title: "Electrical Division",
    description: "Added comprehensive electrical services, offering complete technology infrastructure solutions.",
    icon: Zap,
  },
  {
    year: "2018",
    title: "1000+ Customers",
    description: "Reached the milestone of serving over 1000 satisfied customers across Pune and surrounding areas.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description: "Embraced modern web presence and digital customer service while maintaining our personal touch.",
    icon: Target,
  },
]

const values = [
  {
    icon: CheckCircle,
    title: "Expertise You Can Trust",
    description: "With years of hands-on experience, we offer expert solutions for every computing need—from hardware troubleshooting to enterprise-level IT support.",
  },
  {
    icon: Users,
    title: "Customer-Centric Approach",
    description: "Your satisfaction is our top priority. We listen, understand your needs, and provide solutions that deliver real value.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "Backed by successful installations, satisfied clients, and ongoing support, we stand as a trusted technical partner.",
  },
  {
    icon: Globe,
    title: "Transparent Communication",
    description: "No hidden costs. No complex technical jargon. We clearly explain every step so you always know what you're getting.",
  },
  {
    icon: Zap,
    title: "Quality Assurance",
    description: "We offer only the best products and services—tested, verified, and guaranteed for performance.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Our clients trust us to deliver consistent, dependable results every time.",
  },
]

const achievements = [
  { number: "1000+", label: "Devices Serviced" },
  { number: "500+", label: "CCTV Installations" },
  { number: "20+", label: "Years of Excellence" },
  { number: "99%", label: "Customer Satisfaction" },
]

export function AboutContent() {
  const ref = useRef(null)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={ref}>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent" />
        </motion.div>

        {/* Floating Tech Elements */}
        <div className="absolute inset-0 z-5">
          <motion.div
            className="absolute top-1/4 left-1/6 text-primary/20"
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cpu size={60} />
          </motion.div>
          <motion.div
            className="absolute top-1/3 right-1/6 text-primary/20"
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Monitor size={50} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 left-1/4 text-primary/20"
            animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          >
            <Camera size={45} />
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-1/4 text-primary/20"
            animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Settings size={40} />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div 
          className="relative z-10 mx-auto max-w-6xl px-6 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="outline" className="px-6 py-2 text-base">
                About Yog Computers
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Technology Partner You Can{" "}
              <motion.span 
                className="text-primary relative inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Trust
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              At Yog Computers, trust is the foundation of everything we do. We understand that your technology needs are essential to your daily life and business operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/services">
                  Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1.5"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div 
              className="w-1 h-1 rounded-full bg-foreground/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Our Impact</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="text-primary">Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Over two decades of serving Pune with dedication and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center group"
              >
                <motion.div 
                  className="relative mb-4"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-4xl md:text-6xl font-bold text-primary mb-2 relative">
                    {achievement.number}
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-full blur-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </motion.div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4">Our Journey</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Two Decades of <span className="text-primary">Innovation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small computer shop to Pune's trusted technology partner
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Animated Timeline line */}
            <motion.div 
              className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-blue-500 to-primary rounded-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -100, rotateY: -45 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                  className="relative flex items-start gap-8 group"
                >
                  <motion.div 
                    className="flex-shrink-0 relative z-10"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                      />
                      <span className="relative z-10">{milestone.year}</span>
                    </div>
                    
                    {/* Floating icon */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 360
                      }}
                    >
                      <milestone.icon className="w-4 h-4 text-primary" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex-1 min-w-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    <Card className="border-0 bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 group-hover:shadow-xl relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      
                      <CardContent className="p-8 relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                              {milestone.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5" />
        
        <div className="mx-auto max-w-7xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge variant="outline" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that have guided us for over 20 years and continue to drive our commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group perspective-1000"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 bg-background/60 backdrop-blur-sm group-hover:bg-background/80 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className="mb-6"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                    </motion.div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience the <span className="text-primary">Difference?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Yog Computers for their technology needs. 
              Let us show you what 20+ years of expertise can do for your business.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/contact">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/services">View Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}