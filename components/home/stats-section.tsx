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
    label: "Active Clients",
    value: 500,
    suffix: "+",
    icon: <Users className="h-8 w-8" />,
    description: "Businesses worldwide trust our solutions",
    trend: "+12% this quarter"
  },
  {
    id: "success",
    label: "Success Rate",
    value: 98.5,
    suffix: "%",
    icon: <TrendingUp className="h-8 w-8" />,
    description: "Project completion with client satisfaction",
    trend: "Above industry average"
  },
  {
    id: "experience",
    label: "Years Experience",
    value: 20,
    suffix: "+",
    icon: <Clock className="h-8 w-8" />,
    description: "Decades of industry expertise and innovation",
    trend: "Since 2003"
  },
  {
    id: "awards",
    label: "Industry Awards",
    value: 25,
    suffix: "",
    icon: <Award className="h-8 w-8" />,
    description: "Recognition for excellence and innovation",
    trend: "3 awards this year"
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
      const increment = value / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, hasAnimated]);

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
            Two decades of excellence have built a foundation of trust, innovation, and measurable success across industries.
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
            Ready to become part of our success story?
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-primary font-medium">
            <span>Join 500+ satisfied clients</span>
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