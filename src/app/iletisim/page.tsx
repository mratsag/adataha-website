// src/app/(public)/iletisim/page.tsx
"use client"

import { useState, useRef } from "react"
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Form verilerini al
      const formData = new FormData(e.currentTarget)
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      }

      // API'ye istek at
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Bir hata oluştu")
      }

      toast.success("Mesajınız Gönderildi!", {
        description: "En kısa sürede size dönüş yapacağız.",
      })

      // Formu güvenli bir şekilde sıfırla
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      toast.error("Hata!", {
        description: error instanceof Error ? error.message : "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+90 276 5466 0264",
      link: "tel:+9027654660264"
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "adatahagida@hotmail.com",
      link: "mailto:adatahagida@hotmail.com"
    },
    {
      icon: MapPin,
      title: "Adres",
      content: "Sakarya, Türkiye",
      link: null
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      content: "Pazartesi - Cuma: 09:00 - 20:00",
      link: null
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Hero Section */}
      <section className="bg-background pb-10 pt-12 md:pb-12 md:pt-16">
        
        <div className="site-container">
          <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-caramel"><span className="h-px w-8 bg-brand-caramel" /> İletişim</p>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
            <h1 className="text-5xl font-medium leading-[1.08] tracking-[-0.045em] lg:text-[68px]">
              Birlikte güzel<br /><em className="font-serif font-normal text-brand-caramel">bir başlangıç.</em>
            </h1>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              İşletmenizi, menünüzü ve aradığınız ürünleri bize anlatın. İhtiyacınıza uygun seçenekleri birlikte değerlendirelim.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section aria-label="Bize ulaşın" className="bg-background pb-16 md:pb-24">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* Contact Form */}
            <div className="min-w-0 lg:order-2">
              <div className="rounded-[24px] border border-border bg-card p-5 sm:p-8 md:p-10">
                <h2 className="mb-2 text-2xl font-medium tracking-tight">Sizi dinliyoruz.</h2>
                <p className="mb-7 text-sm leading-6 text-muted-foreground">Sorularınızı ve ürün taleplerinizi aşağıdaki formdan iletin.</p>
                
                <form ref={formRef} onSubmit={handleSubmit} aria-busy={isSubmitting} className="space-y-5 [&_input]:h-12 [&_input]:rounded-xl [&_input]:shadow-none [&_label]:text-xs [&_label]:font-medium">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Adınız Soyadınız *</Label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Adınızı girin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        type="email"
                        required
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        type="tel"
                        placeholder="+90 5XX XXX XX XX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Konu *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        placeholder="Mesajınızın konusu"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajınız *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Mesajınızı buraya yazın..."
                      className="min-h-[150px] resize-y rounded-xl shadow-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-full px-6 text-sm sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Gönderiliyor..."
                    ) : (
                      <>
                        Mesajı gönder <ArrowRight aria-hidden="true" className="ml-3 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">* işaretli alanların doldurulması gerekir.</p>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="min-w-0 border-t border-border pt-7 lg:order-1">
              <h2 className="mb-7 text-2xl font-medium tracking-tight">Bir mesaj kadar yakınız.</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                      <item.icon aria-hidden="true" className="h-4 w-4 text-brand-caramel" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="break-words text-sm leading-6 transition-colors hover:text-brand-caramel"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-sm leading-6">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
              </div>

              {/* Map or Additional Info */}
              <div className="mt-8 rounded-2xl border border-border p-6">
                <MessageCircle aria-hidden="true" className="mb-4 h-6 w-6 text-brand-caramel" strokeWidth={1.5} />
                <h3 className="mb-2 text-lg font-medium">Sohbet ederek başlayalım.</h3>
                <p className="mb-5 text-sm leading-7 text-muted-foreground">
                  Ürünler hakkında bilgi almak için WhatsApp üzerinden de bize yazabilirsiniz.
                </p>
                <a href="https://wa.me/905325659667?text=Merhaba%2C%20Adataha%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-sm font-medium hover:text-brand-caramel">
                  WhatsApp’tan yazın <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  )
}
