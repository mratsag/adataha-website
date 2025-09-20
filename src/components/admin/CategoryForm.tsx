// src/components/admin/CategoryForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createCategory, updateCategory } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import type { Category } from "@/types"

interface CategoryFormProps {
  category?: Category
  parentCategories?: Category[]
}

export default function CategoryForm({ category, parentCategories = [] }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    parent_id: category?.parent_id || "none",
  })

  const isEditMode = !!category

  // Slug oluştur
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData({
      name,
      slug: generateSlug(name),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditMode) {
        // Güncelleme
        const result = await updateCategory(category.id, {
          name: formData.name,
          slug: formData.slug,
          parent_id: formData.parent_id === "none" ? null : formData.parent_id,
        })

        if (result.error) {
          throw new Error(result.error)
        }

        toast.success("Kategori güncellendi")
      } else {
        // Yeni ekleme
        const result = await createCategory({
          name: formData.name,
          slug: formData.slug,
          parent_id: formData.parent_id === "none" ? null : formData.parent_id,
        })

        if (result.error) {
          throw new Error(result.error)
        }

        toast.success("Kategori eklendi")
      }

      router.push("/admin/kategoriler")
      router.refresh()
    } catch (error: unknown) {
      toast.error("Hata", {
        description: error instanceof Error ? error.message : "Bir hata oluştu",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/kategoriler"
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Kategori Düzenle" : "Yeni Kategori"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditMode ? "Kategori bilgilerini güncelleyin" : "Yeni bir kategori ekleyin"}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Bilgileri</CardTitle>
          <CardDescription>
            Kategori adını girin, URL dostu slug otomatik oluşturulacak
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Kategori Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Örn: Kahveler"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL (Slug)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="kahveler"
                required
              />
              <p className="text-sm text-muted-foreground">
                URL&apos;de kullanılacak format. Türkçe karakterler otomatik dönüştürülür.
              </p>
            </div>

            {/* Alt kategori sistemi aktif */}
            {true && (
              <div className="space-y-2">
                <Label htmlFor="parent">Ana Kategori (İsteğe Bağlı)</Label>
                <Select
                  value={formData.parent_id}
                  onValueChange={(value) => setFormData({ ...formData, parent_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ana kategori seçin (boş bırakırsanız ana kategori olur)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ana Kategori</SelectItem>
                    {parentCategories
                      .filter(cat => !cat.parent_id) // Sadece ana kategoriler
                      .filter(cat => !isEditMode || cat.id !== category?.id) // Düzenleme modunda kendini seçmesin
                      .map((parentCategory) => (
                        <SelectItem key={parentCategory.id} value={parentCategory.id}>
                          {parentCategory.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Bu kategoriyi bir ana kategorinin alt kategorisi yapmak için seçin.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isEditMode ? "Güncelle" : "Kaydet"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}