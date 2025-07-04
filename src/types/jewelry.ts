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
  images?: JewelryImage[]
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

export interface JewelryFormData {
  title: string
  description: string
  price: number
  category: string
  materials: string[]
  is_featured: boolean
  admin_notes?: string
}

export type JewelryCategory = 'necklace' | 'ring' | 'earrings' | 'bracelet' | 'pendant' | 'set'

export const JEWELRY_CATEGORIES: { value: JewelryCategory; label: string }[] = [
  { value: 'necklace', label: 'Necklace' },
  { value: 'ring', label: 'Ring' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'bracelet', label: 'Bracelet' },
  { value: 'pendant', label: 'Pendant' },
  { value: 'set', label: 'Jewelry Set' },
]

export const COMMON_MATERIALS = [
  '18K Gold',
  '22K Gold',
  'Sterling Silver',
  'Gold-Plated Silver',
  'Ethiopian Opal',
  'Traditional Craftsmanship',
  'Filigree Work',
  'Gold Accents',
  'Handcrafted',
  'Gemstones',
]