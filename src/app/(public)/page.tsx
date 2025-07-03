// src/app/(public)/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import CategoryGrid from "@/components/category/CategoryGrid"
import { Sparkles } from "lucide-react"

export default async function HomePage() {
  const supabase = await createServerComponentClient()
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Profesyonel Cafe & Restaurant Ürünleri</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Kalite ve Lezzet Bir Arada
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Cafe ve restaurantınız için ihtiyacınız olan tüm ürünler. 
              Şuruplardan kahvelere, pürelerden bar soslara kadar geniş ürün yelpazemizle hizmetinizdeyiz.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">11+</div>
                <div className="text-sm text-muted-foreground">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Ürün</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">100+</div>
                <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-muted-foreground">Yıllık Tecrübe</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ürün Kategorilerimiz
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              İşletmenizin ihtiyaçlarına özel, geniş ürün yelpazemizle tanışın
            </p>
          </div>

          {/* Category Grid */}
          {categories && categories.length > 0 ? (
            <CategoryGrid categories={categories} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Henüz kategori bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            İşletmeniz için en uygun ürünleri keşfedin. Kaliteli ürünlerimizle müşterilerinize unutulmaz lezzetler sunun.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Bizimle İletişime Geçin
          </a>
        </div>
      </section>

      {/* CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  )
}