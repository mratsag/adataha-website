// src/app/admin/(protected)/urunler/page.tsx
"use client"
import { createServerComponentClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Search, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import DeleteButton from "@/components/admin/DeleteButton"



import { useState, useMemo, useEffect } from "react"

export default function AdminProductsPage({ products: initialProducts }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState(initialProducts || [])

  // Filter products by search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    return products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <p className="text-muted-foreground mt-2">
            Tüm ürünleri görüntüleyin ve yönetin
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/urunler/yeni">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün
          </Link>
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ürün ara..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Tüm Ürünler</CardTitle>
          <CardDescription>
            Toplam {filteredProducts.length} ürün listeleniyor
            {searchTerm && ` (${products.length} ürün içinde arama yapıldı)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Yükleniyor...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted">
                  <tr>
                    <th className="px-6 py-3">Görsel</th>
                    <th className="px-6 py-3">Ürün Adı</th>
                    <th className="px-6 py-3">Kategori</th>
                    <th className="px-6 py-3">Açıklama</th>
                    <th className="px-6 py-3">Oluşturma Tarihi</th>
                    <th className="px-6 py-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="px-6 py-4">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                          {product.image_url ? (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {product.category?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <p className="line-clamp-1 max-w-xs">
                          {product.description || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(product.created_at).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/urunler/duzenle/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteButton
                            id={product.id}
                            itemName={product.name}
                            type="product"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Aramanızla eşleşen ürün bulunamadı" : "Henüz ürün eklenmemiş"}
              </p>
              {!searchTerm && (
                <Button asChild>
                  <Link href="/admin/urunler/yeni">
                    <Plus className="h-4 w-4 mr-2" />
                    İlk Ürünü Ekle
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}