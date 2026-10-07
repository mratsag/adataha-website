"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Sun, Moon, ChevronDown, ArrowUpRight, ArrowRight } from "lucide-react"
import BrandLogo from "@/components/BrandLogo"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { Category } from "@/types"
import { cn } from "@/lib/utils"

type MenuCategory = Pick<Category, "id" | "name" | "slug">

const categoryDetails: Record<string, { group: number; description: string }> = {
  kahveler: { group: 0, description: "Her fincanın başlangıcı" },
  "cay-grubu": { group: 0, description: "Demlenen lezzetler" },
  suruplar: { group: 1, description: "İçeceklerinize karakter katın" },
  pureler: { group: 1, description: "Meyveden gelen lezzet" },
  "bar-soslar": { group: 1, description: "Barınız için tamamlayıcı tatlar" },
  "dekor-soslar": { group: 1, description: "Sunumun son dokunuşu" },
  "toz-gruplari": { group: 1, description: "Yeni tariflere yer açın" },
  "icecek-grubu": { group: 2, description: "Menünüzü çeşitlendirin" },
  "donuk-urun-grubu": { group: 2, description: "Mutfağınızın yardımcıları" },
  "cafe-cihazlari": { group: 2, description: "İşletmeniz için ekipmanlar" },
  bobaco: { group: 2, description: "Farklı lezzetleri keşfedin" },
}
const groupTitles = ["Kahve & çay", "Tatlar & dokunuşlar", "Menünüzü tamamlayın"]
const navLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
]

export default function Header({ categories: initialCategories }: { categories?: MenuCategory[] }) {
  const [fetchedCategories, setCategories] = useState<MenuCategory[]>([])
  const categories = initialCategories ?? fetchedCategories
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const desktopTriggerRef = useRef<HTMLButtonElement>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement>(null)
  const { theme, setTheme } = useTheme()

  const closeMenus = () => {
    setIsCategoriesOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleCategories = () => {
    if (!isCategoriesOpen && !initialCategories) {
      setIsLoading(true)
      setLoadError(false)
    }
    setIsCategoriesOpen(open => !open)
  }

  useEffect(() => {
    if (initialCategories || !isCategoriesOpen) return
    let active = true
    const load = async () => {
      try {
        const { data, error } = await createClient().from("categories")
          .select("id, name, slug").is("parent_id", null).order("name")
        if (!active) return
        if (error) throw error
        setCategories(data ?? [])
      } catch {
        if (active) setLoadError(true)
      } finally {
        if (active) setIsLoading(false)
      }
    }
    void load()
    return () => { active = false }
  }, [initialCategories, isCategoriesOpen, reloadCount])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenus()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      if (isCategoriesOpen) {
        setIsCategoriesOpen(false)
        const trigger = window.matchMedia("(min-width: 768px)").matches
          ? desktopTriggerRef.current : mobileTriggerRef.current
        trigger?.focus()
      } else if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        headerRef.current?.querySelector<HTMLButtonElement>("[aria-controls='mobile-navigation']")?.focus()
      }
    }
    const breakpoint = window.matchMedia("(min-width: 768px)")
    const onBreakpointChange = () => closeMenus()
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    breakpoint.addEventListener("change", onBreakpointChange)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
      breakpoint.removeEventListener("change", onBreakpointChange)
    }
  }, [isCategoriesOpen, isMobileMenuOpen])

  const groups = groupTitles.map((title, index) => ({
    title,
    categories: categories.filter(category => (categoryDetails[category.slug]?.group ?? 2) === index),
  }))
  const categoryContent = (
    <>
      {isLoading && <p role="status" className="p-6 text-sm text-muted-foreground">Kategoriler yükleniyor…</p>}
      {loadError && <div role="status" className="p-6 text-sm text-muted-foreground">
        Kategoriler yüklenemedi. <button type="button" onClick={() => { setIsLoading(true); setLoadError(false); setReloadCount(count => count + 1) }} className="underline text-foreground">Tekrar dene</button>
      </div>}
      {!isLoading && !loadError && categories.length === 0 && <p className="p-6 text-sm text-muted-foreground">Henüz kategori bulunmuyor.</p>}
      {!isLoading && !loadError && categories.length > 0 && <div className="grid gap-7 p-5 md:grid-cols-3 md:gap-6 md:p-8">
        {groups.filter(group => group.categories.length > 0).map(group => (
          <div key={group.title}>
            <h3 className="mb-3 border-b border-border pb-3 text-xs font-medium tracking-wide text-muted-foreground">{group.title}</h3>
            <ul className="space-y-1">
              {group.categories.map(category => <li key={category.id}>
                <Link href={`/kategori/${category.slug}`} onClick={closeMenus}
                  className="group block rounded-lg px-2 py-3 -mx-2 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <span className="flex items-start justify-between gap-2 text-sm font-medium text-foreground group-hover:text-brand-caramel">
                    {category.name}<ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{categoryDetails[category.slug]?.description ?? "Ürünleri keşfedin"}</span>
                </Link>
              </li>)}
            </ul>
          </div>
        ))}
      </div>}
    </>
  )
  const linkClass = "rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

  return (
    <header ref={headerRef} onBlur={event => {
      if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) closeMenus()
    }} className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white shadow-[0_2px_16px_rgba(61,42,36,0.03)] dark:border-border dark:bg-background">
      <div className="site-container">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" onClick={closeMenus}><BrandLogo priority className="h-12 md:h-14" /></Link>
          <nav aria-label="Ana menü" className="hidden items-center gap-2 md:flex lg:gap-4">
            <Link href="/" onClick={closeMenus} className={linkClass}>Ana Sayfa</Link>
            <button ref={desktopTriggerRef} type="button" aria-expanded={isCategoriesOpen} aria-controls="desktop-categories"
              onClick={toggleCategories}
              className={cn(linkClass, "flex items-center gap-2", isCategoriesOpen && "bg-secondary/40 text-brand-caramel")}>
              Kategoriler<ChevronDown className={cn("h-4 w-4 transition-transform", isCategoriesOpen && "rotate-180")} />
            </button>
            {navLinks.map(link => <Link key={link.href} href={link.href} onClick={closeMenus} className={linkClass}>{link.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="relative rounded-full border border-border/60 text-muted-foreground hover:bg-secondary/40 hover:text-foreground">
              <Sun className="h-5 w-5 dark:hidden" /><Moon className="hidden h-5 w-5 dark:block" /><span className="sr-only">Tema değiştir</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" onClick={() => {
                setIsMobileMenuOpen(open => !open)
                setIsCategoriesOpen(false)
              }}>{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</Button>
          </div>
        </div>
      </div>

      <div id="desktop-categories" hidden={!isCategoriesOpen} className="absolute inset-x-0 top-full mt-2 hidden md:block" style={!isCategoriesOpen ? { display: "none" } : undefined}>
        <div className="site-container max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-border/70 bg-white shadow-xl shadow-primary/10 dark:bg-card">
          <div className="grid lg:grid-cols-[1fr_270px]">
            {categoryContent}
            <aside className="my-8 mr-8 hidden flex-col justify-center border-l border-border pl-7 text-center lg:flex">
              <div className="rounded-2xl bg-secondary/50 p-3"><Image src="/cafe-menu.svg" alt="" width={260} height={230} /></div>
              <p className="mt-5 text-base font-semibold">Lezzet burada başlar.</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Kahveden son dokunuşa,<br />menünüz için her şey.</p>
            </aside>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-border px-8 py-4">
            <p className="text-xs text-muted-foreground">Cafe & restaurantınız için ürünler.</p>
            <Link href="/#kategoriler" onClick={closeMenus} className="flex items-center gap-2 text-xs font-medium text-brand-caramel hover:underline">Tüm kategorileri keşfet<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>

      <nav id="mobile-navigation" aria-label="Mobil menü" hidden={!isMobileMenuOpen} className={cn("max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border px-4 py-3 md:hidden", !isMobileMenuOpen && "hidden")}>
        <Link href="/" onClick={closeMenus} className={cn(linkClass, "block")}>Ana Sayfa</Link>
        <button ref={mobileTriggerRef} type="button" aria-expanded={isCategoriesOpen} aria-controls="mobile-categories"
          onClick={toggleCategories} className={cn(linkClass, "flex w-full items-center justify-between")}>
          Kategoriler<ChevronDown className={cn("h-4 w-4 transition-transform", isCategoriesOpen && "rotate-180")} />
        </button>
        <div id="mobile-categories" hidden={!isCategoriesOpen} className={cn("my-2 rounded-xl border border-border bg-white dark:bg-card", !isCategoriesOpen && "hidden")}>{categoryContent}</div>
        {navLinks.map(link => <Link key={link.href} href={link.href} onClick={closeMenus} className={cn(linkClass, "block")}>{link.label}</Link>)}
      </nav>
    </header>
  )
}
