"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url(/hero.png)",
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex h-[35rem] flex-col justify-end bg-gradient-to-b from-transparent to-black/30">
        <div className="mx-auto max-w-3xl px-8 py-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 max-w-lg text-lg leading-relaxed text-white md:text-xl"
          >
            Celebrating our rich heritage through handcrafted pieces that tell
            stories of tradition, artistry, and elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link href="/gallery" className="btn btn-primary btn-lg">
              Explore Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
