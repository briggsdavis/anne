import { Metadata } from "next"
import { notFound } from "next/navigation"
import JewelryDetail from "@/components/gallery/JewelryDetail"
import { JewelryService } from "@/lib/jewelry"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const piece = await JewelryService.getPieceById(id)

    if (!piece) {
      return {
        title: "Piece Not Found",
        description: "The requested jewelry piece could not be found.",
      }
    }

    return {
      title: piece.title,
      description: piece.description,
      openGraph: {
        title: `${piece.title} - Anne Silver`,
        description: piece.description,
        images: piece.images?.map((img) => img.image_url) || [],
      },
    }
  } catch {
    return {
      title: "Piece Not Found",
      description: "The requested jewelry piece could not be found.",
    }
  }
}

export default async function JewelryDetailPage({ params }: Props) {
  try {
    const { id } = await params
    const piece = await JewelryService.getPieceById(id)

    if (!piece) {
      notFound()
    }

    return <JewelryDetail piece={piece} />
  } catch {
    notFound()
  }
}
