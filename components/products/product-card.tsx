"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, ShoppingCart, MessageCircle } from "lucide-react"

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
  onContactToBuy?: (product: Product) => void
  showPricing?: boolean
}

export function ProductCard({ product, onViewDetails, onContactToBuy, showPricing = true }: ProductCardProps) {
  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="group overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 h-full">
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.discount && (
            <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
          )}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            onClick={() => onViewDetails(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3 text-xs">
            {typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}
          </Badge>

          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

          {showPricing && product.showPrice ? (
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold">${discountedPrice.toLocaleString()}</span>
              {product.discount && (
                <span className="text-sm text-muted-foreground line-through">${product.price.toLocaleString()}</span>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-4 italic">Contact for pricing</p>
          )}

          <div className="flex gap-2">
            {showPricing && product.showPrice ? (
              <Button 
                className="flex-1 rounded-full" 
                size="sm"
                onClick={() => onContactToBuy?.(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            ) : (
              <Button 
                className="flex-1 rounded-full bg-transparent" 
                size="sm" 
                variant="outline"
                onClick={() => onContactToBuy?.(product)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact to Buy
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-transparent"
              onClick={() => onViewDetails(product)}
            >
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
