// src/app/admin/(protected)/kategoriler/page.tsx
import { createServerComponentClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import DeleteButton from "@/components/admin/DeleteButton"
import Link from "next/link"

export default async function AdminCategoriesPage() {
  const supabase = await createServerComponentClient()
  
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kategoriler</h1>
          <p className="text-muted-foreground mt-2">
            Ürün kategorilerini yönetin
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/kategoriler/yeni">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kategori
          </Link>
        </Button>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Tüm Kategoriler</CardTitle>
          <CardDescription>
            Toplam {categories?.length || 0} kategori listeleniyor
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(categories && categories.length > 0) ? (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted">
                  <tr>
                    <th className="px-6 py-3">Kategori Adı</th>
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Oluşturma Tarihi</th>
                    <th className="px-6 py-3 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {(categories ?? []).map((category) => (
                    <tr key={category.id} className="border-b hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium">{category.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{category.slug}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(category.created_at).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/kategoriler/duzenle/${category.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DeleteButton
                            id={category.id}
                            itemName={category.name}
                            type="category"
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
              <p className="text-muted-foreground mb-4">
                Henüz kategori eklenmemiş
              </p>
              <Button asChild>
                <Link href="/admin/kategoriler/yeni">
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Kategoriyi Ekle
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}