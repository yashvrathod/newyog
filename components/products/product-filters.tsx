"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { ProductCategory } from "@/lib/types"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
  categories: ProductCategory[]
  selectedCategory: string | null
  searchQuery: string
  onCategoryChange: (category: string | null) => void
  onSearchChange: (query: string) => void
}

export function ProductFilters({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 rounded-full"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onSearchChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className={cn("rounded-full", !selectedCategory && "bg-foreground text-background hover:bg-foreground/90")}
          onClick={() => onCategoryChange(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full",
              selectedCategory === category.slug && "bg-foreground text-background hover:bg-foreground/90",
            )}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
