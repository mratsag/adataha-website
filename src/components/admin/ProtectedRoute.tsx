// src/components/admin/ProtectedRoute.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem("adminAuth")
      
      if (!authData) {
        router.push("/admin/giris")
        return
      }

      try {
        const auth = JSON.parse(authData)
        // Basit bir zaman kontrolü (24 saat)
        const isExpired = Date.now() - auth.timestamp > 24 * 60 * 60 * 1000
        
        if (isExpired) {
          localStorage.removeItem("adminAuth")
          router.push("/admin/giris")
          return
        }

        setIsAuthenticated(true)
      } catch {
        router.push("/admin/giris")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}