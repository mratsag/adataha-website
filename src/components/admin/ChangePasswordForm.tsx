// src/components/admin/ChangePasswordForm.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Shield, CheckCircle, X } from "lucide-react"

export default function ChangePasswordForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ""
  })

  const checkPasswordStrength = (password: string) => {
    let score = 0
    let feedback = ""

    if (password.length >= 8) score += 1
    if (password.match(/[a-z]/)) score += 1
    if (password.match(/[A-Z]/)) score += 1
    if (password.match(/[0-9]/)) score += 1
    if (password.match(/[^a-zA-Z0-9]/)) score += 1

    switch (score) {
      case 0:
      case 1:
        feedback = "Çok zayıf"
        break
      case 2:
        feedback = "Zayıf"
        break
      case 3:
        feedback = "Orta"
        break
      case 4:
        feedback = "Güçlü"
        break
      case 5:
        feedback = "Çok güçlü"
        break
    }

    setPasswordStrength({ score, feedback })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (field === "newPassword") {
      checkPasswordStrength(value)
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor!")
      return
    }

    if (formData.newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalıdır!")
      return
    }

    if (passwordStrength.score < 3) {
      toast.error("Şifre çok zayıf! Daha güçlü bir şifre seçin.")
      return
    }

    setIsLoading(true)

    try {
      // Admin ID'sini localStorage'dan al
      const adminAuth = localStorage.getItem("adminAuth")
      if (!adminAuth) {
        toast.error("Oturum bulunamadı!")
        router.push("/admin/giris")
        return
      }

      const adminData = JSON.parse(adminAuth)
      
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          adminId: adminData.id
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu")
      }

      toast.success("Şifre başarıyla değiştirildi!", {
        description: "Yeni şifreniz ile güvenle devam edebilirsiniz.",
      })

      // Formu temizle
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
      
      setPasswordStrength({ score: 0, feedback: "" })

    } catch (error) {
      console.error("Şifre değiştirme hatası:", error)
      toast.error("Hata!", {
        description: error instanceof Error ? error.message : "Şifre değiştirilemedi.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "bg-red-500"
      case 2:
        return "bg-orange-500"
      case 3:
        return "bg-yellow-500"
      case 4:
        return "bg-blue-500"
      case 5:
        return "bg-green-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Şifre Değiştir</CardTitle>
        </div>
        <CardDescription>
          Güvenlik için güçlü bir şifre seçin ve düzenli olarak değiştirin.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mevcut Şifre */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mevcut Şifre *</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                placeholder="Mevcut şifrenizi girin"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Yeni Şifre */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">Yeni Şifre *</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="Yeni şifrenizi girin"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* Şifre Gücü Göstergesi */}
            {formData.newPassword && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>Şifre Gücü:</span>
                  <span className={`font-medium ${
                    passwordStrength.score >= 4 ? "text-green-600" :
                    passwordStrength.score >= 3 ? "text-yellow-600" :
                    "text-red-600"
                  }`}>
                    {passwordStrength.feedback}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  En az 8 karakter, büyük/küçük harf, rakam ve özel karakter kullanın
                </div>
              </div>
            )}
          </div>

          {/* Şifre Onayı */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Yeni Şifre Onayı *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Yeni şifrenizi tekrar girin"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            {/* Şifre Eşleşme Kontrolü */}
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 text-sm">
                {formData.newPassword === formData.confirmPassword ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Şifreler eşleşiyor</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-600" />
                    <span className="text-red-600">Şifreler eşleşmiyor</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Güvenlik Uyarısı */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm">
                <div className="font-medium mb-1">Güvenlik İpuçları:</div>
                <ul className="text-muted-foreground space-y-1">
                  <li>• En az 8 karakter uzunluğunda olmalı</li>
                  <li>• Büyük ve küçük harfler içermeli</li>
                  <li>• En az bir rakam ve özel karakter içermeli</li>
                  <li>• Kişisel bilgilerinizi içermemeli</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isLoading || passwordStrength.score < 3}
              className="flex-1"
            >
              {isLoading ? "Değiştiriliyor..." : "Şifreyi Değiştir"}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              İptal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
