"use client"

import JewelryCard from "@/components/ui/JewelryCard"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { JewelryService } from "@/lib/jewelry"
import type { JewelryPiece } from "@/types/jewelry"
import { JEWELRY_CATEGORIES } from "@/types/jewelry"
import { motion } from "framer-motion"
import { Grid, List, Search } from "lucide-react"
import { useEffect, useState } from "react"

export default function GalleryPage() {
  const [pieces, setPieces] = useState<JewelryPiece[]>([])
  const [filteredPieces, setFilteredPieces] = useState<JewelryPiece[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [showSold, setShowSold] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    async function loadPieces() {
      try {
        const allPieces = showSold
          ? await JewelryService.getAllPieces()
          : await JewelryService.getAvailablePieces()
        setPieces(allPieces)
        setFilteredPieces(allPieces)
      } catch (error) {
        console.error("Error loading pieces:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPieces()
  }, [showSold])

  useEffect(() => {
    let filtered = pieces

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (piece) =>
          piece.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          piece.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          piece.materials.some((material) =>
            material.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((piece) => piece.category === selectedCategory)
    }

    setFilteredPieces(filtered)
  }, [pieces, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div className="container py-16">
        <LoadingSpinner size="lg" className="py-20" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="brand-accent mb-4 text-4xl font-bold text-neutral-900 md:text-5xl">
            Gallery
          </h1>
          <p className="max-w-2xl text-lg text-neutral-600">
            Explore our complete collection of handcrafted Ethiopian jewelry.
            Each piece is a unique work of art celebrating our rich heritage.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input w-full pl-10"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="">All Categories</option>
                {JEWELRY_CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              {/* Show Sold Toggle */}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showSold}
                  onChange={(e) => setShowSold(e.target.checked)}
                  className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                Show sold items
              </label>

              {/* View Mode Toggle */}
              <div className="flex overflow-hidden rounded-lg border border-neutral-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary-500 text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
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
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-6"
            }
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
              <h3 className="mb-2 text-lg font-medium text-neutral-900">
                No pieces found
              </h3>
              <p className="mb-4 text-neutral-600">
                Try adjusting your search or filter criteria to find what
                you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("")
                }}
                className="btn btn-outline"
              >
                Clear filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
