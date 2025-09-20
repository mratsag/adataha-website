// src/components/admin/ProductForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { uploadProductImage, createProduct, updateProduct } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { ArrowLeft, Loader2, Upload, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Product, Category } from "@/types"

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(product?.image_url || "")
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category_id: product?.category_id || "",
  })

  const isEditMode = !!product

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Dosya çok büyük", {
          description: "Lütfen 5MB'dan küçük bir dosya seçin"
        })
        return
      }

      // Dosya tipi kontrolü
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        toast.error("Desteklenmeyen dosya formatı", {
          description: "Lütfen JPG, PNG, WebP veya GIF dosyası seçin"
        })
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    // Input'u temizle
    const input = document.getElementById('image-input') as HTMLInputElement
    if (input) input.value = ''
  }

  const uploadImage = async (file: File) => {
    try {
      // localStorage'dan admin auth kontrolü
      const adminAuth = localStorage.getItem('adminAuth')
      
      if (!adminAuth) {
        throw new Error('Admin girişi gerekli')
      }

      const adminData = JSON.parse(adminAuth)
      
      // Session süresi kontrolü (24 saat)
      const sessionAge = Date.now() - adminData.timestamp
      if (sessionAge > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('adminAuth')
        throw new Error('Oturum süresi dolmuş, lütfen yeniden giriş yapın')
      }

      console.log('Admin authenticated:', adminData.username)
      console.log('Uploading file:', file.name)
      
      // FormData oluştur
      const formData = new FormData()
      formData.append('file', file)
      
      // Server action'ı çağır
      const result = await uploadProductImage(formData)
      
      if (result.error) {
        throw new Error(result.error)
      }
      
      console.log('Upload successful:', result.url)
      return result.url
    } catch (error) {
      console.error('Upload process error:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Form validasyonu
      if (!formData.name.trim()) {
        toast.error("Ürün adı gereklidir")
        return
      }

      if (!formData.category_id) {
        toast.error("Kategori seçimi gereklidir")
        return
      }

      let image_url = product?.image_url || null

      // Yeni görsel yükle
      if (imageFile) {
        toast.loading("Görsel yükleniyor...")
        image_url = (await uploadImage(imageFile)) ?? null
        toast.dismiss()
      }

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        category_id: formData.category_id,
        image_url,
      }

      if (isEditMode) {
        // Güncelleme
        const result = await updateProduct(product.id, productData)
        
        if (result.error) {
          throw new Error(result.error)
        }

        toast.success("Ürün güncellendi")
      } else {
        // Yeni ekleme
        const result = await createProduct(productData)
        
        if (result.error) {
          throw new Error(result.error)
        }

        toast.success("Ürün eklendi")
      }

      router.push("/admin/urunler")
      router.refresh()
    } catch (error: unknown) {
      console.error('Form submission error:', error)
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
          href="/admin/urunler"
          className="inline-flex items-center justify-center w-10 h-10 rounded-md border hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditMode ? "Ürün Düzenle" : "Yeni Ürün"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditMode ? "Ürün bilgilerini güncelleyin" : "Yeni bir ürün ekleyin"}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Ürün Bilgileri</CardTitle>
          <CardDescription>
            Ürün detaylarını ve görselini ekleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ürün Adı */}
            <div className="space-y-2">
              <Label htmlFor="name">Ürün Adı *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Örn: Cappuccino Şurubu"
                required
              />
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Açıklama */}
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ürün açıklaması (isteğe bağlı)"
                rows={3}
              />
            </div>

            {/* Görsel */}
            <div className="space-y-2">
              <Label htmlFor="image">Ürün Görseli</Label>
              <div className="space-y-4">
                {/* Mevcut görsel önizlemesi */}
                {imagePreview && (
                  <div className="relative">
                    <div className="relative w-full max-w-md aspect-square rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={imagePreview}
                        alt="Ürün görseli"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Dosya seçimi */}
                <div className="flex items-center space-x-2">
                  <Input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="image-input"
                    className="inline-flex items-center justify-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {imagePreview ? "Görseli Değiştir" : "Görsel Seç"}
                  </Label>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  JPG, PNG, WebP veya GIF. Maksimum 5MB.
                </p>
              </div>
            </div>

            {/* Butonlar */}
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