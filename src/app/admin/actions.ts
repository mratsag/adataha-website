// src/app/admin/actions.ts
"use server"

import { createServerActionClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteCategory(id: string) {
  const supabase = await createServerActionClient()
  
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
  const supabase = await createServerActionClient()
  
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
  const supabase = await createServerActionClient()
  
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