export interface JewelryPiece {
  id: string
  title: string
  description: string
  price: number
  category: string
  materials: string[]
  is_sold: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  admin_notes?: string | null
  gender?: string | null
  images?: JewelryImage[]
  ring_sizes?: RingSize[]
}

export interface JewelryImage {
  id: string
  jewelry_piece_id: string
  image_url: string
  alt_text: string
  is_primary: boolean
  display_order: number
  created_at: string
}

export interface RingSize {
  id: string
  jewelry_piece_id: string
  size: number
  created_at: string
}

export interface JewelryFormData {
  title: string
  description: string
  price: number
  category: string
  materials: string[]
  is_featured: boolean
  admin_notes?: string
  gender?: string
  available_sizes?: number[]
}

export type JewelryCategory =
  | "necklaces"
  | "rings"
  | "earrings"
  | "bracelets"
  | "crosses"
  | "sets"

export type JewelryGender = "male" | "female"

export const JEWELRY_CATEGORIES: { value: JewelryCategory; label: string }[] = [
  { value: "rings", label: "Rings" },
  { value: "crosses", label: "Crosses" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelets", label: "Bracelets" },
  { value: "necklaces", label: "Necklaces" },
  { value: "sets", label: "Jewelry Sets" },
]

export const JEWELRY_GENDERS: { value: JewelryGender; label: string }[] = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

export const COMMON_MATERIALS = [
  "18K Gold",
  "22K Gold",
  "Sterling Silver",
  "Gold-Plated Silver",
  "Ethiopian Opal",
  "Traditional Craftsmanship",
  "Filigree Work",
  "Gold Accents",
  "Handcrafted",
  "Gemstones",
]

export const RING_SIZES: number[] = [
  3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13
]
