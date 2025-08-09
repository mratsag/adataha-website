 // src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script"

import WhatsAppButton from "@/components/WhatsAppButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Adataha - Profesyonel Cafe & Restaurant Ürünleri | Şurup, Püre, Kahve",
    template: "%s | Adataha"
  },
  description: "Türkiye'nin önde gelen cafe ve restaurant ürünleri tedarikçisi. Kaliteli şuruplar, püreler, kahveler ve daha fazlası. Profesyonel işletmeler için güvenilir çözümler.",
  keywords: ["cafe ürünleri", "restaurant ürünleri", "şurup", "püre", "kahve", "adataha", "profesyonel mutfak", "içecek ürünleri", "cafe tedarik", "restaurant tedarik"],
  authors: [{ name: "Adataha" }],
  creator: "Adataha",
  publisher: "Adataha",
  metadataBase: new URL("https://www.adataha.com.tr"),
  alternates: {
    canonical: "https://www.adataha.com.tr",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.adataha.com.tr",
    siteName: "Adataha",
    title: "Adataha - Profesyonel Cafe & Restaurant Ürünleri",
    description: "Türkiye'nin önde gelen cafe ve restaurant ürünleri tedarikçisi. Kaliteli şuruplar, püreler, kahveler ve daha fazlası.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Adataha - Profesyonel Cafe & Restaurant Ürünleri",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adataha - Profesyonel Cafe & Restaurant Ürünleri",
    description: "Türkiye'nin önde gelen cafe ve restaurant ürünleri tedarikçisi. Kaliteli şuruplar, püreler, kahveler ve daha fazlası.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "k3PwFDJphRTdT4xft1_oeyIsxfKYkP3QBRToGiRHPV8", // Google Search Console doğrulaması
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <WhatsAppButton />
          <Toaster />
        </ThemeProvider>
        
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-6NH2X5GNGG"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6NH2X5GNGG');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}