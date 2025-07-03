// src/app/admin/actions.ts
"use server"

import { createServerActionClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteCategory(id: string) {
  const supabase = await createServerActionClient()
  
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
  const supabase = await createServerActionClient()
  
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