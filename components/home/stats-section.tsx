"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Award, Clock } from "lucide-react";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  description: string;
  trend?: string;
}

const stats: Stat[] = [
  {
    id: "clients",
    label: "Enterprise Clients",
    value: 1000,
    suffix: "+",
    icon: <Users className="h-8 w-8" />,
    description: "Businesses across Pune trust our solutions",
    trend: "+15% this quarter"
  },
  {
    id: "success",
    label: "Success Rate",
    value: 99,
    suffix: "%",
    icon: <TrendingUp className="h-8 w-8" />,
    description: "Project completion with client satisfaction",
    trend: "Industry leading"
  },
  {
    id: "experience",
    label: "Years Excellence",
    value: 16,
    suffix: "+",
    icon: <Clock className="h-8 w-8" />,
    description: "Proven expertise in technology solutions",
    trend: "Since 2008"
  },
  {
    id: "installations",
    label: "CCTV Installations",
    value: 500,
    suffix: "+",
    icon: <Award className="h-8 w-8" />,
    description: "Security systems deployed successfully",
    trend: "Growing rapidly"
  }
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      // Simplified animation with better error handling
      const steps = 60; // Total animation steps
      const increment = value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(increment * step, value);
        
        if (step >= steps || current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, hasAnimated]);

  // Fallback: Show final value if animation hasn't started after 3 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (count === 0 && value > 0) {
        setCount(value);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [count, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold">
      {typeof value === 'number' && value % 1 !== 0 ? count.toFixed(1) : count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Proven Results That 
            <span className="text-primary"> Speak Volumes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Over a decade of excellence serving enterprises and individuals with innovative technology solutions across Pune.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
                <CardContent className="p-6 text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  {/* Value */}
                  <div className="mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    {/* Fallback for SSR */}
                    <noscript>
                      <span className="text-4xl md:text-5xl font-bold">
                        {stat.value}{stat.suffix}
                      </span>
                    </noscript>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3">{stat.description}</p>
                  
                  {/* Trend */}
                  {stat.trend && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-medium">
                      <TrendingUp className="h-3 w-3" />
                      {stat.trend}
                    </div>
                  )}
                </CardContent>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Ready to join our growing enterprise community?
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-primary font-medium">
            <span>Join 1000+ satisfied enterprise clients</span>
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