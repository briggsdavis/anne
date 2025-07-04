'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-primary-50/30 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 brand-pattern opacity-5"></div>
      
      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Exquisite{' '}
              <span className="text-primary-600 brand-accent">Ethiopian</span>{' '}
              Jewelry
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed"
          >
            Celebrating our rich heritage through handcrafted pieces that tell stories 
            of tradition, artistry, and timeless elegance. Each creation is a testament 
            to Ethiopian craftsmanship.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/gallery" className="btn btn-primary btn-lg">
              Explore Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link href="/about" className="btn btn-outline btn-lg">
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-secondary-400 to-primary-400 rounded-full opacity-10 blur-2xl"
      />
    </section>
  )
}