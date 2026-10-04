"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          {/* Source: https://unsplash.com/photos/a-view-of-a-city-with-a-lot-of-tall-buildings-Yx1akv9YI5E */}
          <Image
            src="https://images.unsplash.com/photo-1734865934450-719ef6f59a37?auto=format&fit=crop&w=1800&q=85"
            alt="Addis Ababa cityscape"
            fill
            sizes="(max-width: 1024px) 90vw, 60vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-sm tracking-[0.2em] text-primary-600 uppercase">Our story</p>
          <h2 className="mb-6 text-4xl">Made in Addis Ababa</h2>
          <p className="text-lg leading-relaxed text-neutral-600">
            Anne Silver began as a small Addis Ababa workshop with a simple purpose: to preserve the
            beauty of Ethiopian silversmithing while giving traditional forms a contemporary life.
          </p>
          <p className="text-lg leading-relaxed text-neutral-600">
            What started at one jeweler&apos;s bench has grown into a close community of artisans.
            Every piece is still shaped by hand, carrying the marks, stories, and patient skill of
            the people who make it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
