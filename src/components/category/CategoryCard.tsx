import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Coffee, CupSoda, Milk, Snowflake, Utensils, Droplets, Leaf, Sparkles, type LucideIcon } from "lucide-react"
import type { Category } from "@/types"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
  image?: string
  compact?: boolean
}

const categoryDetails: Record<string, { icon: LucideIcon; description: string }> = {
  suruplar: { icon: Droplets, description: "Kahve ve kokteyl tariflerinize eşlik eden aromalar." },
  pureler: { icon: CupSoda, description: "Meyveli içecekler ve özgün tarifler için püreler." },
  "bar-soslar": { icon: Milk, description: "Kahve sunumlarını tamamlayan çikolata ve karamel lezzetleri." },
  "dekor-soslar": { icon: Sparkles, description: "Tatlı ve içeceklerinize son dokunuş." },
  kahveler: { icon: Coffee, description: "Espressodan filtre kahveye, fincanınız için farklı harmanlar." },
  "toz-gruplari": { icon: Milk, description: "Sıcak ve soğuk içecek menünüz için pratik karışımlar." },
  "cay-grubu": { icon: Leaf, description: "Günün her anına eşlik eden çay çeşitleri." },
  "icecek-grubu": { icon: CupSoda, description: "İçecek menünüzü tamamlayacak ürünleri keşfedin." },
  bobaco: { icon: CupSoda, description: "Popping boba, çay bazları ve renkli bubble tea lezzetleri." },
  "donuk-urun-grubu": { icon: Snowflake, description: "Cheesecake, pasta ve tatlılarla sunumunuzu tamamlayın." },
  "cafe-cihazlari": { icon: Utensils, description: "Hazırlıktan servise, işletmenizin ihtiyaç duyduğu ekipmanlar." },
}

const compactTitles: Record<string, string> = {
  "cafe-cihazlari": "Cafe Ekipmanları",
  "donuk-urun-grubu": "Donuk Ürünler",
  "toz-gruplari": "Toz İçecekler",
  "cay-grubu": "Çaylar",
  "icecek-grubu": "İçecekler",
}

export default function CategoryCard({ category, image, compact = false }: CategoryCardProps) {
  const details = categoryDetails[category.slug]
  const Icon = details?.icon ?? Utensils
  return (
    <Link href={`/kategori/${category.slug}`} aria-label={compact ? `${category.name} ürünlerini keşfet` : undefined} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-brand-caramel/50 hover:shadow-[0_16px_36px_-24px_rgba(61,42,36,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-caramel motion-reduce:transition-none">
      <div className={cn("relative flex items-center justify-center overflow-hidden border-b border-border/60 bg-[#FAFAF9] dark:bg-secondary/30", compact ? "aspect-[16/10]" : "aspect-[3/2]")}>
        {image ? (
          <Image src={image} alt="" fill sizes={compact ? "(max-width: 767px) 45vw, (max-width: 1023px) 30vw, 310px" : "(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 400px"} className={cn("object-contain transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none", compact ? "bg-[#faf9f7]" : "p-6")} />
        ) : (
          <Icon aria-hidden="true" className="h-16 w-16 stroke-[1] text-brand-caramel/70" />
        )}
      </div>
      <div className={cn("flex flex-1 flex-col items-start", compact ? "gap-3 p-3.5 md:p-4" : "p-6 md:p-7")}>
        <h3 className={cn("font-medium leading-tight tracking-[-0.035em]", compact ? "text-base md:text-lg" : "text-2xl")}>{compact ? compactTitles[category.slug] ?? category.name : category.name}</h3>
        {!compact && <p className="mb-7 mt-3 text-sm leading-7 text-muted-foreground">{details?.description ?? "İşletmeniz için ürün seçeneklerini inceleyin."}</p>}
        <span className={cn("mt-auto inline-flex items-center gap-3 text-primary", compact ? "text-[10px] font-medium md:text-xs" : "text-xs font-semibold")}>
          Ürünleri keşfet <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
        </span>
      </div>
    </Link>
  )
}
