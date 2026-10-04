"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function GiftcardPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[50svh] min-h-[24rem] overflow-hidden">
        <Image
          src="/opal-drop-earrings-red.jpeg"
          alt="Anne Silver jewelry detail"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="relative container flex h-full items-end pb-10 lg:pb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="mb-4 text-5xl text-white">Giftcard</h1>
            <p className="mb-0 max-w-2xl text-lg text-white/90">
              A thoughtful gift, chosen in their own time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary-500 p-10 text-white md:p-16"
          >
            <p className="mb-12 text-sm tracking-[0.24em] text-primary-100 uppercase">Giftcard</p>
            <p className="mb-2 text-3xl">Anne Silver</p>
            <p className="mb-0 text-primary-100">A gift made to be chosen.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-4xl">Give them the choice</h2>
            <p className="text-lg leading-relaxed text-neutral-600">
              Anne Silver giftcards are available in a value of your choice and may be used toward
              any available piece in our collection. We&apos;ll prepare a simple presentation card
              ready for gifting.
            </p>
            <p className="text-lg leading-relaxed text-neutral-600">
              Contact us with your preferred value and recipient details, and we&apos;ll arrange the
              rest.
            </p>
            <Link href="/contact" className="btn btn-primary mt-3">
              Request a Giftcard
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
