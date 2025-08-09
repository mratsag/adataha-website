// src/app/api/admin/change-password/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServerActionClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword, adminId } = body

    // Zorunlu alanları kontrol et
    if (!currentPassword || !newPassword || !adminId) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      )
    }

    // Şifre uzunluğunu kontrol et
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Yeni şifre en az 6 karakter olmalıdır" },
        { status: 400 }
      )
    }

    // Mevcut şifre ile yeni şifre aynı olmasın
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "Yeni şifre mevcut şifre ile aynı olamaz" },
        { status: 400 }
      )
    }

    const supabase = await createServerActionClient()

    // Admin kullanıcısını getir
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id, username, password_hash")
      .eq("id", adminId)
      .single()

    if (adminError || !admin) {
      return NextResponse.json(
        { error: "Admin kullanıcısı bulunamadı" },
        { status: 404 }
      )
    }

    // Mevcut şifreyi kontrol et
    let isCurrentPasswordValid = false
    
    if (admin.password_hash) {
      // Hash'li şifre varsa bcrypt ile kontrol et
      isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password_hash)
    } else {
      // Hash yoksa plain text kontrol et (geçici çözüm)
      const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      isCurrentPasswordValid = currentPassword === "admin123" || 
                               currentPassword === envPassword
    }
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Mevcut şifre yanlış" },
        { status: 400 }
      )
    }

    // Yeni şifreyi hash'le
    const saltRounds = 12
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

    // Şifreyi güncelle
    const { error: updateError } = await supabase
      .from("admins")
      .update({
        password_hash: newPasswordHash,
        password_changed_at: new Date().toISOString(),
        force_password_change: false
      })
      .eq("id", adminId)

    if (updateError) {
      console.error("Şifre güncelleme hatası:", updateError)
      return NextResponse.json(
        { error: "Şifre güncellenirken hata oluştu" },
        { status: 500 }
      )
    }

    // Şifre değiştirme geçmişine ekle
    const userAgent = request.headers.get("user-agent") || "Unknown"
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : realIp || "unknown"

    await supabase
      .from("admin_password_changes")
      .insert([
        {
          admin_id: adminId,
          ip_address: ipAddress,
          user_agent: userAgent
        }
      ])

    return NextResponse.json(
      { 
        message: "Şifre başarıyla değiştirildi",
        changedAt: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Şifre değiştirme API hatası:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
