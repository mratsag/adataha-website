# Hero marka şeridi

7 Ekim 2026 tarihinde `.env.local` üzerinden yalnızca okuma yapılarak 154 ürün ve 12 kategori kaydı incelendi. Veritabanında ayrı bir marka alanı yok; liste ürün adları, açıklamaları ve kategori adlarından doğrulandı. Bu şerit ürün portföyünü gösterir, resmi iş ortaklığı iddiası içermez.

| Marka | Katalog kanıtı | Logo kaynağı |
| --- | --- | --- |
| DaVinci Gourmet | Davinci alt kategorisi ve DaVinci açıklamalı ürünler | https://davincigourmet.com/cdn/shop/files/DaVinci_Logo_1.png?v=1732656038&width=400 |
| Caffe Nonno | Caffe Nonno Espresso ve Horeca | https://www.caffenonno.com/image/catalog/sistem/logo.png |
| The Boba Co. | Bobaco kategorisi; Bubble Tea, Instea ve MockTeal ürünleri | https://cdn.myikas.com/images/theme-images/2a854800-ba14-46f3-9adb-e33bc408ae99/image_540.webp (thebobaco.com.tr logosu) |
| FO Food Products | FO adlı bar sos ve dekor sos ürünleri | https://www.ozmer.com/themes/ozmer/assets/img/brands/fo-food-web.png |
| Karali Çay | Karali Kahveci ve Premium Filiz ürünleri | https://www.karalicay.com/front/img/logo.png |
| Krater | KRATER KARAMEL / ÇİKOLATA DEKOR SOS | https://www.krater.com.tr/wp-content/uploads/2019/12/Krater-Logo.svg |
| Doğuş Çay | Doğuş Avantaj Demlik Poşet | https://www.doguscay.com.tr/assets/images/dogus_orta_logo.png |

Logolar yerel `public/images/brands` klasöründe tutulur ve kendi renklerinde gösterilir. Boş kenarlar kırpıldı ve dosyalar kayıpsız WebP olarak optimize edildi. Krater SVG'sinin zemin dikdörtgeni kaldırıldı. Logolar yeniden çizilmedi. Kullanıcının isteğiyle logo boyutu yaklaşık %10 büyütüldü (masaüstünde 154×48, mobilde 118×42 piksel).

Şerit referansı: `C:/Users/PC/Desktop/role-permission-ownership/web/src/modules/website/components/sections/logo-strip.tsx` ve `components/styles/logo-strip.module.css`. Aynı iki kopyalı döngü, 100 saniyelik sabit hız, kenar maskesi, hover/klavye odağında durma ve azaltılmış hareket tercihi kullanılır. Daha uzun marka logoları için ölçüler uyarlandı.

Marka listesi `src/components/BrandLogoStrip.tsx` içinde katalogdan doğrulanmış sabit bir listedir; yeni markalar eklendiğinde liste ve yerel logo dosyaları da güncellenmelidir.
