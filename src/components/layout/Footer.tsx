// src/components/layout/Footer.tsx
import Link from "next/link"
import BrandLogo from "@/components/BrandLogo"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="site-container pb-6 pt-10 md:pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10 [&_h4]:text-xs [&_h4]:font-semibold [&_li]:text-xs [&_li_a]:text-xs">
          {/* Company Info */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex">
              <BrandLogo />
            </Link>
            <p className="max-w-[230px] text-xs leading-6 text-muted-foreground">
              Cafe ve restaurantlar için kaliteli ürünler sunan güvenilir partneriniz.
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://www.instagram.com/adatahagidakahve"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Adataha Instagram"
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:border-brand-caramel"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
                </svg>
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
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <h4 className="font-semibold">İletişim</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">
                  Sakarya, Türkiye
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>
                    <a
                      href="tel:+902765466264"
                      className="hover:text-primary transition-colors"
                    >
                      İş: 0276 546 62 64
                    </a>
                  </div>
                  <div>
                    <a
                      href="tel:+905325659667"
                      className="hover:text-primary transition-colors"
                    >
                      Tel: 0532 565 96 67
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <a
                  href="mailto:adatahagida@hotmail.com"
                  className="break-all text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  adatahagida@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-5">
          <p className="text-[10px] text-muted-foreground">
            © {currentYear} Adataha. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
