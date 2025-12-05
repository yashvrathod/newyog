"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminProducts, getCategories } from "@/lib/admin-data";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Product, Category } from "@/lib/types";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [productsResult, categoriesData] = await Promise.all([
        getAdminProducts({
          search: searchQuery,
          category: selectedCategory || undefined,
        }),
        getCategories(),
      ]);
      setProducts(productsResult.data);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const productData = {
        name: formData.get("name") as string,
        slug: (formData.get("name") as string)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        description: formData.get("description") as string,
        shortDescription: formData.get("shortDescription") as string,
        price: formData.get("price")
          ? Number(formData.get("price"))
          : undefined,
        categoryId: (formData.get("category") as string) || undefined,
        featuredImage: formData.get("featuredImage") as string,
        features:
          (formData.get("features") as string)
            ?.split(",")
            .map((f) => f.trim())
            .filter(Boolean) || [],
        showPrice: Boolean(formData.get("showPrice")),
        isFeatured: Boolean(formData.get("isFeatured")),
        isActive: true,
        status: "PUBLISHED",
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (response.ok) {
        setProducts((prev) => [...prev, result.data]);
        setIsAddDialogOpen(false);
        loadData(); // Refresh data
        (e.target as HTMLFormElement).reset();
      } else {
        setError(result.error || "Failed to create product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
    }
  }

  async function handleEditProduct(product: Product) {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  }

  async function handleUpdateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const productData = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        shortDescription: formData.get("shortDescription") as string,
        price: formData.get("price")
          ? Number(formData.get("price"))
          : undefined,
        categoryId: (formData.get("category") as string) || undefined,
        featuredImage: formData.get("featuredImage") as string,
        features:
          (formData.get("features") as string)
            ?.split(",")
            .map((f) => f.trim())
            .filter(Boolean) || [],
        showPrice: Boolean(formData.get("showPrice")),
        isFeatured: Boolean(formData.get("isFeatured")),
        isActive: true,
        status: "PUBLISHED",
      };

      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      if (response.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? result.data : p))
        );
        setIsEditDialogOpen(false);
        setEditingProduct(null);
      } else {
        setError(result.error || "Failed to update product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
    }
  }

  async function handleDeleteProduct(productId: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        const result = await response.json();
        setError(result.error || "Failed to delete product");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
    }
  }

  // Add search and filter handlers
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "" ||
      product.category?.id === selectedCategory ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProduct} className="space-y-6 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">No category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  rows={2}
                  placeholder="Brief description for cards..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <Input
                    id="featuredImage"
                    name="featuredImage"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input
                  id="features"
                  name="features"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showPrice"
                    name="showPrice"
                    className="rounded"
                    defaultChecked
                  />
                  <Label htmlFor="showPrice">Show price</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    className="rounded"
                  />
                  <Label htmlFor="isFeatured">Featured product</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Product</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 w-[180px] rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <Button onClick={loadData} variant="outline" size="sm">
            Refresh
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Discount</TableHead>
                <TableHead className="text-center">Visibility</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground/30 mx-auto"></div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-destructive mb-2">Error: {error}</p>
                    <button
                      onClick={loadData}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm"
                    >
                      Retry
                    </button>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.featuredImage || "/placeholder.svg"}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {typeof product.category === "string"
                          ? product.category
                          : product.category?.name || "Uncategorized"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {product.showPrice ? (
                        `$${product.price?.toLocaleString()}`
                      ) : (
                        <span className="text-muted-foreground italic">
                          Hidden
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.discount ? (
                        <Badge>{product.discount}%</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {product.isActive ? (
                        <Eye className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground mx-auto" />
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <form onSubmit={handleUpdateProduct} className="space-y-6 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Product Name *</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={editingProduct.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <select
                    id="edit-category"
                    name="category"
                    defaultValue={
                      editingProduct.categoryId ||
                      editingProduct.category?.id ||
                      ""
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">No category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingProduct.description || ""}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-shortDescription">Short Description</Label>
                <Textarea
                  id="edit-shortDescription"
                  name="shortDescription"
                  defaultValue={editingProduct.shortDescription || ""}
                  rows={2}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct.price?.toString() || ""}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-featuredImage">Image URL</Label>
                  <Input
                    id="edit-featuredImage"
                    name="featuredImage"
                    defaultValue={editingProduct.featuredImage || ""}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-features">
                  Features (comma separated)
                </Label>
                <Input
                  id="edit-features"
                  name="features"
                  defaultValue={editingProduct.features?.join(", ") || ""}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-showPrice"
                    name="showPrice"
                    className="rounded"
                    defaultChecked={editingProduct.showPrice}
                  />
                  <Label htmlFor="edit-showPrice">Show price</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-isFeatured"
                    name="isFeatured"
                    className="rounded"
                    defaultChecked={editingProduct.isFeatured}
                  />
                  <Label htmlFor="edit-isFeatured">Featured product</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Update Product</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
