"use client"

import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container py-12">
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
                href="https://instagram.com/annesilver_ethiopia1"
                target="_blank"
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
              <Link href="/gallery" className="w-fit text-primary-300 hover:text-primary-200">
                Gallery
              </Link>

              <Link href="/custom" className="w-fit text-primary-300 hover:text-primary-200">
                Custom
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
          <p>© {new Date().getFullYear()} Anne Silver. All rights reserved.</p>

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
      </div>
    </footer>
  )
}
