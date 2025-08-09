// src/app/admin/(protected)/urunler/duzenle/[id]/page.tsx
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@/lib/supabase/server"
import ProductForm from "@/components/admin/ProductForm"
import type { Metadata } from "next"

interface EditProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerComponentClient()
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .eq("id", id)
    .single()

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    }
  }

  return {
    title: `${product.name} Düzenle - Adataha`,
    description: product.description || `${product.name} ürününü düzenleyin. ${product.category?.name} kategorisinde.`,
    openGraph: {
      images: product.image_url ? [product.image_url] : [],
    },
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const supabase = await createServerComponentClient()
  
  const [productResult, categoriesResult] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single(),
    supabase
      .from("categories")
      .select("*")
      .order("name")
  ])

  if (!productResult.data) {
    notFound()
  }

  return (
    <ProductForm 
      product={productResult.data} 
      categories={categoriesResult.data || []} 
    />
  )
}