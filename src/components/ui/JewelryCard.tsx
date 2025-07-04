'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { JewelryPiece } from '@/types/jewelry'

interface JewelryCardProps {
  piece: JewelryPiece
  priority?: boolean
}

export default function JewelryCard({ piece, priority = false }: JewelryCardProps) {
  const primaryImage = piece.images?.find(img => img.is_primary) || piece.images?.[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/gallery/${piece.id}`}>
        <div className="product-card">
          <div className="product-image">
            {primaryImage ? (
              <Image
                src={primaryImage.image_url}
                alt={primaryImage.alt_text}
                fill
                className="object-cover"
                priority={priority}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-neutral-100">
                <span className="text-neutral-400 text-sm">No image</span>
              </div>
            )}
            {piece.is_sold && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                  SOLD
                </span>
              </div>
            )}
          </div>
          
          <div className="product-info">
            <h3 className="product-title">{piece.title}</h3>
            <p className="product-price">
              ETB {piece.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
            <p className="product-description line-clamp-2">
              {piece.description}
            </p>
            
            {piece.materials.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {piece.materials.slice(0, 2).map((material, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-md"
                  >
                    {material}
                  </span>
                ))}
                {piece.materials.length > 2 && (
                  <span className="inline-block text-neutral-500 text-xs px-2 py-1">
                    +{piece.materials.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}