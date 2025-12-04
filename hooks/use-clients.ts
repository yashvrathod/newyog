import { useState, useEffect, useCallback } from 'react'
import { Client, ApiResponse } from '@/lib/types'
import { ClientAPI } from '@/lib/client-utils'

export interface UseClientsOptions {
  featured?: boolean
  search?: string
  page?: number
  limit?: number
  autoFetch?: boolean
}

export function useClients(options: UseClientsOptions = {}) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<{
    page: number
    limit: number
    total: number
    totalPages: number
  } | null>(null)

  const fetchClients = useCallback(async (fetchOptions?: UseClientsOptions) => {
    setLoading(true)
    setError(null)
    
    try {
      const params = { ...options, ...fetchOptions }
      const response = await ClientAPI.getClients(params)
      
      if (response.error) {
        setError(response.error)
        setClients([])
      } else {
        setClients(response.data || [])
        if (response.pagination) {
          setPagination(response.pagination)
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch clients'
      setError(message)
      setClients([])
    } finally {
      setLoading(false)
    }
  }, []) // Remove options dependency to prevent infinite loop

  const createClient = useCallback(async (clientData: Parameters<typeof ClientAPI.createClient>[0]) => {
    setLoading(true)
    try {
      const response = await ClientAPI.createClient(clientData)
      if (response.error) {
        setError(response.error)
        return { success: false, error: response.error }
      } else {
        // Refresh the clients list
        await fetchClients(options)
        return { success: true, data: response.data }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create client'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const updateClient = useCallback(async (id: string, clientData: Parameters<typeof ClientAPI.updateClient>[1]) => {
    setLoading(true)
    try {
      const response = await ClientAPI.updateClient(id, clientData)
      if (response.error) {
        setError(response.error)
        return { success: false, error: response.error }
      } else {
        // Update the client in the current list
        setClients(prev => prev.map(client => 
          client.id === id ? { ...client, ...response.data } : client
        ))
        return { success: true, data: response.data }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update client'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteClient = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const response = await ClientAPI.deleteClient(id)
      if (response.error) {
        setError(response.error)
        return { success: false, error: response.error }
      } else {
        // Remove the client from the current list
        setClients(prev => prev.filter(client => client.id !== id))
        return { success: true }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete client'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleFeatured = useCallback(async (id: string, isFeatured: boolean) => {
    return updateClient(id, { isFeatured })
  }, [updateClient])

  const toggleActive = useCallback(async (id: string, isActive: boolean) => {
    return updateClient(id, { isActive })
  }, [updateClient])

  // Auto-fetch on mount only (not when options change)
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchClients(options) // Pass options directly instead of relying on closure
    }
  }, []) // Empty dependency array to run only on mount

  const refresh = useCallback(() => {
    fetchClients(options)
  }, [])

  return {
    clients,
    loading,
    error,
    pagination,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    toggleFeatured,
    toggleActive,
    refresh,
  }
}

// Specialized hook for featured clients (for homepage)
export function useFeaturedClients() {
  return useClients({ 
    featured: true, 
    autoFetch: true 
  })
}