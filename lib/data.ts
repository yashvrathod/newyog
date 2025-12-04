// Data fetching functions for the frontend
import { ApiResponse, Product, Service, Client, Testimonial, Category } from './types'
import { sampleProducts, sampleCategories } from './sample-products'

// Sample services data for fallback
const sampleServices: Service[] = [
  {
    id: "1",
    name: "Security Camera Services",
    slug: "security-camera-services",
    description: "Complete CCTV camera solutions including installation of CCTV systems, configuration of DVR/NVR and mobile app monitoring, real-time surveillance setup, maintenance and periodic servicing, integration with existing security systems, and wiring, networking, and storage setup. Suitable for residential, commercial, institutional, and industrial environments.",
    shortDescription: "Professional CCTV installation and maintenance",
    image: "/cybersecurity-monitoring-center-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    tags: ["CCTV", "Security", "Installation"],
    category: { id: "1", name: "Security Services", slug: "security-services" } as any,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-15")
  },
  {
    id: "2",
    name: "Electrical Services",
    slug: "electrical-services",
    description: "Professional electrical solutions with safety-first standards including wiring and electrical installations, repair and replacement of electrical components, maintenance for homes, offices, and industrial units, panel upgrades and load management, safety inspections & earthing, and energy-efficient solutions and consultation.",
    shortDescription: "Complete electrical installation and maintenance",
    image: "/industrial-automation-kit-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    tags: ["Electrical", "Wiring", "Installation"],
    category: { id: "2", name: "Electrical Services", slug: "electrical-services" } as any,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-12-10")
  },
  {
    id: "3",
    name: "Computer Maintenance Services",
    slug: "computer-maintenance-services",
    description: "Comprehensive support to keep your devices in top condition including hardware servicing & repairs, OS installation & configuration, virus and malware removal, data backup & recovery solutions, performance optimization, network troubleshooting, system security audits, IT training for users, and software installation & updates.",
    shortDescription: "Complete computer repair and maintenance",
    image: "/technical-support-team-office-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    tags: ["Computer", "Repair", "Maintenance"],
    category: { id: "3", name: "Computer Services", slug: "computer-services" } as any,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-12-05")
  },
  {
    id: "4",
    name: "Digital Transformation Consulting",
    slug: "digital-transformation-consulting",
    description: "End-to-end digital transformation consulting services to modernize your business processes, enhance customer experiences, and drive innovation across your organization.",
    shortDescription: "Complete digital transformation services",
    image: "/digital-transformation-technology-modern.jpg",
    isFeatured: false,
    isActive: true,
    status: "PUBLISHED" as any,
    tags: ["Digital", "Transformation", "Innovation"],
    category: { id: "4", name: "Digital Services", slug: "digital-services" } as any,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-11-20")
  },
  {
    id: "5",
    name: "Process Automation Consulting",
    slug: "process-automation-consulting",
    description: "Expert consulting services to identify, design, and implement automated workflows that reduce manual work and increase operational efficiency across your organization.",
    shortDescription: "Business process automation consulting",
    image: "/industrial-automation-kit-modern.jpg",
    isFeatured: true,
    isActive: true,
    status: "PUBLISHED" as any,
    tags: ["Automation", "Process", "Efficiency"],
    category: { id: "5", name: "Automation", slug: "automation" } as any,
    createdAt: new Date("2024-02-28"),
    updatedAt: new Date("2024-12-01")
  },
  {
    id: "6",
    name: "Software Development Services",
    slug: "software-development-services",
    description: "Custom software development services including web applications, mobile apps, and enterprise software solutions tailored to your specific business requirements.",
    shortDescription: "Custom software development",
    image: "/software-development-coding-modern.jpg",
    isFeatured: false,
    isActive: true,
    status: "PUBLISHED" as any,
    tags: ["Development", "Software", "Custom"],
    category: { id: "1", name: "Software", slug: "software" } as any,
    createdAt: new Date("2024-03-18"),
    updatedAt: new Date("2024-11-25")
  }
]

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

// Enhanced fetch function with proper error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE}/api${endpoint}`
  
  console.log('🌐 Making API request to:', url)
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      cache: 'no-store', // Always fetch fresh data
      ...options,
    })

    console.log('🌐 API Response status:', response.status, response.statusText)

    if (!response.ok) {
      console.warn(`API responded with ${response.status} for ${endpoint}`)
      return { data: undefined, error: `HTTP ${response.status}` }
    }

    const data = await response.json()
    console.log('🌐 API Response parsed data:', data)
    return data
  } catch (error) {
    console.warn(`API fetch failed for ${endpoint}:`, error instanceof Error ? error.message : 'Unknown error')
    console.error('🌐 Full error:', error)
    return { data: undefined, error: error instanceof Error ? error.message : 'Network error' }
  }
}

// Products with intelligent fallback
export async function getProducts(params?: {
  category?: string
  featured?: boolean
  limit?: number
  search?: string
}): Promise<Product[]> {
  console.log('🔄 Fetching products with params:', params)
  
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.append('category', params.category)
  if (params?.featured) searchParams.append('featured', 'true')
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.search) searchParams.append('search', params.search)

  const response = await fetchApi<Product[]>(`/products?${searchParams}`)
  
  if (response.data && Array.isArray(response.data) && response.data.length > 0) {
    console.log('✅ API returned products:', response.data.length)
    return response.data
  }
  
  console.log('⚠️ API failed or empty, using sample data')
  let products = [...sampleProducts]
  
  // Apply filters to sample data
  if (params?.featured) {
    products = products.filter(p => p.isFeatured)
  }
  
  if (params?.category) {
    products = products.filter(p => p.category?.slug === params.category)
  }
  
  if (params?.search) {
    const search = params.search.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.shortDescription?.toLowerCase().includes(search)
    )
  }
  
  if (params?.limit) {
    products = products.slice(0, params.limit)
  }
  
  return products
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ featured: true, limit: 6 })
}

// Services with intelligent fallback
export async function getServices(params?: {
  category?: string
  featured?: boolean
  search?: string
}): Promise<Service[]> {
  console.log('🔄 Fetching services with params:', params)
  
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.append('category', params.category)
  if (params?.featured) searchParams.append('featured', 'true')
  if (params?.search) searchParams.append('search', params.search)

  const response = await fetchApi<Service[]>(`/services?${searchParams}`)
  
  if (response.data && Array.isArray(response.data) && response.data.length > 0) {
    console.log('✅ API returned services:', response.data.length)
    return response.data
  }
  
  console.log('⚠️ API failed or empty, using sample services data')
  let services = [...sampleServices]
  
  // Apply filters to sample data
  if (params?.featured) {
    services = services.filter(s => s.isFeatured)
  }
  
  if (params?.category) {
    services = services.filter(s => s.category?.slug === params.category)
  }
  
  if (params?.search) {
    const search = params.search.toLowerCase()
    services = services.filter(s => 
      s.name.toLowerCase().includes(search) ||
      s.description.toLowerCase().includes(search) ||
      s.shortDescription?.toLowerCase().includes(search)
    )
  }
  
  return services
}

export async function getFeaturedServices(): Promise<Service[]> {
  return getServices({ featured: true })
}

// Clients with intelligent fallback
export async function getClients(featured?: boolean): Promise<Client[]> {
  console.log('🔄 Fetching clients with params:', { featured })
  
  const searchParams = new URLSearchParams()
  if (featured) searchParams.append('featured', 'true')

  const response = await fetchApi<Client[]>(`/clients?${searchParams}`)
  
  console.log('📡 API Response full object:', response)
  console.log('📡 API Response data:', response.data)
  console.log('📡 API Response error:', response.error)
  
  if (response.data && Array.isArray(response.data) && response.data.length > 0) {
    console.log('✅ API returned clients:', response.data.length)
    return response.data
  }
  
  console.log('⚠️ API failed or empty, returning empty array for database integration')
  console.log('⚠️ Reason: data exists:', !!response.data, 'is array:', Array.isArray(response.data), 'length:', response.data?.length)
  return []
}

export async function getFeaturedClients(): Promise<Client[]> {
  return getClients(true)
}

// Testimonials
export async function getTestimonials(featured?: boolean): Promise<Testimonial[]> {
  const searchParams = new URLSearchParams()
  if (featured) searchParams.append('featured', 'true')

  const response = await fetchApi<Testimonial[]>(`/testimonials?${searchParams}`)
  return response.data || []
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return getTestimonials(true)
}

// Categories with intelligent fallback
export async function getCategories(): Promise<Category[]> {
  console.log('🔄 Fetching categories')
  
  const response = await fetchApi<Category[]>('/cms/categories')
  
  if (response.data && Array.isArray(response.data) && response.data.length > 0) {
    console.log('✅ API returned categories:', response.data.length)
    return response.data
  }
  
  console.log('⚠️ API failed or empty, using sample categories')
  return sampleCategories
}

// Settings (public only)
export async function getSettings(): Promise<Record<string, any>> {
  const response = await fetchApi<Record<string, any>>('/settings?public=true')
  return response.data || {}
}

// Submit inquiry
export async function submitInquiry(data: {
  type?: string
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  productId?: string
  serviceId?: string
}): Promise<any> {
  const response = await fetchApi('/inquiries', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return response
}