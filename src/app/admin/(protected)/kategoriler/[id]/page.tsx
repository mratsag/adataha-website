// src/app/admin/(protected)/kategoriler/[id]/page.tsx
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@/lib/supabase/server"
import CategoryForm from "@/components/admin/CategoryForm"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const supabase = await createServerComponentClient()
  
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!category) {
    notFound()
  }

  return <CategoryForm category={category} />
}