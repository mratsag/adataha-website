// src/app/admin/(protected)/sifre-degistir/page.tsx
import ChangePasswordForm from "@/components/admin/ChangePasswordForm"

export default function ChangePasswordPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Şifre Değiştir</h1>
        <p className="text-muted-foreground">
          Hesabınızın güvenliği için düzenli olarak şifrenizi değiştirin.
        </p>
      </div>
      
      <ChangePasswordForm />
    </div>
  )
}
