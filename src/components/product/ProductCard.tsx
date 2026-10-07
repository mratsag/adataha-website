// src/components/product/ProductCard.tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Package } from "lucide-react"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/urun/${product.id}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand-caramel/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-caramel"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-border/50 bg-white">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none md:p-5"
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 320px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package aria-hidden="true" className="h-8 w-8 text-muted-foreground/40" strokeWidth={1.5} />
          </div>
        )}

      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3.5 md:p-5">
        <h3 className="mb-2 text-sm font-medium leading-6 transition-colors group-hover:text-brand-caramel md:text-base">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="mb-4 line-clamp-2 text-xs leading-6 text-muted-foreground">
            {product.description}
          </p>
        )}
        <span className="mt-auto flex items-center justify-between gap-2 pt-3 text-[11px] font-medium md:text-xs">Ürünü incele <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-caramel" /></span>
      </div>

    </Link>
  )
}
