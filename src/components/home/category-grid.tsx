"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const ML = motion.create(Link)

const categories = [
  { name: "Earrings", slug: "earrings", image: "/silver-drop-earring-on-model.png" },
  { name: "Necklaces", slug: "necklaces", image: "/silver-pendant-on-brown-shirt.png" },
  { name: "Rings", slug: "rings", image: "/silver-gemstone-rings-on-hands.png" },
  { name: "Bracelets", slug: "bracelets", image: "/silver-bangle-and-filigree-ring.png" },
  { name: "Crosses", slug: "crosses", image: "/ethiopian-cross-pendant-on-model.png" },
  { name: "Sets", slug: "sets", image: "/round-stone-earring-and-pendant-set.png" },
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
      href={`/shop?category=${slug}`}
      className={`group relative block overflow-hidden ${portrait ? "aspect-[1/2] w-1/2" : "aspect-[2/1] w-full"}`}
    >
      <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-105">
        <Image
          src={image}
          alt={`${name} Collection`}
          fill
          sizes="(max-width: 1024px) 50vw, 400px"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="mb-0 text-white">{name}</p>
      </div>
    </ML>
  )
}

export default function CategoryGrid() {
  return (
    <div className="py-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mb-10 grid items-end gap-6 md:grid-cols-2"
      >
        <h2 className="brand-accent mb-0 text-left">Shop by Category</h2>

        <p className="mb-0 max-w-2xl text-left md:justify-self-end">
          Explore our carefully curated collections, each designed to celebrate different aspects of
          Ethiopian jewelry artistry.
        </p>
      </motion.div>

      <div className="container">
        <div className="flex gap-6">
          <Card index={0} />

          <div className="w-full space-y-6">
            <Card index={1} />
            <Card index={2} />
          </div>
        </div>

        <div className="my-10 grid items-end gap-6 md:grid-cols-2">
          <h2 className="mb-0 text-left">Sparkle up Your Life</h2>

          <p className="mb-0 max-w-2xl text-left md:justify-self-end">
            Discover unique jewelry collections crafted to showcase Ethiopian heritage, elegance,
            and timeless artistry.
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
