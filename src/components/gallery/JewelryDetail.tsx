'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronLeft, ChevronRight, Mail, ExternalLink } from 'lucide-react'
import type { JewelryPiece } from '@/types/jewelry'

interface JewelryDetailProps {
  piece: JewelryPiece
}

export default function JewelryDetail({ piece }: JewelryDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const images = piece.images?.sort((a, b) => {
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
      `Hello,\n\nI'm interested in learning more about the "${piece.title}" piece from your collection.\n\nCould you please provide more information?\n\nThank you!`
    )
    window.open(`mailto:info@annesilver.com?subject=${subject}&body=${body}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container py-4">
          <Link 
            href="/gallery"
            className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {images.length > 0 ? (
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                  <Image
                    src={images[currentImageIndex].image_url}
                    alt={images[currentImageIndex].alt_text}
                    fill
                    className="object-cover cursor-zoom-in"
                    onClick={() => setIsImageModalOpen(true)}
                    priority
                  />
                  
                  {piece.is_sold && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-medium">
                        SOLD
                      </span>
                    </div>
                  )}

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-neutral-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-neutral-700" />
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
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? 'border-primary-500'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Image
                          src={image.image_url}
                          alt={image.alt_text}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-square bg-neutral-200 rounded-2xl flex items-center justify-center">
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
                className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 brand-accent"
                style={{ fontFamily: 'var(--font-family-secondary)' }}
              >
                {piece.title}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  ETB {piece.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
                {piece.is_sold && (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium">
                    SOLD
                  </span>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-md text-sm font-medium capitalize">
                {piece.category}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">Description</h2>
              <p className="text-neutral-600 leading-relaxed whitespace-pre-wrap">
                {piece.description}
              </p>
            </div>

            {/* Materials */}
            {piece.materials.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">Materials</h2>
                <div className="flex flex-wrap gap-2">
                  {piece.materials.map((material, index) => (
                    <span
                      key={index}
                      className="inline-block bg-secondary-100 text-secondary-700 px-3 py-1 rounded-md text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Craftsmanship Info */}
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="font-semibold text-neutral-900 mb-2">Ethiopian Craftsmanship</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                This piece is handcrafted by skilled Ethiopian artisans using traditional techniques 
                passed down through generations. Each creation celebrates our rich cultural heritage 
                and represents hours of meticulous work and attention to detail.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!piece.is_sold ? (
                <button
                  onClick={handleInquiry}
                  className="btn btn-primary w-full"
                >
                  <Mail className="w-4 h-4" />
                  Inquire About This Piece
                </button>
              ) : (
                <div className="text-center p-4 bg-neutral-100 rounded-lg">
                  <p className="text-neutral-600 font-medium">This piece has been sold</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Contact us for similar pieces or custom commissions
                  </p>
                </div>
              )}
              
              <Link href="/contact" className="btn btn-outline w-full">
                <ExternalLink className="w-4 h-4" />
                Contact Us
              </Link>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-neutral-500 space-y-1">
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={images[currentImageIndex].image_url}
                alt={images[currentImageIndex].alt_text}
                width={800}
                height={800}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Close button */}
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 rotate-45" />
              </button>

              {/* Navigation in modal */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      prevImage()
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextImage()
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
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