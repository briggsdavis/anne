'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import JewelryCard from '@/components/ui/JewelryCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { JewelryService } from '@/lib/jewelry'
import type { JewelryPiece } from '@/types/jewelry'

export default function FeaturedPieces() {
  const [pieces, setPieces] = useState<JewelryPiece[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedPieces() {
      try {
        const featuredPieces = await JewelryService.getFeaturedPieces()
        setPieces(featuredPieces)
      } catch (error) {
        console.error('Error loading featured pieces:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedPieces()
  }, [])

  if (loading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 brand-accent">
            Featured Collection
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our most treasured pieces, each one carefully crafted 
            to showcase the beauty of Ethiopian artistry.
          </p>
        </motion.div>

        {pieces.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {pieces.map((piece, index) => (
                <JewelryCard
                  key={piece.id}
                  piece={piece}
                  priority={index < 3}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/gallery" className="btn btn-primary">
                View All Pieces
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">
              No featured pieces available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}