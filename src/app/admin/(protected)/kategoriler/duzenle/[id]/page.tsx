// src/app/admin/(protected)/kategoriler/duzenle/[id]/page.tsx
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@/lib/supabase/server"
import CategoryForm from "@/components/admin/CategoryForm"

interface EditCategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params
  const supabase = await createServerComponentClient()
  
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single()

  if (!category) {
    notFound()
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  return <CategoryForm category={category} parentCategories={categories || []} />
}