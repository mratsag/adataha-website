# 🌟 Adataha Website

**Profesyonel Cafe & Restaurant Ürünleri** için modern ve kullanıcı dostu web sitesi.

## 🚀 Canlı Site
**🌐 [www.adataha.com.tr](https://www.adataha.com.tr)**

---

## 📋 Proje Özeti

Adataha, Türkiye'nin önde gelen cafe ve restaurant ürünleri tedarikçisi için geliştirilmiş modern bir web sitesidir. Şuruplar, püreler, kahveler ve profesyonel mutfak ürünleri katalogunu içerir.

### ✨ Özellikler

#### 🎯 Frontend
- **Modern UI/UX:** Responsive tasarım, Tailwind CSS
- **Dinamik Katalog:** Kategori ve ürün sayfaları
- **İletişim Formu:** Veritabanı entegrasyonlu mesajlaşma
- **WhatsApp Entegrasyonu:** Hızlı iletişim butonu
- **Sosyal Medya:** Instagram bağlantısı

#### 🔧 Admin Panel  
- **Güvenli Giriş:** Bcrypt şifreli admin sistemi
- **Ürün Yönetimi:** CRUD işlemleri
- **Kategori Yönetimi:** Dinamik kategori sistemi
- **Mesaj Yönetimi:** İletişim formundan gelen mesajlar
- **Şifre Değiştirme:** Güvenli şifre güncelleme

#### 📊 SEO & Analytics
- **Google Analytics:** G-6NH2X5GNGG
- **Google Search Console:** Sitemap ve URL monitoring
- **Structured Data:** Organization ve Product schemas
- **Meta Tags:** Dinamik SEO optimizasyonu
- **Sitemap:** Otomatik XML sitemap oluşturma

## 🛠️ Teknoloji Stack

### **Frontend**
- **Framework:** Next.js 15.3.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Shadcn/ui
- **Icons:** Lucide React

### **Backend**
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Custom admin system
- **API:** Next.js API Routes
- **File Storage:** Supabase Storage

### **Deployment**
- **Hosting:** Vercel
- **Domain:** Natro (www.adataha.com.tr)
- **SSL:** Let's Encrypt (otomatik)
- **CI/CD:** GitHub Actions (Vercel integration)

## 🚀 Development

### Gereksinimler
- Node.js 18+
- npm/yarn/pnpm
- Git


### 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin panel
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── ui/                # UI components (Shadcn)
│   └── layout/            # Layout components
├── lib/                   # Utilities
│   └── supabase/          # Supabase config
└── types/                 # TypeScript types
```

### 🔧 Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password

# Analytics
NEXT_PUBLIC_GA_ID=G-6NH2X5GNGG
```

## 📊 Database Schema

### Tables
- **categories:** Ürün kategorileri
- **products:** Ürün bilgileri
- **contact_messages:** İletişim form mesajları
- **admins:** Admin kullanıcı bilgileri
- **admin_password_changes:** Şifre değişiklik logları

## 🔗 Önemli Linkler

- **Ana Site:** [www.adataha.com.tr](https://www.adataha.com.tr)
- **Admin Panel:** [www.adataha.com.tr/admin/giris](https://www.adataha.com.tr/admin/giris)
- **GitHub:** [github.com/mratsag/adataha-website](https://github.com/mratsag/adataha-website)
- **Vercel:** [vercel.com/dashboard](https://vercel.com/dashboard)

## 📞 İletişim

- **WhatsApp:** +90 532 565 96 67
- **Instagram:** [@adatahagidakahve](https://www.instagram.com/adatahagidakahve)
- **E-mail:** İletişim formu üzerinden

---

## 📄 Lisans

Bu proje [MIT License](LICENSE) altında lisanslanmıştır.

---

**🎉 Proje durumu:** ✅ Canlıda ve tamamen çalışır durumda!
