// Admin-specific data fetching functions with authentication
import { ApiResponse, Product, Service, Client, Testimonial, Inquiry, User, DashboardStats, Category } from './types'

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

async function fetchAdminApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE}/api${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    })

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch (e) {
        // If we can't parse JSON, use the text response
        try {
          const errorText = await response.text()
          if (errorText) {
            errorMessage = errorText
          }
        } catch (e2) {
          // Fallback to status message
        }
      }

      if (response.status === 401) {
        // Redirect to login if unauthorized
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }
        throw new Error('Unauthorized')
      }
      
      console.error(`API Error ${response.status} for ${endpoint}:`, errorMessage)
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    console.error(`Admin API fetch error for ${endpoint}:`, error)
    throw error
  }
}

// Dashboard
export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetchAdminApi<{ stats: DashboardStats, recentInquiries: any[], recentPages: any[] }>('/cms/dashboard')
  return response.data?.stats || {
    users: 0,
    pages: 0,
    posts: 0,
    products: 0,
    services: 0,
    inquiries: { total: 0, new: 0, inProgress: 0 }
  }
}

// Admin Products
export async function getAdminProducts(params?: {
  search?: string
  category?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<{ data: Product[], pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.append('search', params.search)
  if (params?.category) searchParams.append('category', params.category)
  if (params?.status) searchParams.append('status', params.status)
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

  const response = await fetchAdminApi<Product[]>(`/products?${searchParams}`)
  return { 
    data: response.data || [], 
    pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
  }
}

export async function createProduct(productData: any): Promise<Product> {
  const response = await fetchAdminApi<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to create product')
  return response.data
}

export async function updateProduct(id: string, productData: any): Promise<Product> {
  const response = await fetchAdminApi<Product>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to update product')
  return response.data
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetchAdminApi(`/products/${id}`, {
    method: 'DELETE'
  })
  if (response.error) throw new Error(response.error)
}

// Admin Services
export async function getAdminServices(params?: {
  search?: string
  category?: string
  status?: string
  page?: number
  pageSize?: number
}): Promise<{ data: Service[], pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.append('search', params.search)
  if (params?.category) searchParams.append('category', params.category)
  if (params?.status) searchParams.append('status', params.status)
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

  const response = await fetchAdminApi<Service[]>(`/services?${searchParams}`)
  return { 
    data: response.data || [], 
    pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
  }
}

export async function createService(serviceData: any): Promise<Service> {
  const response = await fetchAdminApi<Service>('/services', {
    method: 'POST',
    body: JSON.stringify(serviceData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to create service')
  return response.data
}

// Admin Inquiries
export async function getAdminInquiries(params?: {
  search?: string
  status?: string
  type?: string
  page?: number
  pageSize?: number
}): Promise<{ data: Inquiry[], pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.append('search', params.search)
  if (params?.status) searchParams.append('status', params.status)
  if (params?.type) searchParams.append('type', params.type)
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

  const response = await fetchAdminApi<Inquiry[]>(`/inquiries?${searchParams}`)
  return { 
    data: response.data || [], 
    pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
  }
}

export async function updateInquiry(id: string, inquiryData: any): Promise<Inquiry> {
  const response = await fetchAdminApi<Inquiry>(`/inquiries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(inquiryData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to update inquiry')
  return response.data
}

// Admin Testimonials
export async function getAdminTestimonials(params?: {
  search?: string
  verified?: boolean
  featured?: boolean
  page?: number
  pageSize?: number
}): Promise<{ data: Testimonial[], pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.append('search', params.search)
  if (params?.verified !== undefined) searchParams.append('verified', params.verified.toString())
  if (params?.featured !== undefined) searchParams.append('featured', params.featured.toString())
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

  const response = await fetchAdminApi<Testimonial[]>(`/testimonials?${searchParams}`)
  return { 
    data: response.data || [], 
    pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
  }
}

export async function createTestimonial(testimonialData: any): Promise<Testimonial> {
  const response = await fetchAdminApi<Testimonial>('/testimonials', {
    method: 'POST',
    body: JSON.stringify(testimonialData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to create testimonial')
  return response.data
}

export async function updateTestimonial(id: string, testimonialData: any): Promise<Testimonial> {
  const response = await fetchAdminApi<Testimonial>(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(testimonialData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to update testimonial')
  return response.data
}

// Admin Clients
export async function getAdminClients(params?: {
  search?: string
  industry?: string
  featured?: boolean
  page?: number
  pageSize?: number
}): Promise<{ data: Client[], pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.append('search', params.search)
  if (params?.industry) searchParams.append('industry', params.industry)
  if (params?.featured !== undefined) searchParams.append('featured', params.featured.toString())
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

  const response = await fetchAdminApi<Client[]>(`/clients?${searchParams}`)
  return { 
    data: response.data || [], 
    pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
  }
}

export async function createClient(clientData: any): Promise<Client> {
  const response = await fetchAdminApi<Client>('/clients', {
    method: 'POST',
    body: JSON.stringify(clientData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to create client')
  return response.data
}

// Admin Users
export async function getAdminUsers(params?: {
  search?: string
  role?: string
  active?: boolean
  page?: number
  pageSize?: number
}): Promise<{ data: User[], pagination: any }> {
  const searchParams = new URLSearchParams()
  
  if (params?.search) searchParams.append('search', params.search)
  if (params?.role) searchParams.append('role', params.role)
  if (params?.active !== undefined) searchParams.append('active', params.active.toString())
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.pageSize) searchParams.append('pageSize', params.pageSize.toString())

  const response = await fetchAdminApi<User[]>(`/cms/users?${searchParams}`)
  return { 
    data: response.data || [], 
    pagination: response.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 }
  }
}

export async function createUser(userData: any): Promise<User> {
  const response = await fetchAdminApi<User>('/cms/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to create user')
  return response.data
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const response = await fetchAdminApi<Category[]>('/cms/categories')
  return response.data || []
}

export async function createCategory(categoryData: any): Promise<Category> {
  const response = await fetchAdminApi<Category>('/cms/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData)
  })
  if (!response.data) throw new Error(response.error || 'Failed to create category')
  return response.data
}