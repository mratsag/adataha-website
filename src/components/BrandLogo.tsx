import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
  priority?: boolean
}

export default function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Adataha"
      width={2172}
      height={724}
      priority={priority}
      className={cn("brand-logo h-14 w-auto", className)}
    />
  )
}
