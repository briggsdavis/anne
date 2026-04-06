"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { JewelryPiece } from "@/types/jewelry"

interface JewelryDetailProps {
  piece: JewelryPiece
}

export default function JewelryDetail({ piece }: JewelryDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const images =
    piece.images?.sort((a, b) => {
      if (a.is_primary) return -1
      if (b.is_primary) return 1
      return a.display_order - b.display_order
    }) || []

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleInquiry = () => {
    const subject = encodeURIComponent(`Inquiry about ${piece.title}`)
    const body = encodeURIComponent(
      `Hello,\n\nI'm interested in learning more about the "${piece.title}" piece from your collection.\n\nCould you please provide more information?\n\nThank you!`,
    )
    window.open(`mailto:info@annesilver.com?subject=${subject}&body=${body}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="container py-4">
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2 text-neutral-600 transition-colors hover:text-primary-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Gallery</span>
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {images.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <Image
                    src={images[currentImageIndex].image_url}
                    alt={images[currentImageIndex].alt_text}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="cursor-zoom-in object-cover"
                    onClick={() => setIsImageModalOpen(true)}
                    priority
                  />

                  {piece.is_sold && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="rounded-lg bg-red-600 px-4 py-2 text-lg font-medium text-white">
                        SOLD
                      </span>
                    </div>
                  )}

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
                      >
                        <ChevronLeft className="h-5 w-5 text-neutral-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
                      >
                        <ChevronRight className="h-5 w-5 text-neutral-700" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail images */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                          index === currentImageIndex
                            ? "border-primary-500"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <Image
                          src={image.image_url}
                          alt={image.alt_text}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-neutral-200">
                <span className="text-neutral-500">No images available</span>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title and Price */}
            <div>
              <h1
                className="brand-accent mb-4 text-3xl font-bold text-neutral-900 md:text-4xl"
                style={{ fontFamily: "var(--font-family-secondary)" }}
              >
                {piece.title}
              </h1>
              <div className="mb-6 flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary-600">
                  ETB{" "}
                  {piece.price.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </span>
                {piece.is_sold && (
                  <span className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    SOLD
                  </span>
                )}
              </div>
            </div>

            {/* Category and Gender */}
            <div className="flex items-center space-x-3">
              <span className="inline-block rounded-md bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 capitalize">
                {piece.category}
              </span>
              {piece.gender && (
                <span className="inline-block rounded-md bg-secondary-100 px-3 py-1 text-sm font-medium text-secondary-700 capitalize">
                  {piece.gender}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-3 text-xl font-semibold text-neutral-900">
                Description
              </h2>
              <p className="leading-relaxed whitespace-pre-wrap text-neutral-600">
                {piece.description}
              </p>
            </div>

            {/* Materials */}
            {piece.materials.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-semibold text-neutral-900">
                  Materials
                </h2>
                <div className="flex flex-wrap gap-2">
                  {piece.materials.map((material, index) => (
                    <span
                      key={index}
                      className="inline-block rounded-md bg-secondary-100 px-3 py-1 text-sm text-secondary-700"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ring Sizes (only for rings) */}
            {piece.category === "rings" &&
              piece.ring_sizes &&
              piece.ring_sizes.length > 0 && (
                <div>
                  <h2 className="mb-3 text-xl font-semibold text-neutral-900">
                    Available Sizes
                  </h2>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {piece.ring_sizes
                        .map((rs) => rs.size)
                        .sort((a, b) => a - b)
                        .map((size, index) => (
                          <span
                            key={index}
                            className="inline-flex min-w-[3rem] items-center justify-center rounded-lg bg-primary-100 px-3 py-2 text-sm font-medium text-primary-700"
                          >
                            {size}
                          </span>
                        ))}
                    </div>
                    <p className="text-sm text-neutral-500">
                      US ring sizes. Contact us for other sizes or custom
                      fitting.
                    </p>
                  </div>
                </div>
              )}

            {/* Craftsmanship Info */}
            <div className="rounded-xl bg-primary-50 p-6">
              <h3 className="mb-2 font-semibold text-neutral-900">
                Ethiopian Craftsmanship
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                This piece is handcrafted by skilled Ethiopian artisans using
                traditional techniques passed down through generations. Each
                creation celebrates our rich cultural heritage and represents
                hours of meticulous work and attention to detail.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!piece.is_sold ? (
                <button
                  onClick={handleInquiry}
                  className="btn btn-primary w-full"
                >
                  <Mail className="h-4 w-4" />
                  Inquire About This Piece
                </button>
              ) : (
                <div className="rounded-lg bg-neutral-100 p-4 text-center">
                  <p className="font-medium text-neutral-600">
                    This piece has been sold
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Contact us for similar pieces or custom commissions
                  </p>
                </div>
              )}

              <Link href="/contact" className="btn btn-outline w-full">
                <ExternalLink className="h-4 w-4" />
                Contact Us
              </Link>
            </div>

            {/* Additional Info */}
            <div className="space-y-1 text-sm text-neutral-500">
              <p>• Free worldwide shipping on all pieces</p>
              <p>• Certificate of authenticity included</p>
              <p>• 30-day return policy</p>
              <p>• Custom sizing available upon request</p>
            </div>
          </motion.div>
        </div>

        {/* Image Modal */}
        {isImageModalOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className="relative max-h-full max-w-4xl">
              <Image
                src={images[currentImageIndex].image_url}
                alt={images[currentImageIndex].alt_text}
                width={800}
                height={800}
                className="max-h-full max-w-full object-contain"
              />

              {/* Close button */}
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              >
                <ChevronRight className="h-6 w-6 rotate-45" />
              </button>

              {/* Navigation in modal */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
