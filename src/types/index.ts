// src/types/index.ts

export interface Category {
  id: string
  name: string
  slug: string
  parent_id?: string | null
  created_at: string
  parent?: Category
  children?: Category[]
}

export interface Product {
  id: string
  name: string
  description?: string
  image_url?: string
  category_id: string
  created_at: string
  category?: Category
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  is_primary: boolean
  created_at: string
}

export interface Admin {
  id: string
  username: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
  updated_at: string
}