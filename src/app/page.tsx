import CategoryGrid from "@/components/home/CategoryGrid"
import FeaturedPieces from "@/components/home/FeaturedPieces"
import Heritage from "@/components/home/Heritage"
import Hero from "@/components/home/Hero"

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPieces />
      <CategoryGrid />
      <Heritage />
    </>
  )
}
