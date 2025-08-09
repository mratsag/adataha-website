// src/app/iletisim/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim - Bizimle İletişime Geçin",
  description: "Adataha ile iletişime geçin. Profesyonel cafe ve restaurant ürünleri hakkında sorularınız için bizimle iletişime geçebilirsiniz. Telefon, email ve adres bilgileri.",
  keywords: ["adataha iletişim", "cafe ürünleri iletişim", "restaurant ürünleri iletişim", "telefon", "email", "adres"],
  openGraph: {
    title: "İletişim - Bizimle İletişime Geçin",
    description: "Adataha ile iletişime geçin. Profesyonel cafe ve restaurant ürünleri hakkında sorularınız için bizimle iletişime geçebilirsiniz.",
    url: "https://www.adataha.com.tr/iletisim",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
