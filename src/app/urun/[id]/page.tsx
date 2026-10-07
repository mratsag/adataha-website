// src/app/(public)/urun/[id]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createServerComponentClient } from "@/lib/supabase/server"
import { ChevronRight, Package, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ProductGrid from "@/components/product/ProductGrid"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerComponentClient()
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .eq("id", id)
    .single()

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    }
  }

  return {
    title: `${product.name}`,
    description: product.description || `${product.name} - Adataha'dan profesyonel ${product.category?.name?.toLowerCase()} ürünü. Cafe ve restaurant ihtiyaçlarınız için kaliteli çözüm. Güvenilir tedarikçi, hızlı teslimat.`,
    keywords: [product.name.toLowerCase(), product.category?.name?.toLowerCase(), "cafe ürünleri", "restaurant ürünleri", "adataha", "profesyonel mutfak"],
    openGraph: {
      title: `${product.name} - Adataha`,
      description: product.description || `${product.name} ürünü hakkında detaylı bilgi. ${product.category?.name} kategorisinde.`,
      url: `https://www.adataha.com.tr/urun/${id}`,
      images: product.image_url ? [
        {
          url: product.image_url,
          width: 800,
          height: 600,
          alt: product.name,
        }
      ] : [],
    },
    alternates: {
      canonical: `https://www.adataha.com.tr/urun/${id}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createServerComponentClient()

  // Ürünü ve kategorisini getir
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("id", id)
    .single()

  if (!product) {
    notFound()
  }

  // Aynı kategorideki diğer ürünleri getir (öneriler için)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .limit(4)

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Profesyonel ${product.category?.name} ürünü`,
    "image": product.image_url || "",
    "brand": {
      "@type": "Brand",
      "name": "Adataha"
    },
    "category": product.category?.name,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "TRY",
      "seller": {
        "@type": "Organization",
        "name": "Adataha"
      }
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Adataha"
    }
  }

  const categoryHref = product.category?.slug ? `/kategori/${product.category.slug}` : "/#kategoriler"
  const whatsappHref = `https://wa.me/905325659667?text=${encodeURIComponent(`Merhaba, ${product.name} ürünü hakkında bilgi almak istiyorum.`)}`

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema)
        }}
      />
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
            <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0 text-muted-foreground" />
            <Link
              href={categoryHref}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {product.category?.name || "Ürün grupları"}
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0 text-muted-foreground" />
            <span aria-current="page" className="break-words font-medium text-foreground">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="pb-14 pt-7 md:pb-20 md:pt-10">
        <div className="site-container">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Image Section */}
            <div className="min-w-0 lg:sticky lg:top-28">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-border bg-white lg:aspect-square">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-contain p-6 md:p-10"
                      sizes="(max-width: 1023px) 100vw, 640px"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package aria-hidden="true" className="h-16 w-16 text-muted-foreground/30" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="min-w-0 space-y-7 lg:py-3">
              {/* Back Button */}
              <Link
                href={categoryHref}
                className="inline-flex items-center text-xs text-muted-foreground transition-colors hover:text-brand-caramel"
              >
                <ArrowLeft aria-hidden="true" className="mr-2 h-3 w-3" />
                {product.category?.name ? `${product.category.name} kategorisine dön` : "Ürün gruplarına dön"}
              </Link>

              {/* Title */}
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Menünüz için seçtiklerimiz</p>
                <h1 className="mb-5 break-words text-3xl font-medium leading-[1.15] tracking-[-0.045em] md:text-4xl xl:text-5xl">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2">
                  {product.category?.name && <Link href={categoryHref} className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-brand-caramel">
                    {product.category.name}
                  </Link>}
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="border-t border-border pt-6">
                  <h2 className="mb-3 text-base font-medium">Ürün hakkında</h2>
                  <p className="whitespace-pre-wrap break-words text-sm leading-8 text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl border border-border p-5 md:p-6">
                <h2 className="mb-3 text-2xl font-medium tracking-tight">
                  Birlikte <em className="font-serif font-normal text-brand-caramel">konuşalım.</em>
                </h2>
                <p className="mb-5 text-sm leading-7 text-muted-foreground">
                  Bu ürünün güncel fiyatı, stok durumu ve sipariş detayları için bize ulaşın.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                <Link href="/iletisim" className="inline-flex items-center gap-4 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  İletişime geçin <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-3 text-sm font-medium hover:text-brand-caramel"><MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp’tan sorun</a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-12 border-t border-border pt-10 md:mt-16 md:pt-12">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-3xl font-medium tracking-[-0.04em]">Menünüzü <em className="font-serif font-normal text-brand-caramel">tamamlayın.</em></h2>
                <Link href={categoryHref} className="inline-flex items-center gap-2 py-2 text-xs font-medium hover:text-brand-caramel">Kategorideki tüm ürünler <ArrowRight aria-hidden="true" className="h-3 w-3" /></Link>
              </div>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
