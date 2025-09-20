import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Bucket'ları listele
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({
        success: false,
        error: 'Bucket listesi alınamadı',
        details: bucketsError.message
      })
    }

    // product-images bucket'ını bul
    const productImagesBucket = buckets?.find(bucket => bucket.name === 'product-images')
    
    return NextResponse.json({
      success: true,
      buckets: buckets?.map(b => ({ name: b.name, public: b.public, id: b.id })) || [],
      productImagesBucket: productImagesBucket ? {
        name: productImagesBucket.name,
        public: productImagesBucket.public,
        id: productImagesBucket.id
      } : null,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Storage test başarısız',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    })
  }
}
