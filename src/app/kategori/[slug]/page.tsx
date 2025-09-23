// src/app/(public)/kategori/[slug]/page.tsx
import { notFound } from "next/navigation"
import { createServerComponentClient } from "@/lib/supabase/server"
import ProductGrid from "@/components/product/ProductGrid"
import CategoryGrid from "@/components/category/CategoryGrid"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServerComponentClient()
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!category) {
    return {
      title: "Kategori Bulunamadı",
    }
  }

  return {
    title: `${category.name} Ürünleri`,
    description: `Adataha ${category.name} kategorisindeki profesyonel ürünleri inceleyin. Cafe ve restaurant ihtiyaçlarınız için kaliteli ${category.name.toLowerCase()} ürünleri. Güvenilir tedarikçi, hızlı teslimat.`,
    keywords: [`${category.name.toLowerCase()}`, `${category.name.toLowerCase()} ürünleri`, "cafe ürünleri", "restaurant ürünleri", "adataha", "profesyonel mutfak"],
    openGraph: {
      title: `${category.name} Ürünleri - Adataha`,
      description: `Adataha ${category.name} kategorisindeki profesyonel ürünleri inceleyin. Cafe ve restaurant ihtiyaçlarınız için kaliteli ürünler.`,
      url: `https://www.adataha.com.tr/kategori/${slug}`,
    },
    alternates: {
      canonical: `https://www.adataha.com.tr/kategori/${slug}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const supabase = await createServerComponentClient()

  // Kategoriyi getir
  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!category) {
    notFound()
  }

  // Alt kategorileri getir
  const { data: subcategories } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", category.id)
    .order("name")

  // Bu kategori + alt kategorilerin id'leri
  const categoryIds = [category.id, ...(subcategories?.map((c) => c.id) || [])]

  // Kategori ve alt kategorilere ait ürünleri getir
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in("category_id", categoryIds)
    .order("name")

  return (
    <>
        {/* Breadcrumb */}
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Ana Sayfa
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              {(products?.length || 0)} ürün listeleniyor
            </p>
          </div>
        </div>
      </section>

      {/* Subcategories Section */}
      {subcategories && subcategories.length > 0 && (
        <section className="py-10 md:py-12 border-b bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Alt Kategoriler</h2>
              <p className="text-muted-foreground text-sm mt-1">{category.name} altındaki alt gruplar</p>
            </div>
            <CategoryGrid categories={subcategories} />
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {products && products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Henüz ürün eklenmemiş</h3>
              <p className="text-muted-foreground">
                Bu kategoride henüz ürün bulunmuyor. Yakında eklenecek!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}