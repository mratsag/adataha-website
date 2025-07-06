// src/components/layout/Footer.tsx
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Adataha
            </h3>
            <p className="text-sm text-muted-foreground">
              Cafe ve restaurantlar için kaliteli ürünler sunan güvenilir partneriniz.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
              >
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
              >
                <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors group"
              >
                <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Hızlı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  İletişim
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/giris"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Girişi
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold">Kategoriler</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kategori/suruplar"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Şuruplar
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/kahveler"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Kahveler
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/pureler"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Püreler
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/bar-soslar"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Bar Soslar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Sakarya, Türkiye
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="tel:+903121234567"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +90 312 123 45 67
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:info@adataha.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@adataha.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Adataha. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}