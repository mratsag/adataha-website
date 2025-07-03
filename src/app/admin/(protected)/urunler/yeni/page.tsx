// src/app/admin/(protected)/urunler/yeni/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import ProductForm from "@/components/admin/ProductForm"

export default async function NewProductPage() {
  const supabase = await createServerComponentClient()
  
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return <ProductForm categories={categories || []} />
}