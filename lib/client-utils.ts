// Utility functions for client CRUD operations
import { ApiResponse, Client } from '@/lib/types'

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

// Client API operations
export class ClientAPI {
  
  static async getClients(params?: {
    featured?: boolean
    search?: string
    page?: number
    limit?: number
  }): Promise<ApiResponse<Client[]>> {
    const searchParams = new URLSearchParams()
    if (params?.featured) searchParams.append('featured', 'true')
    if (params?.search) searchParams.append('search', params.search)
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    const url = `${API_BASE}/api/clients?${searchParams}`

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching clients:', error)
      return { 
        data: [], 
        error: error instanceof Error ? error.message : 'Failed to fetch clients' 
      }
    }
  }

  static async getClient(id: string): Promise<ApiResponse<Client>> {
    try {
      const response = await fetch(`${API_BASE}/api/clients/${id}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching client:', error)
      return { 
        error: error instanceof Error ? error.message : 'Failed to fetch client' 
      }
    }
  }

  static async createClient(clientData: {
    companyName: string
    contactName?: string
    email?: string
    phone?: string
    address?: string
    website?: string
    logo?: string
    industry?: string
    size?: string
    notes?: string
    isFeatured?: boolean
  }): Promise<ApiResponse<Client>> {
    try {
      const response = await fetch(`${API_BASE}/api/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (parseError) {
          errorData = { error: 'Invalid response format' }
        }
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error creating client:', error)
      return { 
        error: error instanceof Error ? error.message : 'Failed to create client' 
      }
    }
  }

  static async updateClient(id: string, clientData: Partial<{
    companyName: string
    contactName: string
    email: string
    phone: string
    address: string
    website: string
    logo: string
    industry: string
    size: string
    notes: string
    isFeatured: boolean
    isActive: boolean
  }>): Promise<ApiResponse<Client>> {
    try {
      const response = await fetch(`${API_BASE}/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      })

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch (parseError) {
          errorData = { error: 'Invalid response format' }
        }
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error updating client:', error)
      return { 
        error: error instanceof Error ? error.message : 'Failed to update client' 
      }
    }
  }

  static async deleteClient(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_BASE}/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error deleting client:', error)
      return { 
        error: error instanceof Error ? error.message : 'Failed to delete client' 
      }
    }
  }

  // Toggle client featured status
  static async toggleFeatured(id: string, isFeatured: boolean): Promise<ApiResponse<Client>> {
    return this.updateClient(id, { isFeatured })
  }

  // Toggle client active status
  static async toggleActive(id: string, isActive: boolean): Promise<ApiResponse<Client>> {
    return this.updateClient(id, { isActive })
  }

  // Get featured clients specifically for the homepage
  static async getFeaturedClients(): Promise<Client[]> {
    const response = await this.getClients({ featured: true })
    return response.data || []
  }
}

// Export convenience functions
export const {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  toggleFeatured,
  toggleActive,
  getFeaturedClients,
} = ClientAPI