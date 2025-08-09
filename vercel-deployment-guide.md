# 🚀 Vercel Deployment Rehberi

## 📋 Domain Aldıktan Sonra Adımlar

### 1. Vercel Hesabı Açma
1. **vercel.com** → "Sign Up"
2. **GitHub ile giriş** yapın (önerilen)
3. **Hobby Plan** (ücretsiz) seçin

### 2. Proje Import Etme
```bash
# Vercel Dashboard'da:
1. "New Project" → "Import Git Repository"
2. GitHub: mratsag/adataha-website seçin
3. "Import" butonuna tıklayın
```

### 3. Environment Variables Ekleme
```bash
# Vercel Dashboard → Project Settings → Environment Variables

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_ADMIN_PASSWORD=güçlü-şifre
```

### 4. Build Settings (Otomatik)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### 5. Custom Domain Bağlama
```bash
# Vercel Dashboard → Project → Settings → Domains
1. "Add Domain" → "adataha.com.tr"
2. DNS kayıtlarını kopyalayın
3. Natro DNS'e ekleyin
```

### 6. DNS Ayarları (Natro'da)
```bash
# Natro DNS Yönetimi'nde:
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61 (Vercel IP)
```

## 🔧 Deployment Sonrası Kontroller

### ✅ Çalışma Kontrolü
- [ ] https://adataha.com.tr erişimi
- [ ] https://www.adataha.com.tr erişimi
- [ ] SSL sertifikası (yeşil kilit)
- [ ] Admin paneli (/admin/giris)
- [ ] İletişim formu
- [ ] Supabase bağlantısı

### 📊 SEO Kontrolleri
- [ ] /sitemap.xml erişimi
- [ ] /robots.txt erişimi
- [ ] Meta taglar görünümü
- [ ] Structured data test

## 🚨 Olası Sorunlar ve Çözümler

### Problem: DNS Propagation
**Çözüm:** 24-48 saat bekleyin, DNS'ler dünya çapında güncellenir

### Problem: SSL Sertifikası
**Çözüm:** Vercel otomatik Let's Encrypt sağlar, birkaç dakika bekleyin

### Problem: Environment Variables
**Çözüm:** Vercel Dashboard'dan tekrar kontrol edin

## 📞 Destek Kaynakları
- Vercel Docs: vercel.com/docs
- Natro Destek: natro.com/destek
- GitHub Repo: github.com/mratsag/adataha-website
