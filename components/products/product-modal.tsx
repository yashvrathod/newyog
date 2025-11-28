"use client"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, MessageCircle, Check } from "lucide-react"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  showPricing?: boolean
}

export function ProductModal({ product, isOpen, onClose, showPricing = true }: ProductModalProps) {
  if (!product) return null

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary/30">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.discount}% OFF</Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3">
                {typeof product.category === 'string' ? product.category : product.category?.name || 'Uncategorized'}
              </Badge>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Specifications */}
            <div>
              <h4 className="font-semibold mb-3">Specifications</h4>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Pricing */}
            {showPricing && product.showPrice ? (
              <div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-3xl font-bold">${discountedPrice.toLocaleString()}</span>
                  {product.discount && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <Button className="w-full rounded-full" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground italic mb-4">Contact us for pricing information</p>
                <Button className="w-full rounded-full bg-transparent" size="lg" variant="outline">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Request Quote
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
