import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import Providers from "@/components/providers/Providers"
import ErrorBoundary from "@/components/ui/ErrorBoundary"
import "@/styles/base.css"
import { Metadata } from "next"
import { GFS_Didot, Nunito_Sans } from "next/font/google"
import { ReactNode } from "react"

const didot = GFS_Didot({ 
  weight: "400", 
  variable: "--font-didot",
  subsets: ["greek"]
})
const nunito = Nunito_Sans({ 
  variable: "--font-nunito",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: { default: "Anne Silver", template: "%s - Anne Silver" },
  description:
    "Exquisite handcrafted Ethiopian jewelry celebrating heritage through timeless elegance. Discover our collection of unique gold and silver pieces.",
  keywords: [
    "Ethiopian jewelry",
    "handcrafted",
    "gold",
    "silver",
    "traditional",
    "Anne Silver",
  ],
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col ${didot.variable} ${nunito.variable}`}
      >
        <Providers>
          <ErrorBoundary>
            <Header />
            <main className="grow">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
