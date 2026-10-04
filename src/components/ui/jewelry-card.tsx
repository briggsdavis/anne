"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { JewelryPiece } from "@/types/jewelry"

interface JewelryCardProps {
  piece: JewelryPiece
  priority?: boolean
}

export default function JewelryCard({ piece, priority = false }: JewelryCardProps) {
  const primaryImage = piece.images?.find((img) => img.is_primary) || piece.images?.[0]

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
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
                priority={priority}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-neutral-100">
                <span className="text-sm text-neutral-400">No image</span>
              </div>
            )}
            {piece.is_sold && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <span className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white">
                  SOLD
                </span>
              </div>
            )}
          </div>

          <div className="product-info">
            <h3 className="product-title overflow-hidden overflow-ellipsis whitespace-nowrap">
              {piece.title}
            </h3>
            <p className="product-price">
              ETB{" "}
              {piece.price.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
