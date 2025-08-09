// src/app/admin/(protected)/urunler/[id]/page.tsx
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@/lib/supabase/server"
import ProductForm from "@/components/admin/ProductForm"

interface EditProductPageProps {
  params: Promise<{
    id: string
  }>
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