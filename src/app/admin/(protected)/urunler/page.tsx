// src/app/admin/(protected)/urunler/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import AdminProductsClient from "@/components/admin/AdminProductsClient"

export default async function AdminProductsPage() {
  const supabase = await createServerComponentClient()
  
  // Ürünleri kategorileri ile birlikte getir
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .order("created_at", { ascending: false })

  return <AdminProductsClient products={products || []} />
}