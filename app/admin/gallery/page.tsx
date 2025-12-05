"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Search, Trash2, Edit, Upload, AlertCircle } from "lucide-react"
import type { Media } from "@/lib/types"

export default function AdminGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [galleryItems, setGalleryItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newImage, setNewImage] = useState({
    filename: "",
    url: "",
    alt: "",
    caption: "",
    description: "",
    folder: "gallery",
  })

  useEffect(() => {
    loadGalleryItems()
  }, [selectedCategory, searchQuery])

  async function loadGalleryItems() {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (selectedCategory && selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }
      if (searchQuery) {
        params.append("search", searchQuery)
      }

      const response = await fetch(`/api/gallery?${params}`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setGalleryItems(result.data || [])
      } else {
        setError(result.error || "Failed to load gallery items")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery items")
    } finally {
      setLoading(false)
    }
  }

  async function handleAddImage() {
    if (!newImage.filename || !newImage.url) {
      setError("Filename and URL are required")
      return
    }

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newImage),
      })

      const result = await response.json()

      if (result.success) {
        setIsAddOpen(false)
        setNewImage({
          filename: "",
          url: "",
          alt: "",
          caption: "",
          description: "",
          folder: "gallery",
        })
        loadGalleryItems() // Reload the gallery
      } else {
        setError(result.error || "Failed to add image")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add image")
    }
  }

  async function handleDeleteImage(id: string) {
    if (!confirm("Are you sure you want to delete this image?")) {
      return
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        credentials: "include",
      })

      const result = await response.json()

      if (result.success) {
        loadGalleryItems() // Reload the gallery
      } else {
        setError(result.error || "Failed to delete image")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Manage gallery images and media</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Gallery Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="filename">Filename</Label>
                <Input 
                  id="filename" 
                  placeholder="image.jpg" 
                  value={newImage.filename}
                  onChange={(e) => setNewImage({ ...newImage, filename: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Image URL</Label>
                <Input 
                  id="url" 
                  placeholder="https://example.com/image.jpg or /path/to/image.jpg"
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alt">Alt Text</Label>
                <Input 
                  id="alt" 
                  placeholder="Descriptive alt text"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input 
                  id="caption" 
                  placeholder="Image caption"
                  value={newImage.caption}
                  onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="folder">Category/Folder</Label>
                <Select value={newImage.folder} onValueChange={(value) => setNewImage({ ...newImage, folder: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gallery">Gallery</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Image description"
                  value={newImage.description}
                  onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleAddImage}>
                Add Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search gallery..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="gallery">Gallery</SelectItem>
            <SelectItem value="events">Events</SelectItem>
            <SelectItem value="products">Products</SelectItem>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="office">Office</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && !loading && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button variant="link" onClick={loadGalleryItems} className="ml-2 h-auto p-0">
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-16 animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : galleryItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No gallery items found</p>
          <Button variant="outline" onClick={loadGalleryItems} className="mt-4">
            Refresh
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="aspect-square relative">
                  <Image 
                    src={item.url || "/placeholder.svg"} 
                    alt={item.alt || item.filename} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    onClick={() => handleDeleteImage(item.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3">
                  <p className="font-medium truncate" title={item.caption || item.filename}>
                    {item.caption || item.filename}
                  </p>
                  <Badge variant="outline" className="mt-1 capitalize">
                    {item.folder || 'gallery'}
                  </Badge>
                  {item.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
