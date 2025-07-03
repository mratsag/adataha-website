// src/app/(public)/hakkimizda/page.tsx
import { Award, Users, Package, TrendingUp } from "lucide-react"

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
                10 yılı aşkın tecrübemizle, işletmelerin ihtiyaç duyduğu tüm ürünleri tek bir çatı altında topluyoruz.
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

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card rounded-2xl p-8 border">
                <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
                <p className="text-muted-foreground">
                  Cafe ve restaurant sektöründeki işletmelere, kaliteli ve güvenilir ürünler sunarak, 
                  onların müşterilerine en iyi hizmeti vermelerine yardımcı olmak.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 border">
                <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
                <p className="text-muted-foreground">
                  Türkiye'nin önde gelen cafe ve restaurant tedarikçisi olarak, 
                  sektörde kalite ve güvenin simgesi olmak.
                </p>
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
    </>
  )
}

