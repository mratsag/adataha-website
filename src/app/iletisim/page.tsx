// src/app/(public)/iletisim/page.tsx
"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Form verilerini al
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    // Burada normalde API'ye istek atılır
    // Şimdilik sadece bir simülasyon yapıyoruz
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success("Mesajınız Gönderildi!", {
      description: "En kısa sürede size dönüş yapacağız.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "+90 312 123 45 67",
      link: "tel:+903121234567"
    },
    {
      icon: Mail,
      title: "E-posta",
      content: "info@adataha.com",
      link: "mailto:info@adataha.com"
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-primary/5 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              İletişime Geçin
            </h1>
            <p className="text-lg text-muted-foreground">
              Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border p-8 md:p-10">
                <h2 className="text-2xl font-bold mb-6">Mesaj Gönderin</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Adınız Soyadınız *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Adınızı girin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
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
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      "Gönderiliyor..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Mesaj Gönder
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
              
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map or Additional Info */}
              <div className="mt-8 p-6 bg-muted/30 rounded-xl">
                <h3 className="font-semibold mb-3">Hızlı İletişim</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Acil durumlar için WhatsApp hattımızdan bize ulaşabilirsiniz.
                </p>
                <Button variant="outline" className="w-full">
                  WhatsApp ile İletişime Geç
                </Button>
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