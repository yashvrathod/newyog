"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Star, StarOff } from "lucide-react"
import { getAdminTestimonials, createTestimonial, updateTestimonial } from "@/lib/admin-data"
import type { Testimonial } from "@/lib/types"

export default function AdminTestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function handleCreateTestimonial(e: React.FormEvent) {
    e.preventDefault()
    
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const testimonialData = {
        content: formData.get('content') as string,
        authorName: formData.get('authorName') as string,
        authorTitle: formData.get('authorTitle') as string,
        authorCompany: formData.get('authorCompany') as string,
        authorEmail: formData.get('authorEmail') as string,
        rating: Number(formData.get('rating') || 5),
        isFeatured: Boolean(formData.get('isFeatured')),
        isVerified: Boolean(formData.get('isVerified'))
      }

      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(testimonialData)
      })

      const result = await response.json()

      if (response.ok) {
        setTestimonials(prev => [...prev, result.data])
        setIsAddOpen(false)
        (e.target as HTMLFormElement).reset()
      } else {
        setError(result.error || 'Failed to create testimonial')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create testimonial')
    }
  }

  function handleEditTestimonial(testimonial: Testimonial) {
    setEditingTestimonial(testimonial)
    setIsEditOpen(true)
  }

  async function handleUpdateTestimonial(e: React.FormEvent) {
    e.preventDefault()
    
    if (!editingTestimonial) return

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const testimonialData = {
        content: formData.get('content') as string,
        authorName: formData.get('authorName') as string,
        authorTitle: formData.get('authorTitle') as string,
        authorCompany: formData.get('authorCompany') as string,
        authorEmail: formData.get('authorEmail') as string,
        rating: Number(formData.get('rating') || 5),
        isFeatured: Boolean(formData.get('isFeatured')),
        isVerified: Boolean(formData.get('isVerified'))
      }

      const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(testimonialData)
      })

      const result = await response.json()

      if (response.ok) {
        setTestimonials(prev => prev.map(testimonial => 
          testimonial.id === editingTestimonial.id ? result.data : testimonial
        ))
        setIsEditOpen(false)
        setEditingTestimonial(null)
      } else {
        setError(result.error || 'Failed to update testimonial')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update testimonial')
    }
  }

  async function handleDeleteTestimonial(testimonialId: string) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/testimonials/${testimonialId}`, {
        method: 'DELETE',
        credentials: 'include'
      })

      if (response.ok) {
        setTestimonials(prev => prev.filter(testimonial => testimonial.id !== testimonialId))
      } else {
        const result = await response.json()
        setError(result.error || 'Failed to delete testimonial')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial')
    }
  }

  async function loadTestimonials() {
    try {
      setLoading(true)
      const { data } = await getAdminTestimonials({ search: searchQuery })
      setTestimonials(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  const filteredTestimonials = testimonials.filter(testimonial => 
    testimonial.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.authorCompany?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTestimonial} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name *</Label>
                  <Input id="authorName" name="authorName" placeholder="John Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorTitle">Title</Label>
                  <Input id="authorTitle" name="authorTitle" placeholder="CEO" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="authorCompany">Company</Label>
                  <Input id="authorCompany" name="authorCompany" placeholder="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorEmail">Email</Label>
                  <Input id="authorEmail" name="authorEmail" type="email" placeholder="john@acme.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Testimonial *</Label>
                <Textarea id="content" name="content" rows={4} placeholder="Write the testimonial..." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <select id="rating" name="rating" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="isFeatured" name="isFeatured" className="rounded" />
                      <Label htmlFor="isFeatured">Featured</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="isVerified" name="isVerified" className="rounded" />
                      <Label htmlFor="isVerified">Verified</Label>
                    </div>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Add Testimonial
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Testimonial</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-[50px]"></TableHead>
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
                      onClick={loadTestimonials}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm"
                    >
                      Retry
                    </button>
                  </TableCell>
                </TableRow>
              ) : filteredTestimonials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No testimonials found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{testimonial.authorName}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.authorTitle}</p>
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.authorCompany}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{testimonial.content}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {testimonial.isFeatured ? <Badge>Featured</Badge> : <Badge variant="outline">Hidden</Badge>}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditTestimonial(testimonial)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {testimonial.isFeatured ? (
                            <>
                              <StarOff className="h-4 w-4 mr-2" />
                              Remove Featured
                            </>
                          ) : (
                            <>
                              <Star className="h-4 w-4 mr-2" />
                              Make Featured
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
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
    </div>
  )
}
