"use client"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import JewelryCard from "@/components/ui/jewelry-card"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { JewelryService } from "@/lib/jewelry"
import type { JewelryPiece } from "@/types/jewelry"
import { JEWELRY_CATEGORIES, JEWELRY_GENDERS } from "@/types/jewelry"
import { sanitizeSearchQuery } from "@/utils/sanitize"

interface GalleryClientProps {
  initialCategory?: string
  initialGender?: string
  initialSearch?: string
}

export default function GalleryClient({
  initialCategory,
  initialGender,
  initialSearch,
}: GalleryClientProps) {
  const [pieces, setPieces] = useState<JewelryPiece[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(initialSearch ?? "")
  const [showSold, setShowSold] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get("category") ?? initialCategory ?? ""
  const selectedGender = searchParams.get("gender") ?? initialGender ?? ""

  useEffect(() => {
    async function loadPieces() {
      try {
        const allPieces = showSold
          ? await JewelryService.getAllPieces()
          : await JewelryService.getAvailablePieces()
        setPieces(allPieces)
      } catch (error) {
        console.error("Error loading pieces:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPieces()
  }, [showSold])

  useEffect(() => {
    setSearchQuery(initialSearch ?? "")
  }, [initialSearch])

  const filteredPieces = useMemo(() => {
    let filtered = pieces

    // Filter by search query
    if (searchQuery) {
      const sanitizedQuery = sanitizeSearchQuery(searchQuery.toLowerCase())
      if (sanitizedQuery) {
        filtered = filtered.filter(
          (piece) =>
            piece.title.toLowerCase().includes(sanitizedQuery) ||
            piece.description.toLowerCase().includes(sanitizedQuery) ||
            piece.materials.some((material) => material.toLowerCase().includes(sanitizedQuery)),
        )
      }
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((piece) => piece.category === selectedCategory)
    }

    // Filter by gender
    if (selectedGender) {
      filtered = filtered.filter((piece) => piece.gender === selectedGender)
    }

    return filtered
  }, [pieces, searchQuery, selectedCategory, selectedGender])

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    updateURL(category, selectedGender)
  }

  // Update URL when gender changes
  const handleGenderChange = (gender: string) => {
    updateURL(selectedCategory, gender)
  }

  // Helper function to update URL with both category and gender
  const updateURL = (category: string, gender: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    if (gender) {
      params.set("gender", gender)
    } else {
      params.delete("gender")
    }

    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <section className="relative h-[50svh] min-h-[24rem] overflow-hidden">
        <Image
          src="/decor3.jpeg"
          alt="Anne Silver jewelry collection"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative container flex h-full items-end pb-10 lg:pb-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="brand-accent mb-4 text-4xl font-bold text-white md:text-5xl">Shop</h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p className="mb-0 max-w-2xl text-lg text-white/90">
                Explore our complete collection of handcrafted Ethiopian jewelry. Each piece is a
                unique work of art celebrating our rich heritage.
              </p>
              <Link
                href="/catalog.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn shrink-0 border-white bg-white whitespace-nowrap text-primary-600 hover:bg-primary-100"
              >
                View Full Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-8">
        {loading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                  {/* Search */}
                  <div className="relative w-full">
                    <label htmlFor="jewelry-search" className="sr-only">
                      Search jewelry collection
                    </label>
                    <Search
                      className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-neutral-400"
                      aria-hidden="true"
                    />
                    <input
                      id="jewelry-search"
                      type="text"
                      placeholder="Search jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input w-full rounded-none border-x-0 border-t-0 bg-neutral-50 pl-10 focus:shadow-none"
                      aria-label="Search jewelry collection"
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label htmlFor="category-filter" className="sr-only">
                      Filter by category
                    </label>
                    <select
                      id="category-filter"
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="input w-60 rounded-none border-x-0 border-t-0 bg-neutral-50 focus:shadow-none"
                      aria-label="Filter by category"
                    >
                      <option value="">All Categories</option>
                      {JEWELRY_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gender Filter */}
                  <div>
                    <label htmlFor="gender-filter" className="sr-only">
                      Filter by gender
                    </label>
                    <select
                      id="gender-filter"
                      value={selectedGender}
                      onChange={(e) => handleGenderChange(e.target.value)}
                      className="input w-60 rounded-none border-x-0 border-t-0 bg-neutral-50 focus:shadow-none"
                      aria-label="Filter by gender"
                    >
                      <option value="">All Genders</option>
                      {JEWELRY_GENDERS.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-b border-neutral-300 px-4 py-3.5">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={showSold}
                      onChange={(e) => setShowSold(e.target.checked)}
                      className="checkbox"
                    />
                    <span className="text-sm font-medium text-neutral-700 select-none">
                      Show sold items
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-neutral-600">
                Showing {filteredPieces.length} of {pieces.length} pieces
              </p>
            </motion.div>

            {/* Gallery Grid */}
            {filteredPieces.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
              >
                {filteredPieces.map((piece) => (
                  <JewelryCard key={piece.id} piece={piece} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="py-20 text-center"
              >
                <div className="mx-auto max-w-md">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200">
                    <Search className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-neutral-900">No pieces found</h3>
                  <p className="mb-4 text-neutral-600">
                    Try adjusting your search or filter criteria to find what you&apos;re looking
                    for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      handleCategoryChange("")
                      handleGenderChange("")
                    }}
                    className="btn btn-outline"
                  >
                    Clear filters
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
