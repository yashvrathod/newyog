"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Edit, Trash2, MoreHorizontal, Search, Layers } from "lucide-react";
import type { Category } from "@/lib/types";

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    parentId: null,
    sortOrder: 0,
    image: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cms/categories?parentId=all");
      const result = await response.json();
      
      if (result.data) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.slug.trim()) {
      errors.slug = "Slug is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("/api/cms/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId || null,
        }),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        setCategories(prev => [...prev, result.data]);
        setShowCreateModal(false);
        resetForm();
      } else {
        setFormErrors({ general: result.error || "Failed to create category" });
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setFormErrors({ general: "Failed to create category" });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      parentId: category.parentId,
      sortOrder: category.sortOrder,
      image: category.image || "",
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!validateForm() || !editingCategory) return;

    try {
      const response = await fetch(`/api/cms/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          parentId: formData.parentId || null,
        }),
      });

      const result = await response.json();

      if (response.ok && result.data) {
        setCategories(prev =>
          prev.map(cat => cat.id === editingCategory.id ? result.data : cat)
        );
        setShowEditModal(false);
        setEditingCategory(null);
        resetForm();
      } else {
        setFormErrors({ general: result.error || "Failed to update category" });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setFormErrors({ general: "Failed to update category" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`/api/cms/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(prev => prev.filter(cat => cat.id !== id));
      } else {
        const result = await response.json();
        alert(result.error || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      parentId: null,
      sortOrder: 0,
      image: "",
    });
    setFormErrors({});
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get root categories for parent selection
  const rootCategories = categories.filter(cat => !cat.parentId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage product, service, and content categories
          </p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
              formData={formData}
              setFormData={setFormData}
              formErrors={formErrors}
              rootCategories={rootCategories}
              onSubmit={handleCreate}
              onNameChange={handleNameChange}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-24" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-16" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-12" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-16" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-muted rounded animate-pulse w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Layers className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No categories found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {category.children?.length > 0 && (
                        <Layers className="h-4 w-4 text-muted-foreground" />
                      )}
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {category.slug}
                  </TableCell>
                  <TableCell>
                    {category.parent?.name || (
                      <span className="text-muted-foreground">Root</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {(category as any)._count?.products > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {(category as any)._count.products} products
                        </Badge>
                      )}
                      {(category as any)._count?.services > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {(category as any)._count.services} services
                        </Badge>
                      )}
                      {(category as any)._count?.posts > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {(category as any)._count.posts} posts
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category.id)}
                          className="text-destructive"
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
      </div>

      {/* Edit Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <CategoryForm
            formData={formData}
            setFormData={setFormData}
            formErrors={formErrors}
            rootCategories={rootCategories.filter(cat => cat.id !== editingCategory?.id)}
            onSubmit={handleUpdate}
            onNameChange={handleNameChange}
            isEdit={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CategoryFormProps {
  formData: CategoryFormData;
  setFormData: (data: CategoryFormData | ((prev: CategoryFormData) => CategoryFormData)) => void;
  formErrors: Record<string, string>;
  rootCategories: Category[];
  onSubmit: () => void;
  onNameChange: (name: string) => void;
  isEdit?: boolean;
}

function CategoryForm({
  formData,
  setFormData,
  formErrors,
  rootCategories,
  onSubmit,
  onNameChange,
  isEdit = false,
}: CategoryFormProps) {
  return (
    <div className="space-y-4">
      {formErrors.general && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
          {formErrors.general}
        </div>
      )}

      <div>
        <label className="text-sm font-medium mb-2 block">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Category name"
          className={formErrors.name ? "border-destructive" : ""}
        />
        {formErrors.name && (
          <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Slug</label>
        <Input
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          placeholder="category-slug"
          className={formErrors.slug ? "border-destructive" : ""}
        />
        {formErrors.slug && (
          <p className="text-sm text-destructive mt-1">{formErrors.slug}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Category description"
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Parent Category</label>
        <Select
          value={formData.parentId || "none"}
          onValueChange={(value) => 
            setFormData(prev => ({ 
              ...prev, 
              parentId: value === "none" ? null : value 
            }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select parent category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (Root Category)</SelectItem>
            {rootCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Sort Order</label>
        <Input
          type="number"
          value={formData.sortOrder}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            sortOrder: parseInt(e.target.value) || 0 
          }))}
          placeholder="0"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Image URL (Optional)</label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {isEdit ? "Update" : "Create"} Category
        </Button>
      </div>
    </div>
  );
}