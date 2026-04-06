"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Eye, EyeOff, LogIn } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuth } from "@/components/providers/SupabaseAuthProvider"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const { signInWithEmail } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const { error } = await signInWithEmail(data.email, data.password)

      if (!error) {
        router.push("/admin")
      } else {
        setErrorMessage(error)
      }
    } catch {
      setErrorMessage("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-lg">
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <h1
              className="brand-accent mb-2 text-3xl font-bold text-neutral-900"
              style={{ fontFamily: "var(--font-family-secondary)" }}
            >
              Anne Silver
            </h1>
            <p className="text-neutral-600">Admin Login</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
            >
              <p className="text-sm text-red-700">{errorMessage}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="input"
                placeholder="Enter admin email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-neutral-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input pr-12"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <LogIn className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-neutral-500">Anne Silver Admin Portal</p>
          </div>
        </div>

        {/* Back to site link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
          >
            ← Back to website
          </Link>
        </div>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute top-20 right-10 h-20 w-20 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 opacity-10 blur-xl" />
      <div className="absolute bottom-20 left-10 h-32 w-32 rounded-full bg-gradient-to-br from-secondary-400 to-primary-400 opacity-10 blur-2xl" />
    </div>
  )
}
