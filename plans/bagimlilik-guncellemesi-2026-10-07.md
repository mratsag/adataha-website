# Bağımlılık güncellemesi — 7 Ekim 2026

Doğrudan paketler npm registry kararlı latest etiketleriyle karşılaştırılarak güncellendi; sürümler package.json ve package-lock.json içinde sabitlendi.

- Next.js 16.4.0, React / React DOM 19.3.0.
- Tailwind / PostCSS 4.3.3, Supabase JS 2.117.2, SSR 0.12.7, Zod 4.6.5.
- TypeScript 7.0.2 `@typescript/native` npm aliası üzerinden `tsc` sağlar. ESLint ve Next programatik API için `typescript` aliası `@typescript/typescript6` 6.0.2 sağlar. Microsoft'un resmî birlikte kullanım düzenidir: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0
- Uyumluluk istisnası: ESLint 10.12.0 denenince Next lint zincirindeki eslint-plugin-import 2.32.0 ve eslint-plugin-jsx-a11y 6.10.2 peer desteğinin ESLint 9 ile sınırlı olduğu görüldü. Geçici olarak en son 9.x olan 9.39.5 kullanılıyor. Bu sürüm artık destek dışı; eklentiler ESLint 10 desteği yayımladığında güncellenmeli.
- bcryptjs kendi tiplerini sağladığı için gereksiz @types/bcryptjs kaldırıldı. Kullanılmayan FlatCompat bağımlılığı kaldırıldı.
- Next 16 flat ESLint yapılandırması ve `eslint .` komutu kullanılıyor; oluşturulan çıktılar ignore edilir.
- middleware.ts → proxy.ts: aynı matcher ve updateSession çağrısı korundu.
- Lucide marka ikonlarını kaldırdığından Instagram görseli aynı biçimde yerel SVG olarak korundu.
- Yeni lint kuralı için kategori yükleme başlangıç state'i kullanıcı olayına taşındı; ilk mesaj yükleme iptal edilebilir async callback kullanıyor. API/veritabanı işlemleri değiştirilmedi.

## Kontroller

- npm run lint: geçti.
- npx tsc --noEmit: geçti.
- npm run build: geçti; tüm mevcut route'lar üretildi.
- Next 16.4 geliştirme sunucusu 127.0.0.1:5773 üzerinde yeniden başlatıldı.
- Ana sayfa, kahveler kategorisi, gerçek bir ürün detay sayfası, iletişim ve yönetici giriş sayfası: HTTP 200.
- İletişim ve şifre değişikliği API'lerine boş geçersiz payload: beklenen HTTP 400; kayıt veya şifre değiştirilmedi.
- Başarılı yönetici oturumu veya gerçek mesaj gönderimi denenmedi.
- npm audit --omit=dev: 0 bulgu.
- Tam audit: geliştirme araçlarında braces → micromatch → fast-glob → Next ESLint zincirinde 5 high bulgu sürüyor. Güncel zincir için yama yok; audit'in önerdiği Next lint config 14'e geri dönüş yapılmadı. Force veya legacy-peer-deps kullanılmadı.

Güncelleme yerel çalışmadır; commit, push veya dağıtım yapılmadı.
