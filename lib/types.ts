// Re-export Prisma types with custom extensions
export type {
  User,
  Session,
  Page,
  Post,
  Category,
  Media,
  Product,
  Service,
  Client,
  Testimonial,
  Inquiry,
  Setting,
  Menu,
  Block,
  Section,
  Role,
  PageStatus,
  PostStatus,
  ProductStatus,
  ServiceStatus,
  StockStatus,
  InquiryType,
  InquiryStatus,
  Priority,
  CompanySize,
  SettingType,
  BlockType,
  SectionType,
} from '@prisma/client'

// Extended types for API responses
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// CMS Content Types
export interface ContentBlock {
  id: string
  type: 'text' | 'image' | 'gallery' | 'video' | 'embed' | 'custom'
  content: any
  settings?: Record<string, any>
}

export interface PageContent {
  blocks: ContentBlock[]
  settings?: Record<string, any>
}

// Form Types
export interface ContactFormData {
  type: 'customer' | 'vendor' | 'distributor' | 'corporate'
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  productId?: string
  serviceId?: string
}

export interface InquiryFormData {
  type: InquiryType
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  productId?: string
  serviceId?: string
}

// Filter Types
export interface ProductFilters {
  category?: string
  priceRange?: [number, number]
  featured?: boolean
  search?: string
  status?: ProductStatus
  stockStatus?: StockStatus
}

export interface ServiceFilters {
  category?: string
  featured?: boolean
  search?: string
  status?: ServiceStatus
}

// CMS Admin Types
export interface DashboardStats {
  users: number
  pages: number
  posts: number
  products: number
  services: number
  inquiries: {
    total: number
    new: number
    inProgress: number
  }
}

export interface MediaUploadResult {
  id: string
  url: string
  filename: string
  size: number
  mimeType: string
}
