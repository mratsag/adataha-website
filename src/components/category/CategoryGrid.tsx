// src/components/category/CategoryGrid.tsx
import CategoryCard from "./CategoryCard"
import type { Category } from "@/types"
import { cn } from "@/lib/utils"

interface CategoryGridProps {
  categories: Category[]
  images?: Record<string, string>
  compact?: boolean
}

export default function CategoryGrid({ categories, images, compact = false }: CategoryGridProps) {
  return (
    <div className={cn("grid", compact ? "grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7")}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          image={images?.[category.id]}
          compact={compact}
        />
      ))}
    </div>
  )
}
