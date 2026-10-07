import styles from "./BrandLogoStrip.module.css"
import Image from "next/image"

// Catalog brands verified against product names, descriptions and categories.
const brands = [
  { id: "davinci", name: "DaVinci Gourmet", file: "davinci.webp" },
  { id: "nonno", name: "Caffe Nonno", file: "nonno.webp" },
  { id: "bobaco", name: "The Boba Co.", file: "bobaco.webp" },
  { id: "fo", name: "FO Food Products", file: "fo.webp" },
  { id: "karali", name: "Karali Çay", file: "karali.webp" },
  { id: "krater", name: "Krater", file: "krater.svg" },
  { id: "dogus", name: "Doğuş Çay", file: "dogus.webp" },
]

export default function BrandLogoStrip() {
  return (
    <div className="site-container pb-8 md:pb-10">
      <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Ürünlerini tedarik ettiğimiz markalar
      </p>
      <div className={styles.strip} role="region" aria-label="Ürünlerini tedarik ettiğimiz markalar" tabIndex={0}>
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.set} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {brands.map((brand) => (
                <Image
                  key={brand.id}
                  className={styles.logo}
                  src={`/images/brands/${brand.file}`}
                  alt={copy === 0 ? brand.name : ""}
                  width={154}
                  height={48}
                  unoptimized
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
