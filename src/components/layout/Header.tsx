"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Women", href: "/gallery?gender=female" },
  { name: "Men", href: "/gallery?gender=male" },
  { name: "Custom", href: "/custom" },
  { name: "Workshops", href: "/workshops" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNavSticky, setIsNavSticky] = useState(false)
  const pathname = usePathname()
  const logoRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current && headerRef.current) {
        const logoHeight = logoRef.current.offsetHeight
        const scrollPosition = window.scrollY

        // Make nav sticky when logo is scrolled out of view
        setIsNavSticky(scrollPosition > logoHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header ref={headerRef} className="w-full">
        {/* Logo Section */}
        <div ref={logoRef} className="border-b border-neutral-200 bg-white">
          <div className="container py-4">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Anne Silver"
                width={300}
                height={100}
                className="mx-auto h-12 w-auto md:h-16"
                priority
              />
            </Link>
          </div>
        </div>

        {/* Navigation Section */}
        <nav
          className={`w-full border-b border-neutral-200 bg-white/95 backdrop-blur transition-all duration-300 supports-[backdrop-filter]:bg-white/60 ${
            isNavSticky ? "fixed top-0 z-50" : "relative"
          }`}
        >
          <div className="container">
            <div className="flex h-16 items-center justify-center md:justify-center">
              {/* Desktop Navigation - Centered */}
              <div className="hidden items-center space-x-8 md:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                      isActive(item.href) ? "text-primary-600" : "text-neutral-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile: Logo text and menu button */}
              <div className="flex w-full items-center justify-between md:hidden">
                <Link href="/" className="brand-accent">
                  <span
                    className="text-xl font-bold text-neutral-900"
                    style={{ fontFamily: "var(--font-family-secondary)" }}
                  >
                    Anne Silver
                  </span>
                </Link>

                {/* Mobile menu button */}
                <button
                  className="md:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-neutral-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-neutral-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  id="mobile-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-neutral-200 bg-white md:hidden"
                  role="menu"
                  aria-labelledby="mobile-menu-button"
                >
                  <div className="space-y-1 px-4 py-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary-600 ${
                          isActive(item.href)
                            ? "rounded-md bg-primary-50 text-primary-600"
                            : "text-neutral-600"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>

      {/* Spacer to prevent content jump when nav becomes sticky */}
      {isNavSticky && <div className="h-16" />}
    </>
  )
}
