"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { getAdminServices, getCategories } from "@/lib/admin-data"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import type { Service, Category } from "@/lib/types"

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [servicesResult, categoriesData] = await Promise.all([
        getAdminServices({ search: searchQuery }),
        getCategories()
      ])
      setServices(servicesResult.data)
      setCategories(categoriesData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateService(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const serviceData = {
        name: formData.get('name') as string,
        slug: (formData.get('name') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formData.get('description') as string,
        shortDescription: formData.get('shortDescription') as string,
        categoryId: formData.get('category') as string || undefined,
        icon: formData.get('icon') as string,
        featuredImage: formData.get('featuredImage') as string,
        features: (formData.get('features') as string)?.split(',').map(f => f.trim()).filter(Boolean) || [],
        priceRange: formData.get('priceRange') as string,
        isFeatured: Boolean(formData.get('isFeatured')),
        isActive: true,
        status: 'PUBLISHED'
      }

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(serviceData)
      })

      const result = await response.json()

      if (response.ok) {
        setServices(prev => [...prev, result.data])
        setIsAddDialogOpen(false)
        (e.target as HTMLFormElement).reset()
      } else {
        setError(result.error || 'Failed to create service')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create service')
    }
  }

  function handleEditService(service: Service) {
    setEditingService(service)
    setIsEditDialogOpen(true)
  }

  async function handleUpdateService(e: React.FormEvent) {
    e.preventDefault()
    
    if (!editingService) return

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const serviceData = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        shortDescription: formData.get('shortDescription') as string,
        categoryId: formData.get('category') as string || undefined,
        icon: formData.get('icon') as string,
        featuredImage: formData.get('featuredImage') as string,
        features: (formData.get('features') as string)?.split(',').map(f => f.trim()).filter(Boolean) || [],
        priceRange: formData.get('priceRange') as string,
        isFeatured: Boolean(formData.get('isFeatured')),
        isActive: true,
        status: 'PUBLISHED'
      }

      const response = await fetch(`/api/services/${editingService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(serviceData)
      })

      const result = await response.json()

      if (response.ok) {
        setServices(prev => prev.map(service => 
          service.id === editingService.id ? result.data : service
        ))
        setIsEditDialogOpen(false)
        setEditingService(null)
      } else {
        setError(result.error || 'Failed to update service')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update service')
    }
  }

  async function handleDeleteService(serviceId: string) {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        setServices(prev => prev.filter(service => service.id !== serviceId))
      } else {
        const result = await response.json()
        setError(result.error || 'Failed to delete service')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service')
    }
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateService} className="space-y-6 mt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input id="name" name="name" placeholder="Enter service name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
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
                <Textarea id="description" name="description" rows={4} placeholder="Service description..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea id="shortDescription" name="shortDescription" rows={2} placeholder="Brief description for cards..." />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Input id="icon" name="icon" placeholder="lucide icon name (e.g. settings)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Input id="priceRange" name="priceRange" placeholder="e.g. $500-2000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input id="features" name="features" placeholder="24/7 Support, Expert Team, Custom Solutions" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Image URL</Label>
                <Input id="featuredImage" name="featuredImage" placeholder="https://..." />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isFeatured" name="isFeatured" className="rounded" />
                <Label htmlFor="isFeatured">Featured service</Label>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Service</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-center">Visibility</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground/30 mx-auto"></div>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-destructive mb-2">Error: {error}</p>
                    <button 
                      onClick={loadData}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm"
                    >
                      Retry
                    </button>
                  </TableCell>
                </TableRow>
              ) : filteredServices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <Image
                        src={service.featuredImage || "/placeholder.svg"}
                        alt={service.name}
                        width={48}
                        height={48}
                        sizes="48px"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {typeof service.category === 'string' ? service.category : service.category?.name || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(service.features || []).slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {service.isActive ? (
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
                        <DropdownMenuItem onClick={() => handleEditService(service)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteService(service.id)}
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

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateService} className="space-y-6 mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Service Name *</Label>
                <Input 
                  id="edit-name" 
                  name="name" 
                  placeholder="Enter service name" 
                  required 
                  defaultValue={editingService?.name || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue={typeof editingService?.category === 'object' ? editingService?.category?.id : ''}
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
                rows={4} 
                placeholder="Service description..." 
                defaultValue={editingService?.description || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-shortDescription">Short Description</Label>
              <Textarea 
                id="edit-shortDescription" 
                name="shortDescription" 
                rows={2} 
                placeholder="Brief description for cards..." 
                defaultValue={editingService?.shortDescription || ''}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <Input 
                  id="edit-icon" 
                  name="icon" 
                  placeholder="lucide icon name" 
                  defaultValue={editingService?.icon || ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-priceRange">Price Range</Label>
                <Input 
                  id="edit-priceRange" 
                  name="priceRange" 
                  placeholder="e.g. $500-2000" 
                  defaultValue={editingService?.priceRange || ''}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-features">Features (comma separated)</Label>
              <Input 
                id="edit-features" 
                name="features" 
                placeholder="24/7 Support, Expert Team, Custom Solutions" 
                defaultValue={editingService?.features?.join(', ') || ''}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-featuredImage">Image URL</Label>
              <Input 
                id="edit-featuredImage" 
                name="featuredImage" 
                placeholder="https://..." 
                defaultValue={editingService?.featuredImage || ''}
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="edit-isFeatured" 
                name="isFeatured" 
                className="rounded" 
                defaultChecked={editingService?.isFeatured || false}
              />
              <Label htmlFor="edit-isFeatured">Featured service</Label>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Service</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
