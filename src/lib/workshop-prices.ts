import type { Tables, TablesUpdate } from "@/types/database"
import { logger } from "@/utils/logger"
import { supabase } from "./supabase-client"

export type WorkshopPrice = Tables<"workshop_prices">
export type WorkshopPriceUpdate = TablesUpdate<"workshop_prices">

export class WorkshopPriceService {
  static async getAll(): Promise<WorkshopPrice[]> {
    const { data, error } = await supabase
      .from("workshop_prices")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true })

    if (error) {
      logger.apiError("getWorkshopPrices", error)
      throw new Error("Failed to fetch workshop prices")
    }

    return (data as WorkshopPrice[]) || []
  }

  static async update(id: string, updates: WorkshopPriceUpdate): Promise<WorkshopPrice> {
    const { data, error } = await supabase
      .from("workshop_prices")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      logger.apiError("updateWorkshopPrice", error)
      throw new Error("Failed to update workshop price")
    }

    return data as WorkshopPrice
  }
}
