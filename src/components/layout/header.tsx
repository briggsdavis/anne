"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FormEvent, useEffect, useMemo, useState } from "react"
import { JewelryService } from "@/lib/jewelry"
import type { JewelryPiece } from "@/types/jewelry"
import { formatPrice } from "@/utils/currency"

const primaryRoutes = ["/", "/shop", "/bespoke", "/workshops", "/giftcard", "/contact"]

const shopLinks = [
  { name: "Rings", href: "/shop?category=rings" },
  { name: "Bracelets", href: "/shop?category=bracelets" },
  { name: "Pendants", href: "/shop?category=pendants" },
  { name: "Necklaces", href: "/shop?category=necklaces" },
  { name: "Chains", href: "/shop?category=chains" },
  { name: "Sets", href: "/shop?category=sets" },
  { name: "Men's Jewelry", href: "/shop?gender=male" },
  { name: "Ethiopian Crosses", href: "/shop?category=crosses" },
  { name: "Home Accessories", href: "/shop?category=home-accessories" },
]

function ShopDropdown() {
  return (
    <div className="group relative flex h-20 items-center">
      <Link href="/shop" className="nav-link px-1 py-2 text-sm text-neutral-700">
        Shop
      </Link>
      <div className="pointer-events-none absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 translate-y-2 border border-neutral-100 bg-white p-3 opacity-0 shadow-[0_8px_16px_rgba(0,0,0,0.10)] transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        {shopLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 text-center text-sm text-neutral-800 hover:bg-neutral-50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [searchPieces, setSearchPieces] = useState<JewelryPiece[]>([])
  const [searchLoaded, setSearchLoaded] = useState(false)
  const searchLoading = isSearchOpen && !searchLoaded
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    primaryRoutes.forEach((route) => router.prefetch(route))
  }, [router])

  useEffect(() => {
    if (!isSearchOpen || searchLoaded) return

    let cancelled = false

    JewelryService.getAvailablePieces()
      .then((pieces) => {
        if (!cancelled) setSearchPieces(pieces)
      })
      .catch(() => {
        if (!cancelled) setSearchPieces([])
      })
      .finally(() => {
        if (!cancelled) setSearchLoaded(true)
      })

    return () => {
      cancelled = true
    }
  }, [isSearchOpen, searchLoaded])

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return []

    return searchPieces.filter((piece) => piece.title.toLowerCase().includes(normalizedQuery))
  }, [query, searchPieces])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const value = query.trim()
    router.push(value ? `/shop?q=${encodeURIComponent(value)}` : "/shop")
    setIsSearchOpen(false)
  }

  const navLink = (href: string, label: string) => {
    const path = href.split("#")[0]
    const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path)

    return (
      <Link
        href={href}
        className={`nav-link px-1 py-2 text-sm ${
          isActive ? "text-primary-600" : "text-neutral-700"
        }`}
      >
        {label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="w-full bg-white shadow-[0_5px_16px_rgba(12,43,63,0.09)]">
        <div className="nav-font container">
          <div className="flex h-20 items-center">
            <Link href="/" aria-label="Anne Silver home" className="shrink-0">
              <Image
                src="/anne-silver-logo.png"
                alt="Anne Silver"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            <div className="ml-auto hidden items-center xl:flex">
              <div className="flex items-center gap-6 whitespace-nowrap">
                <ShopDropdown />
                {navLink("/bespoke", "Customs and Repairs")}
                {navLink("/workshops", "Workshop")}
                {navLink("/giftcard", "Giftcard")}
                {navLink("/contact", "Contact")}
              </div>

              <div className="ml-6 flex h-7 items-center border-l border-neutral-300 pl-6">
                <AnimatePresence initial={false} mode="wait">
                  {isSearchOpen ? (
                    <motion.form
                      key="search-field"
                      onSubmit={submitSearch}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 270, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="flex items-center overflow-hidden border-b border-neutral-400"
                    >
                      <Search className="h-4 w-4 shrink-0 text-neutral-500" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search piece names..."
                        className="min-w-0 grow bg-transparent px-3 py-2 text-sm outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="cursor-pointer p-1 text-neutral-500"
                        aria-label="Close search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.button
                      key="search-button"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="button"
                      onClick={() => setIsSearchOpen(true)}
                      className="cursor-pointer p-2 text-neutral-700 transition-colors hover:text-primary-600"
                      aria-label="Search pieces"
                    >
                      <Search className="h-5 w-5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3 xl:hidden">
              <button
                onClick={() => setIsSearchOpen((open) => !open)}
                className="cursor-pointer"
                aria-label="Search pieces"
              >
                <Search className="h-5 w-5" />
              </button>
              <button onClick={() => setIsMenuOpen((open) => !open)} aria-label="Toggle menu">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.form
                onSubmit={submitSearch}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden xl:hidden"
              >
                <div className="flex border-t border-neutral-200 py-4">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by piece name..."
                    className="w-full border-b border-neutral-400 bg-transparent px-2 py-2 outline-none"
                  />
                  <button type="submit" className="px-4 text-sm text-primary-600">
                    Search
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden border-t border-neutral-200 xl:hidden"
              >
                <div className="grid grid-cols-2 gap-1 py-4">
                  {[
                    ["Shop", "/shop"],
                    ["Customs and Repairs", "/bespoke"],
                    ["Workshop", "/workshops"],
                    ["Giftcard", "/giftcard"],
                    ["Contact", "/contact"],
                  ].map(([name, href]) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-3 py-2 text-neutral-700"
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSearchOpen && query.trim() && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="border-t border-neutral-200 py-6"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {searchLoading ? (
                    <p className="mb-0 py-8 text-center text-sm text-neutral-500">
                      Searching pieces…
                    </p>
                  ) : searchResults.length > 0 ? (
                    <div
                      className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-4"
                      aria-label="Search results"
                    >
                      {searchResults.map((piece) => {
                        const primaryImage =
                          piece.images?.find((image) => image.is_primary) ?? piece.images?.[0]

                        return (
                          <Link
                            key={piece.id}
                            href={`/gallery/${piece.id}`}
                            onClick={() => {
                              setIsSearchOpen(false)
                              setQuery("")
                            }}
                            className="group block w-40 shrink-0 snap-start text-center sm:w-48 md:w-52 xl:w-56"
                          >
                            <div className="relative aspect-square overflow-hidden bg-neutral-100">
                              {primaryImage ? (
                                <Image
                                  src={primaryImage.image_url}
                                  alt={primaryImage.alt_text}
                                  fill
                                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1280px) 208px, 224px"
                                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                                  No image
                                </div>
                              )}
                            </div>
                            <h3 className="mt-3 mb-1 truncate text-base font-medium text-neutral-900">
                              {piece.title}
                            </h3>
                            <p className="mb-0 text-sm font-semibold text-primary-600">
                              {formatPrice(piece.price)}
                            </p>
                          </Link>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="mb-0 py-8 text-center text-sm text-neutral-500">
                      No pieces match “{query.trim()}”.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  )
}
