import type { JewelryFormData, JewelryImage, JewelryPiece } from "@/types/jewelry"
import { logger } from "@/utils/logger"
import { supabase } from "./supabase-client"

export class JewelryService {
  // Get all jewelry pieces with their images and ring sizes
  static async getAllPieces(): Promise<JewelryPiece[]> {
    const { data: pieces, error } = await supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*),
        ring_sizes(*)
      `,
      )
      .order("created_at", { ascending: false })

    if (error) {
      logger.apiError("getAllPieces", error)
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
        images:jewelry_images(*),
        ring_sizes(*)
      `,
      )
      .eq("is_sold", false)
      .order("created_at", { ascending: false })

    if (error) {
      logger.apiError("getAvailablePieces", error)
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
        images:jewelry_images(*),
        ring_sizes(*)
      `,
      )
      .eq("is_featured", true)
      .eq("is_sold", false)
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) {
      logger.apiError("getFeaturedPieces", error)
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
        images:jewelry_images(*),
        ring_sizes(*)
      `,
      )
      .eq("id", id)
      .single()

    if (error) {
      logger.apiError("getPieceById", error, { pieceId: id })
      return null
    }

    return piece
  }

  // Create new jewelry piece
  static async createPiece(data: JewelryFormData): Promise<JewelryPiece> {
    // Separate ring sizes from the main data
    const { available_sizes, ...pieceData } = data

    const { data: piece, error } = await supabase
      .from("jewelry_pieces")
      .insert([pieceData])
      .select()
      .single()

    if (error) {
      logger.apiError("createPiece", error, { pieceData })
      throw new Error("Failed to create jewelry piece")
    }

    // If this is a ring and has available sizes, create the ring size records
    if (piece.category === "rings" && available_sizes && available_sizes.length > 0) {
      await this.addRingSizes(piece.id, available_sizes)
    }

    return piece
  }

  // Update jewelry piece
  static async updatePiece(id: string, data: Partial<JewelryFormData>): Promise<JewelryPiece> {
    // Separate ring sizes from the main data
    const { available_sizes, ...pieceData } = data

    const { data: piece, error } = await supabase
      .from("jewelry_pieces")
      .update(pieceData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      logger.apiError("updatePiece", error, {
        pieceId: id,
        updateData: pieceData,
      })
      throw new Error("Failed to update jewelry piece")
    }

    // If this is a ring and available_sizes is provided, update the ring sizes
    if (piece.category === "rings" && available_sizes !== undefined) {
      // First remove existing sizes
      await this.removeRingSizes(id)
      // Then add new sizes if any
      if (available_sizes.length > 0) {
        await this.addRingSizes(id, available_sizes)
      }
    }

    return piece
  }

  // Mark piece as sold
  static async markAsSold(id: string): Promise<void> {
    const { error } = await supabase.from("jewelry_pieces").update({ is_sold: true }).eq("id", id)

    if (error) {
      logger.apiError("markAsSold", error, { pieceId: id })
      throw new Error("Failed to mark piece as sold")
    }
  }

  // Mark piece as available
  static async markAsAvailable(id: string): Promise<void> {
    const { error } = await supabase.from("jewelry_pieces").update({ is_sold: false }).eq("id", id)

    if (error) {
      logger.apiError("markAsAvailable", error, { pieceId: id })
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
      logger.apiError("deletePiece - fetchImages", fetchError, { pieceId: id })
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
    const { error } = await supabase.from("jewelry_pieces").delete().eq("id", id)

    if (error) {
      logger.apiError("deletePiece", error, { pieceId: id })
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
      logger.apiError("uploadImage", uploadError, {
        fileName: file.name,
        pieceId,
      })
      throw new Error("Failed to upload image")
    }

    const { data } = supabase.storage.from("jewelry-images").getPublicUrl(fileName)

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
      logger.apiError("addImage", error, { jewelryPieceId, imageUrl, altText })
      throw new Error("Failed to add image record")
    }

    return image
  }

  // Helper function to delete image file from Supabase Storage
  private static async deleteImageFromStorage(imageUrl: string): Promise<void> {
    try {
      // Extract the file path from the public URL
      // Public URLs are in format: https://[project-id].supabase.co/storage/v1/object/public/jewelry-images/[file-path]
      const urlParts = imageUrl.split("/storage/v1/object/public/jewelry-images/")
      if (urlParts.length !== 2) {
        logger.error("Invalid image URL format", { imageUrl })
        return
      }

      const filePath = urlParts[1]

      const { error } = await supabase.storage.from("jewelry-images").remove([filePath])

      if (error) {
        logger.apiError("deleteImageFromStorage", error, { imageUrl })
        // Don't throw error here to avoid breaking the main operation
      }
    } catch (error) {
      logger.apiError("deleteImageFromStorage - parse", error, { imageUrl })
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
      logger.apiError("deleteImage - fetchRecord", fetchError, { imageId })
      throw new Error("Failed to fetch image record")
    }

    // Delete the image file from storage
    if (image?.image_url) {
      await this.deleteImageFromStorage(image.image_url)
    }

    // Delete the database record
    const { error } = await supabase.from("jewelry_images").delete().eq("id", imageId)

    if (error) {
      logger.apiError("deleteImage", error, { imageId })
      throw new Error("Failed to delete image record")
    }
  }

  // Search jewelry pieces
  static async searchPieces(
    query: string,
    category?: string,
    gender?: string,
  ): Promise<JewelryPiece[]> {
    let queryBuilder = supabase
      .from("jewelry_pieces")
      .select(
        `
        *,
        images:jewelry_images(*),
        ring_sizes(*)
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

    if (gender) {
      queryBuilder = queryBuilder.eq("gender", gender)
    }

    const { data: pieces, error } = await queryBuilder.order("created_at", {
      ascending: false,
    })

    if (error) {
      logger.apiError("searchPieces", error, { query, category })
      throw new Error("Failed to search jewelry pieces")
    }

    return pieces || []
  }

  // Add ring sizes for a jewelry piece
  static async addRingSizes(jewelryPieceId: string, sizes: number[]): Promise<void> {
    const ringSizeRecords = sizes.map((size) => ({
      jewelry_piece_id: jewelryPieceId,
      size,
    }))

    const { error } = await supabase.from("ring_sizes").insert(ringSizeRecords)

    if (error) {
      logger.apiError("addRingSizes", error, { jewelryPieceId, sizes })
      throw new Error("Failed to add ring sizes")
    }
  }

  // Remove all ring sizes for a jewelry piece
  static async removeRingSizes(jewelryPieceId: string): Promise<void> {
    const { error } = await supabase
      .from("ring_sizes")
      .delete()
      .eq("jewelry_piece_id", jewelryPieceId)

    if (error) {
      logger.apiError("removeRingSizes", error, { jewelryPieceId })
      throw new Error("Failed to remove ring sizes")
    }
  }

  // Get ring sizes for a specific jewelry piece
  static async getRingSizes(jewelryPieceId: string): Promise<number[]> {
    const { data: sizes, error } = await supabase
      .from("ring_sizes")
      .select("size")
      .eq("jewelry_piece_id", jewelryPieceId)
      .order("size", { ascending: true })

    if (error) {
      logger.apiError("getRingSizes", error, { jewelryPieceId })
      throw new Error("Failed to fetch ring sizes")
    }

    return sizes?.map((s) => s.size) || []
  }
}
