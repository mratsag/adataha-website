// src/app/admin/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FolderOpen, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const supabase = await createServerComponentClient()

  // İstatistikleri getir
  const [categoriesResult, productsResult] = await Promise.all([
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    {
      title: "Toplam Kategori",
      value: categoriesResult.count || 0,
      icon: FolderOpen,
      href: "/admin/kategoriler",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Toplam Ürün",
      value: productsResult.count || 0,
      icon: Package,
      href: "/admin/urunler",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Aktif Müşteriler",
      value: "100+",
      icon: Users,
      href: "#",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Aylık Büyüme",
      value: "%15",
      icon: TrendingUp,
      href: "#",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  // Son eklenen ürünleri getir
  const { data: recentProducts } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Adataha admin paneline hoş geldiniz
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2 rounded-full", stat.bgColor)}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.href !== "#" && (
                <Link
                  href={stat.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors mt-1 inline-block"
                >
                  Detayları görüntüle →
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Son Eklenen Ürünler</CardTitle>
              <CardDescription>
                En son eklenen 5 ürün listeleniyor
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/admin/urunler">
                Tüm Ürünler
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {recentProducts && recentProducts.length > 0 ? (
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.category?.name}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/urunler/${product.id}`}>
                      Düzenle
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Henüz ürün eklenmemiş
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>
            Sık kullanılan işlemler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button asChild variant="outline" className="h-auto py-4">
              <Link href="/admin/urunler/yeni" className="flex flex-col items-center space-y-2">
                <Package className="h-8 w-8" />
                <span>Yeni Ürün Ekle</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link href="/admin/kategoriler" className="flex flex-col items-center space-y-2">
                <FolderOpen className="h-8 w-8" />
                <span>Kategorileri Yönet</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link href="/" target="_blank" className="flex flex-col items-center space-y-2">
                <TrendingUp className="h-8 w-8" />
                <span>Siteyi Görüntüle</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}