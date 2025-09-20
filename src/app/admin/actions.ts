// src/app/admin/actions.ts
"use server"

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache"

// Service role client for admin operations (bypasses RLS)
function createServiceRoleClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

export async function deleteCategory(id: string) {
  const supabase = createServiceRoleClient()
  
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/kategoriler")
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = createServiceRoleClient()
  
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/urunler")
  return { success: true }
}

export async function uploadProductImage(formData: FormData) {
  const supabase = createServiceRoleClient()
  
  const file = formData.get('file') as File
  
  if (!file) {
    return { error: 'Dosya bulunamadı' }
  }

  // Dosya validasyonu
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Desteklenmeyen dosya formatı' }
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    return { error: 'Dosya çok büyük (max 5MB)' }
  }

  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return { success: true, url: publicUrl }
  } catch (error: unknown) {
    console.error('Upload error:', error)
    if (error instanceof Error) {
      return { error: error.message || 'Upload başarısız' }
    }
    return { error: 'Upload başarısız' }
  }
}

export async function createProduct(productData: {
  name: string
  description?: string | null
  category_id: string
  image_url?: string | null
}) {
  const supabase = createServiceRoleClient()
  
  const { data, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/urunler")
  return { success: true, data }
}

export async function updateProduct(id: string, productData: {
  name: string
  description?: string | null
  category_id: string
  image_url?: string | null
}) {
  const supabase = createServiceRoleClient()
  
  const { data, error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/urunler")
  return { success: true, data }
}

export async function createCategory(categoryData: {
  name: string
  slug: string
}) {
  const supabase = createServiceRoleClient()
  
  const { data, error } = await supabase
    .from("categories")
    .insert(categoryData)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/kategoriler")
  return { success: true, data }
}

export async function updateCategory(id: string, categoryData: {
  name: string
  slug: string
}) {
  const supabase = createServiceRoleClient()
  
  const { data, error } = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/admin/kategoriler")
  return { success: true, data }
}