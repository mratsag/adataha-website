// src/app/(public)/kategori/[slug]/page.tsx
export const dynamic = "force-dynamic"
export const revalidate = 0

import { notFound } from "next/navigation"
import { createServerComponentClient } from "@/lib/supabase/server"
import ProductGrid from "@/components/product/ProductGrid"
import CategoryGrid from "@/components/category/CategoryGrid"
import { ChevronRight, ArrowRight, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { categoryImagesBySlug } from "@/lib/category-images"
import type { Metadata } from "next"
import type { Product } from "@/types"

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
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (categoryError) {
    console.error("Category fetch error:", categoryError)
  }

  if (!category) {
    notFound()
  }

  // Alt kategorileri getir
  const { data: subcategories, error: subError } = await supabase
    .from("categories")
    .select("*")
    .eq("parent_id", category.id)
    .order("name")

  if (subError) {
    console.error("Subcategories fetch error:", subError)
  }

  const subIds = (subcategories || []).map((c) => c.id)
  const categoryIds = [category.id, ...subIds]

  // Kategori ve alt kategorilere ait ürünleri getir
  let products: Product[] = []
  try {
    if (categoryIds.length > 1) {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("category_id", categoryIds)
        .order("name")
      if (error) {
        console.error("Products fetch error (IN):", error)
      }
      products = (data as Product[]) || []
    } else {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", category.id)
        .order("name")
      if (error) {
        console.error("Products fetch error (EQ):", error)
      }
      products = (data as Product[]) || []
    }
  } catch (e) {
    console.error("Products fetch unexpected error:", e)
  }

  const categoryImage = categoryImagesBySlug[slug]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-16 md:pt-20">
        {/* Breadcrumb */}
      <section className="bg-background">
        <div className="site-container pb-2 pt-7">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Ana Sayfa
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3 text-muted-foreground" />
            <span aria-current="page" className="text-foreground font-medium">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="border-b border-border bg-background pb-10 pt-7 md:pb-12">
        
        <div className={`site-container grid items-center gap-6 ${categoryImage ? "md:grid-cols-[1.3fr_0.7fr] md:gap-12" : ""}`}>
          <div className="min-w-0">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Menünüzü tamamlayan lezzetler</p>
            <h1 className="mb-4 break-words text-4xl font-medium leading-[1.1] tracking-[-0.045em] md:text-5xl lg:text-[60px]">
              {category.name}
            </h1>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">
              İşletmenizin menüsüne uygun seçenekleri keşfedin. Ürün detaylarını inceleyin, sorularınızı bizimle paylaşın.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs">
              <span className="rounded-full border border-border px-4 py-2">{products.length} ürün</span>
              <Link href="/#kategoriler" className="inline-flex items-center gap-2 py-2 text-muted-foreground hover:text-brand-caramel">Tüm ürün grupları <ArrowRight aria-hidden="true" className="h-3 w-3" /></Link>
            </div>
          </div>
          {categoryImage && <div className="relative mx-auto h-[180px] w-full max-w-[260px] md:h-[220px] md:max-w-[300px]">
            <Image src={categoryImage} alt={`${category.name} ürün grubunu temsil eden görsel`} fill sizes="(max-width: 767px) 260px, 300px" className="rounded-2xl object-contain" />
          </div>}
        </div>
      </section>

      {/* Subcategories Section */}
      {subcategories && subcategories.length > 0 && (
        <section className="border-b border-border bg-background py-8 md:py-10">
          <div className="site-container">
            <div className="mb-6">
              <h2 className="text-2xl font-medium tracking-tight">Ürün grupları</h2>
              <p className="text-muted-foreground text-sm mt-1">{category.name} altındaki alt gruplar</p>
            </div>
            <CategoryGrid categories={subcategories} compact />
          </div>
        </section>
      )}

      {/* Products Section */}
      <section aria-labelledby="products-heading" className="py-10 md:py-14">
        <div className="site-container">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <h2 id="products-heading" className="text-3xl font-medium tracking-[-0.04em]">Menünüz için <em className="font-serif font-normal text-brand-caramel">seçenekler.</em></h2>
            <span className="text-xs text-muted-foreground">{products.length} ürün listeleniyor</span>
          </div>
          {products && products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-2xl border border-border px-6 py-12 text-center">
              <Package aria-hidden="true" className="mx-auto mb-4 h-8 w-8 text-brand-caramel" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold mb-2">Henüz ürün eklenmemiş</h3>
              <p className="text-muted-foreground">
                Bu ürün grubuyla ilgili bilgi almak için bize ulaşabilirsiniz.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="border-t border-border py-10 md:py-12">
        <div className="site-container flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-medium tracking-tight">Doğru ürünü <em className="font-serif font-normal text-brand-caramel">birlikte seçelim.</em></h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Ürünler ve sipariş detayları için bize ulaşın.</p></div>
          <Link href="/iletisim" className="inline-flex shrink-0 items-center gap-5 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:self-auto">Bizimle iletişime geçin <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
