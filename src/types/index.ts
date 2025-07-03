// src/types/index.ts

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
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