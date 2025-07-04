import "@/styles/base.css"
import { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { ReactNode } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Providers from "@/components/providers/Providers"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
})

export const metadata: Metadata = {
  title: { default: "Anne Silver", template: "%s - Anne Silver" },
  description: "Exquisite handcrafted Ethiopian jewelry celebrating heritage through timeless elegance. Discover our collection of unique gold and silver pieces.",
  keywords: ["Ethiopian jewelry", "handcrafted", "gold", "silver", "traditional", "Anne Silver"],
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.variable} ${playfair.variable}`}>
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
