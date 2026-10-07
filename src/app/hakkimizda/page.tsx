// src/app/(public)/hakkimizda/page.tsx
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Award, Users, Package, TrendingUp, MapPin, ArrowRight } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Hakkımızda - Adataha Hikayesi",
  description: "Adataha'nın hikayesi, vizyonu ve misyonu. Cafe ve restaurantlar için kahve, şurup, püre ve tamamlayıcı ürünleri bir araya getiriyoruz.",
  keywords: ["adataha hakkında", "şirket hikayesi", "cafe ürünleri tedarikçisi", "restaurant ürünleri", "kalite", "vizyon", "misyon"],
  openGraph: {
    title: "Hakkımızda - Adataha Hikayesi",
    description: "Adataha'nın hikayesi, vizyonu ve misyonu. Profesyonel cafe ve restaurant ürünleri alanında güvenilir çözümler.",
    url: "https://www.adataha.com.tr/hakkimizda",
  },
}


export default function AboutPage() {
  const features = [
    {
      icon: Award,
      title: "Özenli Ürün Seçimi",
      description: "Menünüzü tamamlayan ürünleri bir araya getirmeye önem veriyoruz."
    },
    {
      icon: Users,
      title: "Müşteri Odaklı",
      description: "Müşteri memnuniyeti bizim için her zaman önceliklidir."
    },
    {
      icon: Package,
      title: "Geniş Ürün Yelpazesi",
      description: "Cafe ve restaurantlar için ihtiyaç duyulan tüm ürünler."
    },
    {
      icon: TrendingUp,
      title: "Sürekli Gelişim",
      description: "Kendimizi ve ürünlerimizi sürekli geliştiriyoruz."
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-16 md:pt-20">
      {/* Hero Section */}
      
      <section className="border-b border-border py-12 md:py-16">
        
        <div className="site-container grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-caramel"><span className="h-px w-8 bg-brand-caramel" /> Hakkımızda</p>
            <h1 className="mb-6 text-5xl font-medium leading-[1.08] tracking-[-0.045em] lg:text-[68px]">
              Güzel lezzetlerin<br /><em className="font-serif font-normal text-brand-caramel">arkasındayız.</em>
            </h1>
            <p className="max-w-md text-sm leading-8 text-muted-foreground md:text-base">
              Kahveden şuruba, ilk yudumdan son dokunuşa. Cafe ve restaurantların ihtiyaçlarını aynı portföyde buluşturuyoruz.
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[430px]">
            <Image src="/images/cawa-portfolio.webp" alt="Adataha ürün portföyünden CAWA, DaVinci Gourmet ve Caffe Nonno ürünleri" fill sizes="(max-width: 767px) 340px, 430px" className="object-contain" priority />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-14 md:py-20">
        <div className="site-container">
          <div>
            {/* Story */}
            <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
              <div><p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Hikayemiz</p><h2 className="text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[48px]">Menünüze eşlik eden,<br /><em className="font-serif font-normal text-brand-caramel">bir yolculuk.</em></h2></div>
              <div className="space-y-4 text-sm leading-8 text-muted-foreground">
              <p>
                Adataha, cafe ve restaurant sektörüne yönelik kaliteli ürünler sunma vizyonuyla kurulmuştur. 
                5 yılı aşkın tecrübemizle, işletmelerin ihtiyaç duyduğu tüm ürünleri tek bir çatı altında topluyoruz.
              </p>
              <p>
                Şuruplardan kahvelere, pürelerden bar soslara kadar geniş ürün yelpazemizle, 
                müşterilerimizin işlerini kolaylaştırmayı ve onlara en kaliteli ürünleri sunmayı hedefliyoruz.
              </p>
              <p>
                Müşteri memnuniyetini ön planda tutarak, sürekli kendimizi geliştiriyor ve 
                sektördeki yenilikleri takip ediyoruz. Amacımız, iş ortaklarımızın başarısına katkıda bulunmak.
              </p>
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-14 grid gap-8 border-y border-border py-10 md:mb-20 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-12">
              <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Bizi ziyaret edin</p>
              <h2 className="mb-6 text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[48px]">Sakarya’da,<br /><em className="font-serif font-normal text-brand-caramel">bir aradayız.</em></h2>
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                      <MapPin aria-hidden="true" className="h-4 w-4 text-brand-caramel" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xs font-medium text-muted-foreground">Adres</h3>
                    <p className="text-sm leading-7">
                      İstiklal, 398. Sk. No:1 D:e<br />
                      54050 Serdivan/Sakarya
                    </p>
                  </div>
                </div>
                <Link href="/iletisim" className="inline-flex items-center gap-3 py-2 text-sm font-medium hover:text-brand-caramel">Ziyaret öncesi bize ulaşın <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              </div>
                
                {/* Map Container */}
                <div className="h-72 w-full overflow-hidden rounded-2xl border border-border md:h-80">
                  <iframe
                    src="https://www.google.com/maps?q=loc%3A40.768869%2C30.375568&hl=tr&t=m&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Adataha İş Yeri Konumu"
                  />
                </div>
            </div>

            {/* Features */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Yaklaşımımız</p>
              <h2 className="mb-10 text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[48px]">İşimizin merkezinde,<br /><em className="font-serif font-normal text-brand-caramel">sizin işletmeniz.</em></h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="border-t border-border pt-6"
                  >
                    <div className="mb-5 text-brand-caramel">
                      <feature.icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-3 text-lg font-medium">{feature.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-14 md:py-20">
        <div className="site-container flex flex-col justify-between gap-8 md:flex-row md:items-center md:gap-12">
          <div><h2 className="mb-4 text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[48px]">
            Sıradaki güzel lezzeti,<br /><em className="font-serif font-normal text-brand-caramel">birlikte seçelim.</em>
          </h2>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            İşletmeniz için en uygun çözümleri bulmak ve kaliteli ürünlerimizle tanışmak için hemen iletişime geçin.
          </p>
          </div><Link
            href="/iletisim"
            className="inline-flex shrink-0 items-center gap-5 self-start rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:self-auto"
          >
            Bizimle iletişime geçin <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
