"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const ML = motion.create(Link)

const categories = [
  { name: "Earrings", slug: "earrings", image: "/earrings.png" },
  { name: "Necklaces", slug: "necklaces", image: "/necklaces.png" },
  { name: "Rings", slug: "rings", image: "/rings.png" },
  { name: "Bracelets", slug: "bracelets", image: "/bracelets.png" },
  { name: "Crosses", slug: "crosses", image: "/crosses.png" },
  { name: "Sets", slug: "sets", image: "/sets.png" },
]

function Card({ index }: { index: number }) {
  const { name, slug, image } = categories[index]
  const portrait = index === 0 || index == 5

  return (
    <ML
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.01 }}
      viewport={{ once: true }}
      href={`/gallery?category=${slug}`}
      className={`group relative block overflow-hidden rounded-xl ${portrait ? "aspect-[1/2] w-1/2" : "aspect-[2/1] w-full"}`}
    >
      <Image
        src={image}
        alt={`${name} Collection`}
        fill
        sizes="(max-width: 1024px) 50vw, 400px"
        className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 rounded-xl bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="mb-0 text-white">{name}</p>
      </div>
    </ML>
  )
}

export default function CategoryGrid() {
  return (
    <div className="flex flex-col items-center py-16 lg:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="brand-accent"
      >
        Shop by Category
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 max-w-2xl text-center"
      >
        Explore our carefully curated collections, each designed to celebrate
        different aspects of Ethiopian jewelry artistry.
      </motion.p>

      <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
        <div className="flex gap-6">
          <Card index={0} />

          <div className="w-full space-y-6">
            <Card index={1} />
            <Card index={2} />
          </div>
        </div>

        <div className="my-16 text-center">
          <h2>Sparkle up Your Life</h2>

          <p className="mx-auto max-w-3xl">
            Discover unique jewelry collections crafted to showcase Ethiopian
            heritage, elegance, and timeless artistry.
          </p>
        </div>

        <div className="flex gap-6">
          <div className="w-full space-y-6">
            <Card index={3} />
            <Card index={4} />
          </div>

          <Card index={5} />
        </div>
      </div>
    </div>
  )
}
