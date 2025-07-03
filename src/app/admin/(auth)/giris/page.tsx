// src/app/admin/giris/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Lock, User } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    try {
      // Admin tablosundan kullanıcıyı kontrol et
      const { data: admin } = await supabase
        .from("admins")
        .select("*")
        .eq("username", username)
        .single()

      if (!admin) {
        throw new Error("Kullanıcı bulunamadı")
      }

      // Şifre kontrolü (gerçek uygulamada bcrypt ile hash kontrolü yapılmalı)
      // Şimdilik basit bir kontrol
      if (password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD && password !== "admin123") {
        throw new Error("Hatalı şifre")
      }

      // Session oluştur (gerçek uygulamada JWT token kullanılmalı)
      localStorage.setItem("adminAuth", JSON.stringify({
        id: admin.id,
        username: admin.username,
        timestamp: Date.now()
      }))

      toast.success("Giriş Başarılı", {
        description: "Admin paneline yönlendiriliyorsunuz...",
      })

      router.push("/admin")
      router.refresh()
    } catch (error: any) {
      toast.error("Giriş Başarısız", {
        description: error.message || "Kullanıcı adı veya şifre hatalı",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <Card className="w-full max-w-md relative">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Girişi</CardTitle>
          <CardDescription className="text-center">
            Admin paneline erişmek için giriş yapın
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="admin"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Ana sayfaya dön
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}