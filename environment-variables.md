# 🔧 Environment Variables Rehberi

## 📋 Vercel'e Eklenecek Environment Variables

### Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Google Services (Domain sonrası)
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=google-verification-code
```

### Security
```bash
NEXT_PUBLIC_ADMIN_PASSWORD=güçlü-şifre-buraya
```

### Site Configuration
```bash
NEXT_PUBLIC_SITE_URL=https://www.adataha.com.tr
```

## 🎯 Supabase Bilgileri Nasıl Bulunur?

1. **Supabase Dashboard** → Project Settings
2. **API** sekmesi:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

## ⚠️ Güvenlik Notları

- `SUPABASE_SERVICE_ROLE_KEY` çok hassas, sadece Vercel'e
- `NEXT_PUBLIC_ADMIN_PASSWORD` güçlü olmalı
- Production'da farklı şifreler kullanın

## 🚀 Vercel'e Ekleme

1. Vercel Dashboard → Project
2. Settings → Environment Variables
3. Her bir değişken için "Add" butonuna tıklayın
4. Name ve Value girin
5. "Production" environment seçin
