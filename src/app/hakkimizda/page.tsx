// src/app/(public)/hakkimizda/page.tsx
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Award, Users, Package, TrendingUp, MapPin } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hakkımızda - Adataha Hikayesi",
  description: "Adataha'nın hikayesi, vizyonu ve misyonu. 2024'ten beri profesyonel cafe ve restaurant ürünleri alanında güvenilir çözümler sunuyoruz. Kaliteli şuruplar, püreler ve kahveler.",
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
      title: "Kalite Garantisi",
      description: "Tüm ürünlerimiz en yüksek kalite standartlarında üretilmektedir."
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
      {/* Hero Section */}
      
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-lg text-muted-foreground">
              Cafe ve restaurant sektörüne kaliteli ürünler sunan güvenilir iş ortağınız
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Story */}
            <div className="prose prose-lg max-w-none mb-16">
              <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
              <p className="text-muted-foreground mb-4">
                Adataha, cafe ve restaurant sektörüne yönelik kaliteli ürünler sunma vizyonuyla kurulmuştur. 
                5 yılı aşkın tecrübemizle, işletmelerin ihtiyaç duyduğu tüm ürünleri tek bir çatı altında topluyoruz.
              </p>
              <p className="text-muted-foreground mb-4">
                Şuruplardan kahvelere, pürelerden bar soslara kadar geniş ürün yelpazemizle, 
                müşterilerimizin işlerini kolaylaştırmayı ve onlara en kaliteli ürünleri sunmayı hedefliyoruz.
              </p>
              <p className="text-muted-foreground">
                Müşteri memnuniyetini ön planda tutarak, sürekli kendimizi geliştiriyor ve 
                sektördeki yenilikleri takip ediyoruz. Amacımız, iş ortaklarımızın başarısına katkıda bulunmak.
              </p>
            </div>

            {/* Location Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-6">İş Yerimiz</h2>
              <div className="bg-card rounded-2xl p-8 border">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Adres</h3>
                    <p className="text-muted-foreground">
                      İstiklal, 398. Sk. No:1 D:e<br />
                      54050 Serdivan/Sakarya
                    </p>
                  </div>
                </div>
                
                {/* Map Container */}
                <div className="w-full h-80 rounded-xl overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps?q=40.768869, 30.375568&hl=tr&z=16&output=embed"
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
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-12">Neden Adataha?</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="text-center group"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
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
      <section className="py-16 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Birlikte Çalışmaya Hazır mısınız?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            İşletmeniz için en uygun çözümleri bulmak ve kaliteli ürünlerimizle tanışmak için hemen iletişime geçin.
          </p>
          <a
            href="/iletisim"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
          >
            İletişime Geç
          </a>
        </div>
      </section>
      <Footer />
    </>
  )
}