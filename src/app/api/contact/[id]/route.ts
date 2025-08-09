// src/app/api/contact/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { createServerActionClient } from "@/lib/supabase/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: "Mesaj ID'si gerekli" },
        { status: 400 }
      )
    }

    const supabase = await createServerActionClient()

    // Mesajı sil
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Veritabanı hatası:", error)
      return NextResponse.json(
        { error: "Mesaj silinemedi" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: "Mesaj başarıyla silindi" },
      { status: 200 }
    )
  } catch (error) {
    console.error("API hatası:", error)
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    )
  }
}
