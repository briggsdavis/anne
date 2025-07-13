"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Heritage() {
  return (
    <section className="bg-gradient-to-br from-secondary-50 to-primary-50/20 py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="brand-accent mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              Heritage in Every Detail
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-neutral-600">
              Our jewelry is more than adornment-it&apos;s a celebration of
              Ethiopian culture, history, and the ancient art of goldsmithing
              that has been passed down through generations.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-neutral-600">
              From the intricate patterns inspired by traditional Ethiopian art
              to the careful selection of materials, each piece tells a story of
              our rich cultural heritage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/case.jpg"
                alt="Ethiopian Heritage - Traditional Craftsmanship"
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative patterns */}
            <div className="brand-pattern absolute -top-4 -left-4 h-8 w-8 rounded-lg opacity-60"></div>
            <div className="brand-pattern absolute -right-4 -bottom-4 h-12 w-12 rounded-lg opacity-40"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
