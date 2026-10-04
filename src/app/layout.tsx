import { Metadata } from "next"
import { Amita, Playfair_Display } from "next/font/google"
import { ReactNode } from "react"
import Footer from "@/components/layout/footer"
import "@/styles/base.css"
import Header from "@/components/layout/header"
import Providers from "@/components/providers/providers"
import ErrorBoundary from "@/components/ui/error-boundary"
import PageTransition from "@/components/ui/page-transition"
import ScrollReveal from "@/components/ui/scroll-reveal"

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
})
const amita = Amita({
  weight: ["400", "700"],
  variable: "--font-amita",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: { default: "Anne Silver", template: "%s - Anne Silver" },
  description:
    "Exquisite handcrafted Ethiopian jewelry celebrating heritage through timeless elegance. Discover our collection of unique gold and silver pieces.",
  keywords: ["Ethiopian jewelry", "handcrafted", "gold", "silver", "traditional", "Anne Silver"],
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${playfair.variable} ${amita.variable}`}>
        <Providers>
          <ErrorBoundary>
            <Header />
            <main className="grow overflow-hidden">
              <ErrorBoundary>
                <PageTransition>{children}</PageTransition>
                <ScrollReveal />
              </ErrorBoundary>
            </main>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
