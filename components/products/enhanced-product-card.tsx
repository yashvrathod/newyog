"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  Heart, 
  Share2,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  viewMode?: "grid" | "list";
  showPricing?: boolean;
  index?: number;
}

export function EnhancedProductCard({ 
  product, 
  onViewDetails, 
  viewMode = "grid", 
  showPricing = true,
  index = 0
}: EnhancedProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  
  // Mock ratings and features for enhanced display
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 500) + 50;
  const isNew = Math.random() > 0.7;
  const isBestSeller = Math.random() > 0.8;
  const isAIPowered = Math.random() > 0.6;

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ scale: 1.01 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        data-animate
        data-delay={Math.min(index + 1, 5).toString()}
        className="card-hover-effect"
      >
        <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-0">
            <div className="flex gap-6">
              {/* Image */}
              <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden bg-secondary/30">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="192px"
                />
                
                {/* Overlays */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount && (
                    <Badge className="bg-red-500 text-white text-xs">{product.discount}% OFF</Badge>
                  )}
                  {isNew && <Badge className="bg-green-500 text-white text-xs">NEW</Badge>}
                  {isBestSeller && <Badge className="bg-purple-500 text-white text-xs">BESTSELLER</Badge>}
                </div>

                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onViewDetails(product)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                      "w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-all",
                      isLiked && "text-red-500 opacity-100"
                    )}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart className={cn("h-3 w-3", isLiked && "fill-current")} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}
                    </Badge>
                    <h3 className="font-semibold text-xl mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
                      {isAIPowered && (
                        <Badge variant="secondary" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          AI-Powered
                        </Badge>
                      )}
                    </div>
                  </div>

                  {showPricing && product.showPrice && (
                    <div className="text-right">
                      <div className="text-2xl font-bold">${discountedPrice.toLocaleString()}</div>
                      {product.discount && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${product.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {showPricing && product.showPrice ? (
                      <Button className="rounded-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Buy Now
                      </Button>
                    ) : (
                      <Button variant="outline" className="rounded-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => onViewDetails(product)}
                    >
                      Details
                    </Button>
                  </div>

                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      data-animate
      data-delay={Math.min(index + 1, 5).toString()}
      className="card-hover-effect"
    >
      <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 h-full">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            {product.discount && (
              <Badge className="bg-red-500 text-white">{product.discount}% OFF</Badge>
            )}
            {isNew && <Badge className="bg-green-500 text-white">NEW</Badge>}
            {isBestSeller && (
              <Badge className="bg-purple-500 text-white">
                <Award className="h-3 w-3 mr-1" />
                BESTSELLER
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
              onClick={() => onViewDetails(product)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "rounded-full transition-all bg-white/90 hover:bg-white",
                isLiked ? "text-red-500 opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 hover:bg-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
          
          {/* AI Badge */}
          {isAIPowered && (
            <Badge className="absolute bottom-4 left-4 bg-blue-500 text-white">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3 text-xs">
            {typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}
          </Badge>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  )} 
                />
              ))}
            </div>
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

          {/* Pricing */}
          {showPricing && product.showPrice ? (
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold">${discountedPrice.toLocaleString()}</span>
              {product.discount && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-4 italic">Contact for pricing</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {showPricing && product.showPrice ? (
              <Button className="flex-1 rounded-full" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            ) : (
              <Button className="flex-1 rounded-full" size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => onViewDetails(product)}
            >
              Details
            </Button>
          </div>

          {/* Trending Indicator */}
          {Math.random() > 0.7 && (
            <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>Trending this week</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}