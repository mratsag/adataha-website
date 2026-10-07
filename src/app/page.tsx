// src/app/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import CategoryGrid from "@/components/category/CategoryGrid"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import CoffeePourAnimation from "@/components/CoffeePourAnimation"
import BrandLogoStrip from "@/components/BrandLogoStrip"
import { Metadata } from "next"
import Image from "next/image"
import { categoryImagesBySlug } from "@/lib/category-images"
import HomeHighlights from "@/components/HomeHighlights"

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Adataha ile profesyonel cafe ve restaurant ürünleri. Kaliteli şuruplar, püreler, kahveler ve daha fazlası. Türkiye'nin güvenilir tedarikçisi.",
  openGraph: {
    title: "Adataha - Profesyonel Cafe & Restaurant Ürünleri",
    description: "Adataha ile profesyonel cafe ve restaurant ürünleri. Kaliteli şuruplar, püreler, kahveler ve daha fazlası.",
    url: "https://www.adataha.com.tr",
  },
}

export default async function HomePage() {
  const supabase = await createServerComponentClient()
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
  }

  const productResult = await supabase.from("products").select("id", { count: "exact", head: true })
  const categoryImages: Record<string, string> = Object.fromEntries(
    (categories ?? []).flatMap(category => categoryImagesBySlug[category.slug] ? [[category.id, categoryImagesBySlug[category.slug]]] : [])
  )

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Adataha",
    "url": "https://www.adataha.com.tr",
    "logo": "https://www.adataha.com.tr/logo.png",
    "description": "Türkiye'nin önde gelen cafe ve restaurant ürünleri tedarikçisi. Kaliteli şuruplar, püreler, kahveler ve daha fazlası.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TR",
      "addressLocality": "Türkiye"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-532-565-96-67",
      "contactType": "customer service",
      "availableLanguage": "Turkish"
    },
    "sameAs": [
      "https://www.instagram.com/adataha",
      "https://www.facebook.com/adataha"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Adataha",
    "url": "https://www.adataha.com.tr",
    "description": "Profesyonel cafe ve restaurant ürünleri tedarikçisi",
    "publisher": {
      "@type": "Organization",
      "name": "Adataha"
    }
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />

      <Header categories={categories ?? []} />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="overflow-hidden border-b border-border/40 bg-white dark:bg-background">
          <div className="site-container grid items-center gap-8 py-10 md:py-12 lg:min-h-[620px] lg:grid-cols-2 lg:content-start lg:gap-10 lg:pb-10 lg:pt-8">
            <div className="relative z-10">
              <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-caramel">
                <span className="h-px w-8 bg-brand-caramel" /> Profesyonel cafe & restaurant ürünleri
              </p>
              <h1 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-0.045em] md:text-6xl xl:text-7xl">
                Kalite ve lezzet,<br /><span className="font-serif font-normal italic text-brand-caramel">aynı fincanda.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground md:text-lg">
                Kahveden şuruba, ilk yudumdan son dokunuşa. Cafe ve restaurantınız için ihtiyacınız olan lezzetler Adataha’da.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/kategori/kahveler" className="inline-flex items-center gap-5 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Kahveleri keşfet <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/#kategoriler" className="px-2 py-3 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:text-brand-caramel">Tüm ürün grupları</Link>
              </div>
              <div className="mt-10 flex max-w-md flex-wrap gap-x-8 gap-y-4 border-t border-border/60 pt-6">
                <div><span className="text-xl font-semibold">11+</span><span className="ml-2 text-xs text-muted-foreground">Kategori</span></div>
                {productResult.count !== null && <div><span className="text-xl font-semibold">{productResult.count}</span><span className="ml-2 text-xs text-muted-foreground">Ürün</span></div>}
                <div><span className="text-xl font-semibold">5+</span><span className="ml-2 text-xs text-muted-foreground">Yıllık tecrübe</span></div>
              </div>
            </div>
            <CoffeePourAnimation />
          </div>
          <BrandLogoStrip />
        </section>

        {/* Categories Section */}
        <section id="kategoriler" className="scroll-mt-20 bg-background py-14 md:py-20">
          <div className="site-container">
            {/* Section Header */}
            <div className="mb-8 flex flex-col justify-between gap-5 md:mb-10 md:flex-row md:items-end md:gap-10">
              <h2 className="max-w-2xl text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[54px]">
                Menünüz için her şey,<br /><em className="font-serif font-normal text-brand-caramel">bir arada.</em>
              </h2>
              <p className="max-w-xs text-sm leading-7 text-muted-foreground">
                İşletmenizin ihtiyaçlarına özel, geniş ürün yelpazemizle tanışın
              </p>
            </div>

            {/* Category Grid */}
            {categories && categories.length > 0 ? (
              <CategoryGrid categories={categories} images={categoryImages} compact />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Henüz kategori bulunmuyor.</p>
              </div>
            )}
          </div>
        </section>

        <HomeHighlights />

        {/* CTA Section */}
        <section className="overflow-hidden border-t border-border bg-background">
          <div className="site-container grid items-center gap-8 py-16 md:grid-cols-[1.2fr_1fr] md:gap-16 md:py-20">
            <div>
              <h2 className="text-[44px] font-medium leading-[1.12] tracking-[-0.05em] lg:text-[64px]">
                Birlikte güzel<br /><em className="font-serif font-normal text-brand-caramel">bir başlangıç.</em>
              </h2>
              <p className="mb-8 mt-6 max-w-md text-sm leading-8 text-muted-foreground">
                İşletmeniz için en uygun ürünleri birlikte seçelim. Kahve, içecek ve tatlı menünüz için bize ulaşın.
              </p>
              <Link href="/iletisim" className="inline-flex items-center gap-5 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Bizimle iletişime geçin <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative mx-auto aspect-square w-full max-w-[360px] md:max-w-[460px]">
              <Image src="/images/cawa-portfolio.webp" alt="CAWA kahve paketi, DaVinci Gourmet şurup ve Caffe Nonno kahvesiyle hazırlanan ürün kompozisyonu" fill sizes="(max-width: 767px) 360px, 460px" className="object-contain" />
            </div>
          </div>
        </section>

        {/* CSS moved to globals.css */}
      </main>
      <Footer />
    </>
  )
}
