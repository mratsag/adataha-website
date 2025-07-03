// src/app/sitemap.ts
import { createServerComponentClient } from "@/lib/supabase/server"
import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerComponentClient()
  const baseUrl = "https://adataha.com" // Domain'inizi güncelleyin

  // Kategorileri getir
  const { data: categories } = await supabase
    .from("categories")
    .select("slug, created_at")

  // Ürünleri getir
  const { data: products } = await supabase
    .from("products")
    .select("id, created_at")

  const categoryUrls = categories?.map((category) => ({
    url: `${baseUrl}/kategori/${category.slug}`,
    lastModified: new Date(category.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })) || []

  const productUrls = products?.map((product) => ({
    url: `${baseUrl}/urun/${product.id}`,
    lastModified: new Date(product.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...categoryUrls,
    ...productUrls,
  ]
}