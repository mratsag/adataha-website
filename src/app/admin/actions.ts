// src/app/admin/actions.ts
"use server"

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from "next/cache"

// Service role client for admin operations (bypasses RLS)
function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Debug logging for production issues
  if (!supabaseUrl) {
    console.error('NEXT_PUBLIC_SUPABASE_URL is not defined')
  }
  if (!serviceRoleKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not defined')
  }
  
  // Service role key geçersizse anon key ile dene
  const keyToUse = serviceRoleKey || anonKey
  
  if (!keyToUse) {
    throw new Error('No valid Supabase key found')
  }
  
  console.log('Using key type:', serviceRoleKey ? 'service_role' : 'anon')
  
  return createClient(
    supabaseUrl!,
    keyToUse,
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
    let productImagesBucket
    try {
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
      
      if (bucketsError) {
        console.error('Bucket listesi alınamadı:', bucketsError)
        // Bucket listesi alınamazsa direkt upload'u deneyelim
        console.log('Bucket listesi alınamadı, direkt upload deneniyor...')
      } else {
        productImagesBucket = buckets?.find(bucket => bucket.name === 'product-images')
        console.log('Mevcut bucket\'lar:', buckets?.map(b => b.name))
        console.log('product-images bucket bulundu:', !!productImagesBucket)
      }
    } catch (error) {
      console.error('Bucket kontrolü hatası:', error)
      // Hata durumunda direkt upload'u deneyelim
    }
    
    if (!productImagesBucket) {
      console.log('product-images bucket bulunamadı, oluşturuluyor...')
      
      try {
        const { data: newBucket, error: createError } = await supabase.storage.createBucket('product-images', {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          fileSizeLimit: 5242880 // 5MB
        })

        if (createError) {
          console.error('Bucket oluşturma hatası:', createError)
          // Bucket oluşturulamazsa direkt upload'u deneyelim
          console.log('Bucket oluşturulamadı, direkt upload deneniyor...')
        } else {
          console.log('Bucket oluşturuldu:', newBucket)
        }
      } catch (error) {
        console.error('Bucket oluşturma hatası:', error)
        // Hata durumunda direkt upload'u deneyelim
      }
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

    // Upload'u dene
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
      
      // Eğer bucket yoksa, tekrar oluşturmayı dene
      if (uploadError.message.includes('not found') || uploadError.message.includes('does not exist')) {
        console.log('Bucket bulunamadı, tekrar oluşturuluyor...')
        
        try {
          const { error: createError } = await supabase.storage.createBucket('product-images', {
            public: true
          })
          
          if (!createError) {
            console.log('Bucket oluşturuldu, upload tekrar deneniyor...')
            
            // Tekrar upload dene
            const { data: retryUploadData, error: retryUploadError } = await supabase.storage
              .from('product-images')
              .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
              })
            
            if (retryUploadError) {
              throw retryUploadError
            }
            
            console.log('Retry upload successful:', retryUploadData)
            // Retry başarılıysa devam et
            const { data: { publicUrl } } = supabase.storage
              .from('product-images')
              .getPublicUrl(filePath)

            console.log('Upload successful, URL:', publicUrl)
            return { success: true, url: publicUrl }
          }
        } catch (retryError) {
          console.error('Retry upload failed:', retryError)
        }
      }
      
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