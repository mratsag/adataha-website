// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServerActionClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Zorunlu alanları kontrol et
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Zorunlu alanlar eksik" },
        { status: 400 }
      )
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçersiz email formatı" },
        { status: 400 }
      )
    }

    const supabase = await createServerActionClient()

    // Mesajı veritabanına kaydet
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || null,
          subject: subject.trim(),
          message: message.trim(),
        },
      ])
      .select()

    if (error) {
      console.error("Veritabanı hatası:", error)
      return NextResponse.json(
        { error: "Mesaj kaydedilemedi" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: "Mesajınız başarıyla gönderildi", 
        data: data[0] 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("API hatası:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = await createServerActionClient()

    // Tüm mesajları getir (en yeni en üstte)
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Veritabanı hatası:", error)
      return NextResponse.json(
        { error: "Mesajlar getirilemedi" },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error("API hatası:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
