"use client"

import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <motion.footer
      ref={footerRef}
      initial={{ clipPath: "inset(9% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-black text-neutral-300"
    >
      <motion.div className="relative z-10 container py-12" style={{ y: contentY }}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3
              className="text-xl font-semibold text-white"
              style={{ fontFamily: "var(--font-family-secondary)" }}
            >
              Anne Silver
            </h3>
            <p className="text-sm leading-relaxed">
              Celebrating Ethiopian heritage through exquisite handcrafted jewelry. Each piece tells
              a story of tradition, artistry, and timeless elegance.
            </p>

            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/annesilver_ethiopia1/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Anne Silver on Instagram"
                className="text-primary-300 transition-colors hover:text-primary-200"
              >
                <SiInstagram />
              </Link>

              <Link
                href="https://facebook.com/profile.php?id=100067043892540"
                target="_blank"
                className="text-primary-300 transition-colors hover:text-primary-200"
              >
                <SiFacebook />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/shop" className="w-fit text-primary-300 hover:text-primary-200">
                Shop
              </Link>

              <Link href="/bespoke" className="w-fit text-primary-300 hover:text-primary-200">
                Customs and Repairs
              </Link>

              <Link href="/giftcard" className="w-fit text-primary-300 hover:text-primary-200">
                Giftcard
              </Link>

              <Link href="/workshops" className="w-fit text-primary-300 hover:text-primary-200">
                Workshops
              </Link>

              <Link href="/contact" className="w-fit text-primary-300 hover:text-primary-200">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>For inquiries about our jewelry pieces:</p>
              <p className="text-primary-300">annesilverethiopia@gmail.com</p>
              <p className="text-primary-300">+251 91 137 4743</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between border-t border-neutral-800 pt-8">
          <p>
            ©{" "}
            {
              // oxlint-disable-next-line react/purity -- year drift is harmless
              new Date().getFullYear()
            }{" "}
            Anne Silver. All rights reserved.
          </p>

          <p>
            Made by{" "}
            <Link
              href="https://briggsdavis.com"
              target="_blank"
              className="text-primary-300 transition-colors hover:text-primary-200"
            >
              Briggs Davis
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.footer>
  )
}
