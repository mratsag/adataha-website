// src/app/(public)/urun/[id]/page.tsx
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createServerComponentClient } from "@/lib/supabase/server"
import { ChevronRight, Package, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const supabase = await createServerComponentClient()

  // Ürünü ve kategorisini getir
  const { data: product } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*)
    `)
    .eq("id", params.id)
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
            <Link
              href={`/kategori/${product.category?.slug}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {product.category?.name}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="h-32 w-32 text-muted-foreground/20" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Back Button */}
              <Link
                href={`/kategori/${product.category?.slug}`}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {product.category?.name} kategorisine dön
              </Link>

              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {product.category?.name}
                  </span>
                </div>
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-gray max-w-none">
                  <h3 className="text-lg font-semibold mb-3">Ürün Açıklaması</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-3">
                  Bu ürünle ilgileniyor musunuz?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Detaylı bilgi ve sipariş için bizimle iletişime geçin.
                </p>
                <Link href="/iletisim">
                  <Button size="lg" className="w-full sm:w-auto">
                    İletişime Geç
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-24 pt-12 border-t">
              <h2 className="text-2xl font-bold mb-8">İlgili Ürünler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/urun/${item.id}`}
                    className="group relative overflow-hidden rounded-lg bg-card border shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Package className="h-12 w-12 text-muted-foreground/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}