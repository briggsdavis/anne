import type {
  JewelryFormData,
  JewelryImage,
  JewelryPiece,
} from "@/types/jewelry"
import { supabase } from "./supabase-client"

export class JewelryService {
  // Get all jewelry pieces with their images
  static async getAllPieces(): Promise<JewelryPiece[]> {
    const { data: pieces, error } = await supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*)
      `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching jewelry pieces:", error)
      throw new Error("Failed to fetch jewelry pieces")
    }

    return pieces || []
  }

  // Get available (not sold) jewelry pieces
  static async getAvailablePieces(): Promise<JewelryPiece[]> {
    const { data: pieces, error } = await supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*)
      `,
      )
      .eq("is_sold", false)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching available jewelry pieces:", error)
      throw new Error("Failed to fetch available jewelry pieces")
    }

    return pieces || []
  }

  // Get featured jewelry pieces
  static async getFeaturedPieces(): Promise<JewelryPiece[]> {
    const { data: pieces, error } = await supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*)
      `,
      )
      .eq("is_featured", true)
      .eq("is_sold", false)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      console.error("Error fetching featured jewelry pieces:", error)
      throw new Error("Failed to fetch featured jewelry pieces")
    }

    return pieces || []
  }

  // Get single jewelry piece by ID
  static async getPieceById(id: string): Promise<JewelryPiece | null> {
    const { data: piece, error } = await supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*)
      `,
      )
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching jewelry piece:", error)
      return null
    }

    return piece
  }

  // Create new jewelry piece
  static async createPiece(data: JewelryFormData): Promise<JewelryPiece> {
    const { data: piece, error } = await supabase
      .from("jewelry_pieces")
      .insert([data])
      .select()
      .single()

    if (error) {
      console.error("Error creating jewelry piece:", error)
      throw new Error("Failed to create jewelry piece")
    }

    return piece
  }

  // Update jewelry piece
  static async updatePiece(
    id: string,
    data: Partial<JewelryFormData>,
  ): Promise<JewelryPiece> {
    const { data: piece, error } = await supabase
      .from("jewelry_pieces")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating jewelry piece:", error)
      throw new Error("Failed to update jewelry piece")
    }

    return piece
  }

  // Mark piece as sold
  static async markAsSold(id: string): Promise<void> {
    const { error } = await supabase
      .from("jewelry_pieces")
      .update({ is_sold: true })
      .eq("id", id)

    if (error) {
      console.error("Error marking piece as sold:", error)
      throw new Error("Failed to mark piece as sold")
    }
  }

  // Mark piece as available
  static async markAsAvailable(id: string): Promise<void> {
    const { error } = await supabase
      .from("jewelry_pieces")
      .update({ is_sold: false })
      .eq("id", id)

    if (error) {
      console.error("Error marking piece as available:", error)
      throw new Error("Failed to mark piece as available")
    }
  }

  // Delete jewelry piece
  static async deletePiece(id: string): Promise<void> {
    // First, get all associated images to delete them from storage
    const { data: images, error: fetchError } = await supabase
      .from("jewelry_images")
      .select("image_url")
      .eq("jewelry_piece_id", id)

    if (fetchError) {
      console.error("Error fetching images for deletion:", fetchError)
      // Continue with piece deletion even if we can't fetch images
    }

    // Delete all associated image files from storage
    if (images && images.length > 0) {
      for (const image of images) {
        if (image.image_url) {
          await this.deleteImageFromStorage(image.image_url)
        }
      }
    }

    // Delete the jewelry piece (this will cascade delete the image records due to foreign key constraint)
    const { error } = await supabase
      .from("jewelry_pieces")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Error deleting jewelry piece:", error)
      throw new Error("Failed to delete jewelry piece")
    }
  }

  // Upload image to Supabase Storage
  static async uploadImage(file: File, pieceId: string): Promise<string> {
    const fileExt = file.name.split(".").pop()
    const fileName = `${pieceId}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("jewelry-images")
      .upload(fileName, file)

    if (uploadError) {
      console.error("Error uploading image:", uploadError)
      throw new Error("Failed to upload image")
    }

    const { data } = supabase.storage
      .from("jewelry-images")
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  // Add image record to database
  static async addImage(
    jewelryPieceId: string,
    imageUrl: string,
    altText: string,
    isPrimary: boolean = false,
    displayOrder: number = 0,
  ): Promise<JewelryImage> {
    const { data: image, error } = await supabase
      .from("jewelry_images")
      .insert([
        {
          jewelry_piece_id: jewelryPieceId,
          image_url: imageUrl,
          alt_text: altText,
          is_primary: isPrimary,
          display_order: displayOrder,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error adding image record:", error)
      throw new Error("Failed to add image record")
    }

    return image
  }

  // Helper function to delete image file from Supabase Storage
  private static async deleteImageFromStorage(imageUrl: string): Promise<void> {
    try {
      // Extract the file path from the public URL
      // Public URLs are in format: https://[project-id].supabase.co/storage/v1/object/public/jewelry-images/[file-path]
      const urlParts = imageUrl.split('/storage/v1/object/public/jewelry-images/')
      if (urlParts.length !== 2) {
        console.error("Invalid image URL format:", imageUrl)
        return
      }
      
      const filePath = urlParts[1]
      
      const { error } = await supabase.storage
        .from("jewelry-images")
        .remove([filePath])

      if (error) {
        console.error("Error deleting image from storage:", error)
        // Don't throw error here to avoid breaking the main operation
      }
    } catch (error) {
      console.error("Error parsing image URL or deleting from storage:", error)
    }
  }

  // Delete image
  static async deleteImage(imageId: string): Promise<void> {
    // First, get the image record to retrieve the URL
    const { data: image, error: fetchError } = await supabase
      .from("jewelry_images")
      .select("image_url")
      .eq("id", imageId)
      .single()

    if (fetchError) {
      console.error("Error fetching image record:", fetchError)
      throw new Error("Failed to fetch image record")
    }

    // Delete the image file from storage
    if (image?.image_url) {
      await this.deleteImageFromStorage(image.image_url)
    }

    // Delete the database record
    const { error } = await supabase
      .from("jewelry_images")
      .delete()
      .eq("id", imageId)

    if (error) {
      console.error("Error deleting image record:", error)
      throw new Error("Failed to delete image record")
    }
  }

  // Search jewelry pieces
  static async searchPieces(
    query: string,
    category?: string,
  ): Promise<JewelryPiece[]> {
    let queryBuilder = supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*)
      `,
      )
      .eq("is_sold", false)

    if (query) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,materials.cs.{${query}}`,
      )
    }

    if (category) {
      queryBuilder = queryBuilder.eq("category", category)
    }

    const { data: pieces, error } = await queryBuilder.order("created_at", {
      ascending: false,
    })

    if (error) {
      console.error("Error searching jewelry pieces:", error)
      throw new Error("Failed to search jewelry pieces")
    }

    return pieces || []
  }
}
