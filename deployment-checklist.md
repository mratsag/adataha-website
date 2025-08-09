# 🚀 Adataha Deployment Checklist

## 📋 Domain Almadan Önce Hazırlık

### ✅ Tamamlanan
- [x] SEO optimizasyonu
- [x] Sitemap yapılandırması
- [x] Robots.txt
- [x] Meta taglar ve structured data
- [x] Admin panel
- [x] İletişim formu
- [x] Responsive tasarım

### 🔄 Domain Sonrası Yapılacaklar

#### 1. Environment Variables (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Analytics (domain aldıktan sonra)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Admin Password (güvenlik için)
NEXT_PUBLIC_ADMIN_PASSWORD=güçlü-şifre
```

#### 2. Google Services Setup
- [ ] Google Analytics hesabı aç
- [ ] Google Search Console kayıt
- [ ] Google Tag Manager (opsiyonel)

#### 3. Deployment Seçenekleri

**Vercel (Önerilen):**
1. GitHub'a kod push
2. Vercel'e import
3. Environment variables ekle
4. Custom domain bağla

**Netlify:**
1. GitHub repo bağla
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Environment variables

#### 4. Domain Bağlantısı
```
A Record: @ -> Hosting IP
CNAME: www -> hosting-url
```

#### 5. SSL Sertifikası
- [ ] Let's Encrypt (ücretsiz)
- [ ] Hosting sağlayıcısı SSL

#### 6. Testing Checklist
- [ ] Ana sayfa yüklenmesi
- [ ] Admin girişi
- [ ] İletişim formu
- [ ] Kategori/ürün sayfaları
- [ ] Mobile responsiveness
- [ ] Sitemap erişimi (/sitemap.xml)
- [ ] Robots.txt (/robots.txt)

## 🔧 Post-Launch

#### 1. Google Search Console
```
1. Domain doğrulama (DNS TXT)
2. Sitemap submit
3. URL inspection
4. Performance monitoring
```

#### 2. Analytics Setup
```
1. GA4 tracking code
2. Conversion goals
3. E-commerce tracking (gelecekte)
```

#### 3. Monitoring
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Error tracking (Sentry)

## 📞 Support Contacts
- Domain: [Sağlayıcı support]
- Hosting: [Hosting support]  
- Development: [Your contact]
