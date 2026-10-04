"use client"

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const slides = ["/hero.jpeg", "/hero1.jpeg", "/hero2.jpeg"]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])

  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      5000,
    )
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100svh-5rem)] min-h-[38rem] overflow-hidden"
    >
      <motion.div className="absolute inset-x-0 -inset-y-[12%]" style={{ y: imageY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={slides[activeSlide]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={slides[activeSlide]}
              alt="Anne Silver handcrafted jewelry"
              fill
              priority={activeSlide === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
      <div className="relative flex h-full flex-col justify-end">
        <div className="mx-auto max-w-3xl px-8 pt-0 pb-6 text-center md:pb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 text-sm leading-relaxed text-white drop-shadow md:text-base"
          >
            Celebrating our rich heritage through handcrafted pieces that tell stories of
            <br /> tradition, artistry, and elegance.
          </motion.p>
          <Link href="/shop" className="btn btn-primary btn-sm text-sm">
            Explore Collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
