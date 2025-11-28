"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import type { Category } from "@/lib/types";
import { 
  Search, 
  X, 
  Filter, 
  ArrowUpDown, 
  Grid3X3, 
  List,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvancedFiltersProps {
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  priceRange: [number, number];
  sortBy: string;
  viewMode: "grid" | "list";
  showFilters: boolean;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (query: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onToggleFilters: () => void;
  onClearFilters: () => void;
  resultCount: number;
}

const sortOptions = [
  { value: "name", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" }
];

const productFeatures = [
  "AI-Powered",
  "Cloud-Native",
  "Mobile-Optimized",
  "API-First",
  "Real-time Analytics",
  "Enterprise Security",
  "Multi-tenant",
  "Scalable Architecture"
];

export function AdvancedFilters({
  categories,
  selectedCategory,
  searchQuery,
  priceRange,
  sortBy,
  viewMode,
  showFilters,
  onCategoryChange,
  onSearchChange,
  onPriceRangeChange,
  onSortChange,
  onViewModeChange,
  onToggleFilters,
  onClearFilters,
  resultCount
}: AdvancedFiltersProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const activeFiltersCount = [
    selectedCategory,
    searchQuery,
    priceRange[0] > 0 || priceRange[1] < 10000,
    selectedFeatures.length > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, features, or categories..."
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
          </div>

          <div className="flex items-center gap-2">
            {/* Results Count */}
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {resultCount} products
            </Badge>

            {/* Sort */}
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px] rounded-full">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex rounded-full border border-border overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => onViewModeChange("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => onViewModeChange("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={onToggleFilters}
              className="rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="p-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    Categories
                    <Badge variant="outline" className="text-xs">
                      {categories.length}
                    </Badge>
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-full justify-start rounded-full text-left",
                        !selectedCategory && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => onCategoryChange(null)}
                    >
                      All Categories
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "w-full justify-start rounded-full text-left",
                          selectedCategory === category.slug && "bg-primary text-primary-foreground"
                        )}
                        onClick={() => onCategoryChange(category.slug)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={onPriceRangeChange}
                        max={10000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Product Features */}
                <div>
                  <h3 className="font-semibold mb-4">Features</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {productFeatures.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                        />
                        <label
                          htmlFor={feature}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div>
                  <Button
                    variant="outline"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="w-full justify-between rounded-full mb-4"
                  >
                    <span className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4" />
                      Advanced
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      isAdvancedOpen && "rotate-180"
                    )} />
                  </Button>

                  <AnimatePresence>
                    {isAdvancedOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox id="featured" />
                          <label htmlFor="featured" className="text-sm">Featured Only</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="new" />
                          <label htmlFor="new" className="text-sm">New Arrivals</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sale" />
                          <label htmlFor="sale" className="text-sm">On Sale</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stock" />
                          <label htmlFor="stock" className="text-sm">In Stock</label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Filter Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  {activeFiltersCount > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground">Active filters:</span>
                      {selectedCategory && (
                        <Badge variant="secondary" className="gap-1">
                          {categories.find(c => c.slug === selectedCategory)?.name}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => onCategoryChange(null)}
                          />
                        </Badge>
                      )}
                      {selectedFeatures.map(feature => (
                        <Badge key={feature} variant="secondary" className="gap-1">
                          {feature}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleFeatureToggle(feature)}
                          />
                        </Badge>
                      ))}
                    </>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearFilters}
                    className="rounded-full"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}