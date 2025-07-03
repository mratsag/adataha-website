// src/components/category/CategoryGrid.tsx
import CategoryCard from "./CategoryCard"
import type { Category } from "@/types"

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          index={index}
        />
      ))}
    </div>
  )
}