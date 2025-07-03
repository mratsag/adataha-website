// src/app/admin/layout.tsx
"use client"

import AdminNav from "@/components/admin/AdminNav"
import ProtectedRoute from "@/components/admin/ProtectedRoute"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}