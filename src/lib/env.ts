import { z } from "zod"
import { logger } from "@/utils/logger"

// Define environment variable schema
const envSchema = z.object({
  // Next.js environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Supabase configuration (client-side)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Invalid Supabase URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "Supabase anonymous key is required"),
})

// Type for validated environment variables
export type Env = z.infer<typeof envSchema>

let validatedEnv: Env | null = null

/**
 * Validate and return environment variables
 * This function caches the result after first validation
 */
export function getEnv(): Env {
  if (validatedEnv) {
    return validatedEnv
  }

  try {
    validatedEnv = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })

    return validatedEnv
  } catch (error) {
    logger.error("Environment validation failed", {
      error: error instanceof Error ? error.message : String(error),
    })

    throw new Error(
      "Invalid environment configuration. Please check your environment variables.",
    )
  }
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === "development"
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return getEnv().NODE_ENV === "production"
}

/**
 * Get Supabase configuration
 */
export function getSupabaseConfig() {
  const env = getEnv()
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

/**
 * Validate environment on app startup
 * Call this early in your app initialization
 */
export function validateEnvironment() {
  try {
    getEnv()
    logger.info("Environment validation successful")
  } catch (error) {
    logger.error("Environment validation failed during startup", { error })
    // In production, we might want to exit the process
    if (isProduction()) {
      process.exit(1)
    }
    throw error
  }
}
