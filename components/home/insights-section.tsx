"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  Calendar,
  ArrowRight,
  Clock,
  Eye
} from "lucide-react";

interface Insight {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  views: string;
  trending?: boolean;
  featured?: boolean;
}

interface MarketTrend {
  id: string;
  trend: string;
  impact: "High" | "Medium" | "Low";
  direction: "up" | "down" | "stable";
  percentage: number;
  description: string;
}

const insights: Insight[] = [
  {
    id: "ai-transformation-2024",
    category: "Technology",
    title: "AI Transformation: 2024 Business Implementation Guide",
    excerpt: "How companies are leveraging AI to achieve 40% productivity gains and transform customer experiences.",
    readTime: "8 min",
    publishDate: "Dec 15, 2024",
    views: "2.4k",
    trending: true,
    featured: true
  },
  {
    id: "supply-chain-resilience",
    category: "Operations",
    title: "Building Resilient Supply Chains in Uncertain Times",
    excerpt: "Strategic approaches to supply chain optimization that reduced costs by 25% for our manufacturing clients.",
    readTime: "6 min",
    publishDate: "Dec 10, 2024",
    views: "1.8k",
    trending: true
  },
  {
    id: "digital-healthcare-evolution",
    category: "Healthcare",
    title: "The Digital Healthcare Evolution: Patient-Centric Solutions",
    excerpt: "How digital transformation in healthcare is improving patient outcomes while reducing operational costs.",
    readTime: "7 min",
    publishDate: "Dec 8, 2024",
    views: "1.5k"
  },
  {
    id: "cybersecurity-framework",
    category: "Security",
    title: "Enterprise Cybersecurity Framework for 2024",
    excerpt: "A comprehensive approach to cybersecurity that protects assets while enabling business growth.",
    readTime: "10 min",
    publishDate: "Dec 5, 2024",
    views: "2.1k",
    featured: true
  }
];

const marketTrends: MarketTrend[] = [
  {
    id: "ai-adoption",
    trend: "AI Implementation",
    impact: "High",
    direction: "up",
    percentage: 78,
    description: "Enterprise AI adoption accelerating across industries"
  },
  {
    id: "cloud-migration",
    trend: "Cloud-First Strategies",
    impact: "High",
    direction: "up", 
    percentage: 65,
    description: "Organizations prioritizing cloud infrastructure modernization"
  },
  {
    id: "automation-roi",
    trend: "Process Automation ROI",
    impact: "Medium",
    direction: "up",
    percentage: 45,
    description: "Average ROI improvement from intelligent automation"
  },
  {
    id: "cybersecurity-investment",
    trend: "Security Investment",
    impact: "High",
    direction: "up",
    percentage: 52,
    description: "Increase in cybersecurity budget allocations"
  }
];

export function InsightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Industry Insights</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Stay Ahead with 
            <span className="text-primary"> Market Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Access the latest industry trends, expert analysis, and actionable insights 
            that help you make informed business decisions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Insights */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Latest Insights</h3>
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href="/insights">View All</Link>
                </Button>
              </div>

              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className={`group hover:shadow-lg transition-all duration-300 ${
                      insight.featured ? 'ring-2 ring-primary/20' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {insight.category}
                              </Badge>
                              {insight.trending && (
                                <Badge variant="default" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">
                                  <TrendingUp className="h-3 w-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                              {insight.featured && (
                                <Badge variant="default" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            
                            <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {insight.title}
                            </h4>
                            
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                              {insight.excerpt}
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {insight.readTime} read
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {insight.publishDate}
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {insight.views} views
                              </div>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Market Trends Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-6">Market Trends</h3>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {marketTrends.map((trend, index) => (
                      <motion.div
                        key={trend.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{trend.trend}</span>
                          <div className="flex items-center gap-2">
                            {trend.direction === 'up' && (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            )}
                            <span className="text-lg font-bold text-green-600">
                              +{trend.percentage}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-secondary/50 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${trend.percentage}%` } : {}}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                            className="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          />
                        </div>
                        
                        <p className="text-xs text-muted-foreground">
                          {trend.description}
                        </p>
                        
                        <Badge 
                          variant={trend.impact === 'High' ? 'default' : trend.impact === 'Medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {trend.impact} Impact
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5">
                  <CardContent className="p-6 text-center">
                    <Lightbulb className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Weekly Insights</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest trends and insights delivered to your inbox.
                    </p>
                    <Button asChild className="w-full rounded-full" size="sm">
                      <Link href="/newsletter">Subscribe Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="grid md:grid-cols-4 gap-6"
        >
          <Card className="text-center">
            <CardContent className="p-6">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Research Reports</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">15k+</div>
              <div className="text-sm text-muted-foreground">Monthly Readers</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Lightbulb className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">200+</div>
              <div className="text-sm text-muted-foreground">Industry Experts</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}