// Re-export client functions
export { createClient, supabase } from "./supabase-client"

// Re-export server functions
export { createServerSupabaseClient } from "./supabase-server"

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      jewelry_pieces: {
        Row: {
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
          admin_notes: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          category: string
          materials: string[]
          is_sold?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
          admin_notes?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          category?: string
          materials?: string[]
          is_sold?: boolean
          is_featured?: boolean
          created_at?: string
          updated_at?: string
          admin_notes?: string | null
        }
      }
      jewelry_images: {
        Row: {
          id: string
          jewelry_piece_id: string
          image_url: string
          alt_text: string
          is_primary: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          jewelry_piece_id: string
          image_url: string
          alt_text: string
          is_primary?: boolean
          display_order: number
          created_at?: string
        }
        Update: {
          id?: string
          jewelry_piece_id?: string
          image_url?: string
          alt_text?: string
          is_primary?: boolean
          display_order?: number
          created_at?: string
        }
      }
    }
  }
}
