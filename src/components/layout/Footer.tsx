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
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-white">Quick Links</h4>
            <nav className="space-y-2">
              <Link
                href="/gallery"
                className="block text-sm transition-colors hover:text-primary-400"
              >
                Gallery
              </Link>
              <Link
                href="/about"
                className="block text-sm transition-colors hover:text-primary-400"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm transition-colors hover:text-primary-400"
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

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col items-center justify-between space-y-4 border-t border-neutral-800 pt-8 md:flex-row md:space-y-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Anne Silver. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/admin/login"
              className="transition-colors hover:text-primary-400"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
