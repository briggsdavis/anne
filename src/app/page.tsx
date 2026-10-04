import About from "@/components/home/about"
import CategoryGrid from "@/components/home/category-grid"
import FeaturedPieces from "@/components/home/featured-pieces"
import Heritage from "@/components/home/heritage"
import Hero from "@/components/home/hero"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPieces />
      <About />
      <CategoryGrid />
      <Heritage />
    </>
  )
}
