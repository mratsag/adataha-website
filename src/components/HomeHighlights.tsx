import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Layers3, MessagesSquare, Coffee, Plus } from "lucide-react"

const reasons = [
  { icon: Layers3, title: "Bir menü, birçok seçenek", text: "Kahve, şurup, sos ve tatlı gruplarını aynı katalogda inceleyin. Menünüzü tamamlayan ürünleri bir arada keşfedin." },
  { icon: MessagesSquare, title: "Seçim yaparken yanınızdayız", text: "İşletmenizi ve aradığınız ürünleri bizimle paylaşın. Menünüze uygun seçenekleri birlikte değerlendirelim." },
  { icon: Coffee, title: "İşletmenize odaklanan bir portföy", text: "Cafe ve restaurant ihtiyaçlarına yönelik ürün gruplarıyla içecekten tatlıya menünüzü planlayın." },
]

const questions = [
  { question: "Nasıl sipariş verebilirim?", answer: "Katalogdan ilgilendiğiniz ürünleri seçip adlarını ve ihtiyaç duyduğunuz miktarları WhatsApp veya iletişim formu üzerinden bize iletebilirsiniz. Fiyat, stok ve sipariş detaylarını ekibimizle görüşebilirsiniz." },
  { question: "Ürün seçimi konusunda görüşebilir miyiz?", answer: "Evet. İşletmenizin türünü, menünüzü ve aradığınız ürün grubunu paylaşarak bizimle iletişime geçebilirsiniz. İhtiyacınıza uygun seçenekleri birlikte değerlendirelim." },
  { question: "Hangi bölgelere teslimat yapılıyor?", answer: "Teslimat bölgesi, yöntem ve süre bilgisi için işletmenizin bulunduğu il ve ilçeyi bize iletin. Siparişinizi netleştirmeden önce teslimat koşullarını ekibimizden öğrenebilirsiniz." },
  { question: "Minimum sipariş miktarı ve güncel fiyatlar nedir?", answer: "İlgilendiğiniz ürün ve miktarı bize ileterek güncel fiyat, stok ve varsa minimum sipariş koşullarını öğrenebilirsiniz." },
]

export default function HomeHighlights() {
  return (
    <>
      <section aria-labelledby="why-adataha" className="border-t border-border bg-background py-14 md:py-20">
        <div className="site-container">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Neden Adataha?</p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-10">
            <h2 id="why-adataha" className="text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[54px]">Menünüze değer katan,<br /><em className="font-serif font-normal text-brand-caramel">bir iş ortağı.</em></h2>
            <Link href="/hakkimizda" className="inline-flex items-center gap-3 self-start py-2 text-sm font-medium hover:text-brand-caramel md:self-auto">Adataha’yı tanıyın <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t border-border pt-6">
                <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-brand-caramel" strokeWidth={1.5} />
                <h3 className="mb-3 text-xl font-medium tracking-tight">{title}</h3>
                <p className="max-w-sm text-sm leading-7 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cawa-heading" className="border-y border-border bg-background">
        <div className="site-container grid items-center gap-8 py-14 md:grid-cols-2 md:gap-16 md:py-16">
          <div className="relative mx-auto h-[300px] w-full max-w-[360px] md:h-[390px]">
            <Image src="/images/cawa-package.webp" alt="Karamel tonlarında etiketli CAWA kahve paketi" fill sizes="(max-width: 767px) 320px, 360px" className="object-contain" />
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">CAWA · Kahveyle başlayan</p>
            <h2 id="cawa-heading" className="text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[54px]">Menünüzde kahveye,<br /><em className="font-serif font-normal text-brand-caramel">yer açın.</em></h2>
            <p className="mt-6 max-w-md text-sm leading-8 text-muted-foreground">Bir espresso, bir sütlü kahve, günün ilk fincanı… CAWA ile tanışın; işletmenizin kahve menüsü için aradığınız seçenekleri bizimle konuşun.</p>
            <Link href="/iletisim" className="mt-7 inline-flex items-center gap-4 border-b border-brand-caramel/40 pb-2 text-sm font-medium hover:text-brand-caramel">CAWA hakkında bilgi alın <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-background py-14 md:py-20">
        <div className="site-container grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-brand-caramel">Sık sorulan sorular</p>
            <h2 id="faq-heading" className="text-4xl font-medium leading-[1.16] tracking-[-0.05em] lg:text-[48px]">Aklınızdaki<br /><em className="font-serif font-normal text-brand-caramel">sorular.</em></h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">Ürünler ve sipariş süreci hakkında bize her zaman ulaşabilirsiniz.</p>
            <Link href="/iletisim" className="mt-5 inline-flex items-center gap-3 py-2 text-sm font-medium hover:text-brand-caramel">Bize sorun <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="border-t border-border">
            {questions.map(({ question, answer }) => (
              <details key={question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-medium [&::-webkit-details-marker]:hidden">
                  {question}<Plus aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-caramel group-open:rotate-45" />
                </summary>
                <p className="pb-6 pr-6 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
