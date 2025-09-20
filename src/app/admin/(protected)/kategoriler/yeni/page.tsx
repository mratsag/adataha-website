// src/app/admin/(protected)/kategoriler/yeni/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import CategoryForm from "@/components/admin/CategoryForm"

export default async function NewCategoryPage() {
  const supabase = await createServerComponentClient()
  
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return <CategoryForm parentCategories={categories || []} />
}