import { Facebook, Instagram } from "lucide-react"
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
              Celebrating Ethiopian heritage through exquisite handcrafted
              jewelry. Each piece tells a story of tradition, artistry, and
              timeless elegance.
            </p>

            <div className="flex gap-4">
              <Link
                href="https://instagram.com/annesilver_ethiopia1"
                target="_blank"
              >
                <Instagram />
              </Link>

              <Link
                href="https://facebook.com/profile.php?id=100067043892540"
                target="_blank"
              >
                <Facebook />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Quick Links</h4>
            <nav className="space-y-2">
              <Link
                href="/gallery"
                className="block w-fit text-sm transition-colors hover:text-primary-400"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="block w-fit text-sm transition-colors hover:text-primary-400"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block w-fit text-sm transition-colors hover:text-primary-400"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Contact</h4>
            <div className="space-y-2 text-sm">
              <p>For inquiries about our jewelry pieces:</p>
              <p className="text-primary-400">annesilverethiopia@gmail.com</p>
              <p className="text-primary-400">+251 91 137 4743</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid border-t border-neutral-800 pt-8 md:grid-cols-3">
          <Link
            href="/admin/login"
            className="mb-4 h-fit w-fit transition-colors hover:text-primary-400 md:mb-0"
          >
            Admin
          </Link>

          <p className="md:justify-self-center">
            © {new Date().getFullYear()} Anne Silver. All rights reserved.
          </p>

          <p className="md:justify-self-end">
            Made by{" "}
            <Link href="https://briggsdavis.com" target="_blank">
              Briggs Davis
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
