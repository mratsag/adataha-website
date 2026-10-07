# Kompakt kategori vitrini

11 kategori için imagegen becerisinin yerleşik image_gen aracıyla ayrı fotoğraflar üretildi. İstemler ve kaynak PNG dosyaları [kategori-gorsel-promptlari.json](./kategori-gorsel-promptlari.json) içinde kayıtlıdır.

Son görseller `public/images/categories/*.webp` dizininde 720 piksele optimize edilmiştir. Bunlar kategori temsilleridir; marka, logo veya belirli bir katalog ürünü iddiası içermez. Gerçek katalog ürünlerinin fotoğrafları ürün sayfalarında kullanılmaya devam eder.

Ana sayfada kategori vitrini masaüstünde 4, tablette 3, mobilde 2 sütundur. Kısa başlık ve keşfet bağlantısıyla uzun kart açıklamaları kaldırılmıştır. Kare fotoğraflar daha kısa görsel alanına object-contain ile yerleştirilir; ürünler kırpılmaz. Tam kategori adı erişilebilir bağlantı adında korunur.

Görsel eşleştirmesi `src/lib/category-images.ts` içindedir. Yeni, görseli olmayan kategoriler ikonla gösterilir. Bu kompakt düzen sadece ana sayfada etkinleştirilmiştir; alt kategori sayfaları varsayılan kart düzenini korur.
