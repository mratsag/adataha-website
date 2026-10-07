# Adataha tasarım yenileme yol haritası

Tarih: 7 Ekim 2026. Durum: yol haritası; logo, favicon ve marka renkleri uygulandı. Sayfaların kapsamlı yeniden tasarımı henüz başlamadı.

## Seçilen ve uygulanan marka kimliği

- Logo: Bağ, birbirini tamamlayan iki geometrik form ve adataha yazısı.
- Renk uygulaması: Karamel; espresso #3D2A24 + karamel #AD7045, kum zemin #F7F0E5.
- Favicon: espresso zemin üzerinde kum renginde Bağ simgesi; SVG, 16/32 PNG, 180 PNG ve 16/32/48 ICO sürümleri.
- Logo site üst/alt menüsüne, admin navigasyonuna ve giriş ekranına uygulandı. Açık/koyu tema renkleri ve kategori vurguları yenilendi.
- Yerel çalışma portu: 5773. Eski yayındaki tarayıcıya açık Supabase bağlantısı, Git tarafından yok sayılan .env.local dosyasına geri alındı. Özel yönetim anahtarları geri alınmış sayılmaz.
- Veritabanı, sorgular, API, kimlik doğrulama ve mevcut URL'ler değiştirilmedi.

## Hedef ve kesin kapsam

Kullanıcı sitenin tasarımını baştan sona yenilemek istiyor; arka planda çalışan sistemi değiştirmek istemiyor. Marka renkleri ve logo seçildi; sayfa yerleşimleri sonraki aşamalarda belirlenecek. Mevcut katalog ve iletişim modeli korunarak markaya özgü, tutarlı ve mobilde rahat kullanılan bir arayüz oluşturulacak.

Veritabanı, Supabase sorguları, API sözleşmeleri, kimlik doğrulama, yetkiler, ürün/kategori işlemleri ve mevcut URL'ler değişmeyecek. Yeni arama/filtre, sepet, ödeme veya teklif sistemi eklenmeyecek. Paket/sürüm yükseltmesi bu tasarım kapsamına dahil değil. Mevcut teknik engeller görülürse ayrı raporlanacak; kapsam sessizce genişletilmeyecek.

Ziyaretçi tarafında ana sayfa, kategori/alt kategori, ürün, hakkımızda, iletişim, üst/alt menü, mobil menü ve WhatsApp düğmesi kapsanıyor. Admin işlevleri korunacak. Admin ekranlarının görsel yenilenmesi ayrı isteğe bağlı devam işi; kullanıcının ziyaretçi sitesi dışında admin görünümünü de değiştirmek isteyip istemediği henüz net değil.

## İncelemenin dayanağı

- package.json: Next.js 15.3.4, React 19, TypeScript, Tailwind 4, Radix ve Supabase mevcut. Tasarım aynı projede uygulanabilir.
- src/app/page.tsx: metin ağırlıklı giriş, sabit istatistikler, kategori listesi ve iletişim çağrısı. İlk ekranda ürün/kullanım fotoğrafı yok.
- src/components/layout/Header.tsx: ana sayfa, hakkımızda ve iletişim bağlantıları; mobil menü ve tema değiştirici var.
- src/components/category/CategoryCard.tsx: kategori görünümü emoji ve renk geçişlerine dayanıyor.
- src/app/kategori/[slug]/page.tsx ve src/app/urun/[id]/page.tsx: kategori/alt kategori, ürün listesi, ürün görseli, açıklama, ilgili ürünler ve genel iletişim bağlantısı mevcut.
- src/types/index.ts: ürünün temel alanları ad, açıklama, görsel ve kategori. Tasarım mevcut alanlar üzerinden kurulacak.
- src/app/admin/: ürün, kategori, mesaj, giriş ve şifre yönetimi bulunuyor.
- Üst/alt menü bazı sayfalarda ayrı çağrılıyor; kategori ve ürün sayfalarında aynı çağrılar yok. Tutarlı ortak görünüm kurulurken kök/admin yerleşimine etkiler kontrol edilmeli.
- Yerel public envanterinde hero fotoğrafları bulunmadı. Ürün görselleri kodda Supabase Storage üzerinden geliyor; gerçek görsellerin kalitesi ve erişilebilirliği incelenmedi.
- Canlı site görüntülenemedi: web erişimi 502, tarayıcı ERR_NAME_NOT_RESOLVED verdi. Bu herkes için kesinti olduğunu kanıtlamaz. Tasarım değerlendirmesi kaynak koda dayanıyor.
- Başlangıçta çalışma ağacı temiz, aktif dal main; node_modules bulunmuyor. Build/lint veya veri bağlantısının çalışması doğrulanmadı. Uygulama kodu değiştirilmedi.

## 1. Mevcut ekranları ve görsel malzemeyi topla

**Bağlam:** Yeni tasarım mevcut işlevlere dayanacak; canlı görünüm ve malzeme henüz doğrulanmadı.

**İşler:** Ana sayfa, kategori/alt kategori, ürün, hakkımızda ve iletişimin mobil/masaüstü görüntülerini al. Bağlantı ve düğme davranışlarını kısa bir listeye kaydet. Logo, renkler, kullanılabilecek ürün ve kullanım fotoğraflarını belirle; mevcut görseller yeterliyse yeniden kullan. Eksik fotoğrafları listele. Mevcut metinleri esas al; doğrulanmamış firma istatistiklerini büyütme veya yeni iddia ekleme. Ortam gereksinimlerini ve başlangıç tip/lint/build durumunu kaydet; gizli değerleri belgeye koyma.

**Teslimat / bitiş ölçütü:** Ekran ve görsel envanteri, korunacak davranışlar ve başlangıç raporu hazır. Hangi ekranların yenileneceği ve hangi malzemenin kullanılacağı belli.

**Bağımlılık:** Yok. **Geri dönüş:** Belge/görsel taslakları geri alınır; veri etkisi yok.

## 2. İki görsel yönü küçük örneklerle karşılaştır

**Bağlam:** Kullanıcı görsel tercihini bilmiyor; aynı içerikle karşılaştırılabilir ekranlar hazırlanacak.

**Seçenekler:**
- Sıcak ve premium: krem zemin, koyu kahve tonları, geniş boşluklar ve gerçek ürün/kullanım fotoğrafları.
- Sade ve kurumsal: açık zemin, güçlü tipografi, düzenli ürün kartları ve mevcut marka kimliğinden seçilen tek vurgu rengi.

Bunlar keşif seçenekleri; kesin marka kararı değil. Kahve dışındaki kategorilerin de uyacağı bir görsel dil kurulmalı.

**İşler:** Her yön için ana sayfanın ilk ekranını, bir kategori kartını ve bir ürün kartını hazırla. Aynı içerik ve görselleri kullan; mobil örneği de ekle. Uygulamadan bağımsız görsel taslak/önizleme sun.

**Teslimat / bitiş ölçütü:** İki somut seçenek üzerinden bir yön seçilmiş veya özellikleri birleştirilmiş. Seçimden önce tüm site uygulanmaz.

**Bağımlılık:** 1. **Geri dönüş:** Alternatif taslağa dönülür; çalışan sistem etkilenmez.

## 3. Seçilen yönle tüm temel ekranları tasarla

**Bağlam:** Mevcut sayfa yolları, içerik modeli ve davranışlar korunacak.

**İşler:**
- Ana sayfa: güçlü ürün/kullanım görseli, açık tanıtım, mevcut kategoriler ve iletişim çağrısı. Kategori bölümüne sayfa içi bağlantı eklenebilir; yeni sorgu gerekmez.
- Kategori: mevcut alt kategori ve ürünlerin okunabilir, tutarlı düzeni; yeni veri/filtre alanı yok.
- Ürün: ambalajı kesmeyen görsel sunumu, açıklama hiyerarşisi, mevcut iletişim düğmesi ve ilgili ürünler.
- Hakkımızda/iletişim: mevcut metin, kanallar ve form alanlarının daha açık yerleşimi.
- Üst/alt menü, mobil menü, WhatsApp düğmesi ve mevcut boş/hata/bulunamadı durumlarının görünümü.
- Renk, yazı tipi, boşluk, kart, buton, form, odak ve hata durumları için küçük tasarım sistemi.
- Mevcut açık/koyu tema davranışını koruyarak iki temanın okunabilirliğini tasarla.

**Teslimat / bitiş ölçütü:** Temel sayfaların mobil/masaüstü tasarımları ve bileşen kuralları hazır; yeni arka plan alanı/işlev gerekmiyor.

**Bağımlılık:** 2. **Geri dönüş:** Tasarım belgeleri düzenlenir; uygulama değişmez.

## 4. Ortak görünümü ve ana sayfayı uygula

**Bağlam / dosyalar:** src/app/globals.css, src/app/layout.tsx, src/components/layout/, src/components/ui/, src/components/WhatsAppButton.tsx, src/app/page.tsx. Global stiller admini de etkileyebilir.

**İşler:** Seçilen görsel sistemi uygula. Üst/alt menü ve mobil menüyü yenile; mevcut rota, tema ve düğme davranışlarını koru. Kategori ve üründe tutarlı ziyaretçi görünümü sağla; admin yerleşimini ve mevcut URL'leri koru. Ana sayfayı tamamla. Yeni büyük görseller arayüz varlığı olarak eklenebilir; veritabanına alan eklenmez. Önizlemeyi tasarımla mobil/masaüstünde karşılaştır.

**Doğrulama:** Ortam hazırsa npx tsc --noEmit, npx eslint ., npm run build. Başlangıç lint betiği/ESLint çalışabilirliği önce kontrol edilmeli; mevcut kusurlar ayrı kaydedilmeli. Mobil menü, tema, klavye odağı, bağlantılar ve admin stil etkileri tarayıcıda kontrol edilir.

**Teslimat / bitiş ölçütü:** Önizlemede yeni ana sayfa ve ortak arayüz çalışıyor; sorgu/API/auth/URL değişmemiş.

**Bağımlılık:** 3. **Geri dönüş:** Arayüz değişikliği geri alınır; veri geri dönüşü yok.

## 5. Diğer ziyaretçi sayfalarını aynı tasarıma geçir

**Bağlam / dosyalar:** src/components/category/, src/components/product/, src/app/kategori/[slug]/page.tsx, src/app/urun/[id]/page.tsx, src/app/hakkimizda/page.tsx, src/app/iletisim/page.tsx. Mevcut Supabase çağrıları ve /api/contact davranışı korunur.

**İşler:** Kategori/alt kategori ve ürün ekranlarını, ardından hakkımızda/iletişimi uygula. Görsel oranları ve eksik görsel sunumunu tutarlı yap. Form alanları, gönderim ve başarı/hata davranışlarını, WhatsApp bağlantısını koru. Mobil taşma, örtüşme ve okunabilirlik sorunlarını gider.

**Doğrulama:** Tip/lint/build; ana sayfa → kategori/alt kategori → ürün → iletişim, mevcut form doğrulaması, tema, WhatsApp bağlantısı ve ilgili ürünler. Form gönderimi uygun test/önizleme verisinde kontrol edilir; gerçek WhatsApp mesajı gönderilmez. Kod farkında sorgu/API/auth/URL değişikliği olmadığını incele.

**Teslimat / bitiş ölçütü:** Ziyaretçi ekranlarının tamamı aynı tasarımı kullanıyor ve başlangıç davranış listesiyle uyuşuyor.

**Bağımlılık:** 4. **Geri dönüş:** Arayüz değişiklikleri geri alınır; veri etkisi yok.

## 6. Son görsel kontrol ve yayın hazırlığı

**Bağlam:** Yeni ekranlar önizlemede tamamlanmış; mevcut sistemin ve SEO çıktısının korunması esas.

**İşler:** Mobil/masaüstü, açık/koyu tema, klavye odağı, kontrast, görsel kırpılması ve WhatsApp örtüşmesini kontrol et. Lighthouse başlangıcına göre büyük görsel yükleme etkisini ölç; tasarımın getirdiği sorunları gider. URL, başlık, canonical, sitemap/robots ve SEO çıktılarının etkilenmediğini doğrula. Form, katalog ve admin giriş/temel ekranlarını kontrol et. Son önizlemeyi sun; yayın ve önceki sürüme dönüş adımlarını kaydet. Üretime yayın ayrı uygulama adımı olarak kullanıcının talebi ve mevcut yetki kapsamında yürütülür; bu yol haritası yayın yapmaz.

**Doğrulama:** Tip/lint/build, kritik ziyaretçi akışları, form sonucu, adminin global stilden etkilenmesi ve mevcut SEO çıktısı. Reversible görsel değişiklikleri tekrar eden gereksiz testler yazılmaz; kritik davranış kontrolüne odaklanılır.

**Teslimat / bitiş ölçütü:** Son önizleme ve kontrol sonuçları hazır; kritik görsel sorunlar çözülmüş, işlevler ve arka plan sözleşmeleri korunmuş, geri dönüş yolu kayıtlı.

**Bağımlılık:** 5. **Geri dönüş:** Önceki doğrulanmış dağıtım/arayüz sürümüne dön; veri göçü yok.

## İsteğe bağlı devam: adminin görünümü

Ziyaretçi sitesi bittikten sonra admin görünümü de istenirse src/components/admin/ ve src/app/admin/ ekranlarının menü, tablo, form ve mobil düzeni yenilenir. Giriş, yetki, ürün/kategori işlemleri, görsel yükleme ve mesaj yönetiminin çalışma biçimi değişmez. Ayrı arayüz değişikliği olarak doğrulanır ve geri alınabilir; ziyaretçi yenilemesini geciktirmez.

## Sıra ve yürütme

Ana sıra: 1 → 2 → 3 → 4 → 5 → 6. Görsel toplama tasarım keşfiyle birlikte sürebilir; nihai tasarım gerçek malzemeyle doğrulanır. Ortak sistem tamamlanınca hakkımızda/iletişim ve katalog bağımsız dosyalarda yürütülebilir. Global stil/yerleşim gibi paylaşılan dosyalarda çakışan işler birlikte yapılmaz.

Her uygulama aşaması küçük, geri alınabilir değişiklik/PR olarak yürütülür. Tasarım ve ortak yerleşim kararlarında güçlü muhakeme, seçilmiş ekranların rutin uygulamasında varsayılan kapasite yeterlidir; belirli model/ajan zorunluluğu yok. Plan bağımsız eleştirel incelemeden geçirilir.

Bir arka plan kusuru ortaya çıkarsa ayrı kaydedilir; tasarım işi içinde sorgu/API/auth değiştirilmez. Yeni gereksinim oluşursa kapsam, bağımlılık ve bitiş ölçütleri güncellenir. Yapılmamış işler tamamlandı olarak işaretlenmez.

## İlk somut teslimat

Mevcut içerik, logo ve kullanılabilir görsellerle iki ana sayfa ilk ekranı + kategori/ürün kartları + mobil örnek. Kullanıcı bunları görünce yön seçilir; ardından tüm sayfalar aynı dilde tasarlanıp mevcut projede uygulanır.
