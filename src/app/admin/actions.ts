// src/app/admin/actions.ts
"use server"

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache"

// Service role client for admin operations (bypasses RLS)
function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  // Debug logging for production issues
  if (!supabaseUrl) {
    console.error('NEXT_PUBLIC_SUPABASE_URL is not defined')
  }
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not defined')
  }
  
  return createClient(
    supabaseUrl!,
    serviceRoleKey!,
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
  try {
    const supabase = createServiceRoleClient()
    
    const file = formData.get('file') as File
    
    if (!file) {
      return { error: 'Dosya bulunamadı' }
    }

    console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Bucket'ın var olup olmadığını kontrol et
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('Bucket listesi alınamadı:', bucketsError)
      return { error: 'Storage bucket\'ına erişilemiyor' }
    }

    const productImagesBucket = buckets?.find(bucket => bucket.name === 'product-images')
    
    if (!productImagesBucket) {
      console.log('product-images bucket bulunamadı, oluşturuluyor...')
      
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('product-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      })

      if (createError) {
        console.error('Bucket oluşturma hatası:', createError)
        return { error: 'Storage bucket\'ı oluşturulamadı' }
      }

      console.log('Bucket oluşturuldu:', newBucket)
    }

    // Dosya validasyonu
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Desteklenmeyen dosya formatı' }
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      return { error: 'Dosya çok büyük (max 5MB)' }
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    console.log('Uploading to path:', filePath)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      console.error('Upload error details:', {
        message: uploadError.message,
        name: uploadError.name
      })
      throw uploadError
    }

    console.log('Upload data:', uploadData)

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    console.log('Upload successful, URL:', publicUrl)
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
  try {
    const supabase = createServiceRoleClient()
    
    console.log('Creating product with data:', productData)
    
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select()
      .single()

    if (error) {
      console.error('Product creation error:', error)
      return { error: error.message }
    }

    console.log('Product created successfully:', data)
    revalidatePath("/admin/urunler")
    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error in createProduct:', err)
    return { error: 'Beklenmeyen bir hata oluştu' }
  }
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