"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Heritage() {
  return (
    <section className="bg-gradient-to-br from-secondary-50 to-primary-50/20 py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.85fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="mb-3 text-sm tracking-[0.2em] text-primary-600 uppercase">Our heritage</p>
            <h2 className="brand-accent mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              Heritage in Every Detail
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-neutral-600">
              Our jewelry is more than adornment-it&apos;s a celebration of Ethiopian culture,
              history, and the ancient art of goldsmithing that has been passed down through
              generations.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-neutral-600">
              From the intricate patterns inspired by traditional Ethiopian art to the careful
              selection of materials, each piece tells a story of our rich cultural heritage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <Image
                src="/spreaddecor.jpeg"
                alt="A spread of handcrafted Anne Silver jewelry"
                width={1400}
                height={1050}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
