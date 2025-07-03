// src/components/category/CategoryCard.tsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/types"

interface CategoryCardProps {
  category: Category
  index: number
}

// Kategori ikonları/renkleri
const categoryStyles: Record<string, { gradient: string; icon: string }> = {
  suruplar: { gradient: "from-pink-500 to-rose-500", icon: "🍹" },
  pureler: { gradient: "from-orange-500 to-amber-500", icon: "🥤" },
  "bar-soslar": { gradient: "from-purple-500 to-indigo-500", icon: "🍸" },
  "dekor-soslar": { gradient: "from-blue-500 to-cyan-500", icon: "🎨" },
  kahveler: { gradient: "from-amber-600 to-orange-600", icon: "☕" },
  "toz-gruplari": { gradient: "from-emerald-500 to-green-500", icon: "✨" },
  "cay-grubu": { gradient: "from-green-600 to-emerald-600", icon: "🍵" },
  "icecek-grubu": { gradient: "from-cyan-500 to-blue-500", icon: "🥛" },
  boboco: { gradient: "from-indigo-500 to-purple-500", icon: "🧋" },
  "donuk-urun-grubu": { gradient: "from-slate-500 to-gray-500", icon: "🧊" },
  "cafe-cihazlari": { gradient: "from-gray-600 to-slate-600", icon: "⚙️" },
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const style = categoryStyles[category.slug] || {
    gradient: "from-primary to-primary/70",
    icon: "📦",
  }

  return (
    <Link
      href={`/kategori/${category.slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border shadow-sm",
        "hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
          `bg-gradient-to-br ${style.gradient}`
        )}
      />

      {/* Content */}
      <div className="relative p-6 md:p-8">
        {/* Icon */}
        <div className="mb-4 text-5xl">{style.icon}</div>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>

        {/* Arrow */}
        <div className="inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
          <span>Ürünleri Gör</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Decorative Element */}
        <div
          className={cn(
            "absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-10",
            `bg-gradient-to-br ${style.gradient}`
          )}
        />
      </div>
    </Link>
  )
}