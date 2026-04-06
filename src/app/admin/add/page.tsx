"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Save, Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import AdminGuard from "@/components/admin/AdminGuard"
import ErrorAlert, { useErrorAlert } from "@/components/ui/ErrorAlert"
import SuccessAlert, { useSuccessAlert } from "@/components/ui/SuccessAlert"
import { JewelryService } from "@/lib/jewelry"
import {
  COMMON_MATERIALS,
  JEWELRY_CATEGORIES,
  JEWELRY_GENDERS,
  RING_SIZES,
} from "@/types/jewelry"
import { sanitizeJewelryFormData } from "@/utils/sanitize"

const jewelrySchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  materials: z.array(z.string()).min(1, "At least one material is required"),
  is_featured: z.boolean(),
  admin_notes: z.string().optional(),
  gender: z.string().optional(),
  available_sizes: z.array(z.number()).optional(),
})

type JewelryFormData = z.infer<typeof jewelrySchema>

export default function AddJewelryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const router = useRouter()

  const {
    error,
    isVisible: showError,
    showError: displayError,
    hideError,
  } = useErrorAlert()
  const {
    message: successMessage,
    isVisible: showSuccess,
    showSuccess: displaySuccess,
    hideSuccess,
  } = useSuccessAlert()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<JewelryFormData>({
    resolver: zodResolver(jewelrySchema),
    defaultValues: {
      materials: [],
      is_featured: false,
      available_sizes: [],
    },
  })

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    control,
    name: "materials",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    // Validate file count
    if (files.length + images.length > 5) {
      displayError("Maximum 5 images allowed")
      return
    }

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (!validTypes.includes(file.type)) {
        displayError(
          `Invalid file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`,
        )
        return false
      }

      if (file.size > maxSize) {
        displayError(`File too large: ${file.name}. Maximum size is 10MB.`)
        return false
      }

      return true
    })

    if (validFiles.length === 0) return

    setImages((prev) => [...prev, ...validFiles])

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const addMaterial = (material: string) => {
    if (material) {
      // Check if material already exists by examining the form values
      const currentMaterials = materialFields
        .map(
          (_, index) =>
            (
              document.querySelector(
                `input[name="materials.${index}"]`,
              ) as HTMLInputElement
            )?.value,
        )
        .filter(Boolean)

      if (!currentMaterials.includes(material)) {
        appendMaterial(material)
      }
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Clear ring sizes if not selecting rings
    if (category !== "rings") {
      setSelectedSizes([])
      setValue("available_sizes", [])
    }
  }

  const handleSizeToggle = (size: number) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size].sort((a, b) => a - b)

    setSelectedSizes(newSizes)
    setValue("available_sizes", newSizes)
  }

  const onSubmit = async (data: JewelryFormData) => {
    if (images.length === 0) {
      displayError("Please add at least one image")
      return
    }

    setIsSubmitting(true)

    try {
      // Sanitize form data before submission
      const sanitizedData = {
        ...sanitizeJewelryFormData(data),
        price: data.price,
        is_featured: data.is_featured,
      }

      // Create the jewelry piece first
      const piece = await JewelryService.createPiece(sanitizedData)

      // Upload images
      for (let i = 0; i < images.length; i++) {
        const imageUrl = await JewelryService.uploadImage(images[i], piece.id)
        await JewelryService.addImage(
          piece.id,
          imageUrl,
          `${piece.title} - Image ${i + 1}`,
          i === 0, // First image is primary
          i,
        )
      }

      displaySuccess("Jewelry piece created successfully!")
      setTimeout(() => router.push("/admin"), 1500)
    } catch (error) {
      console.error("Error creating jewelry piece:", error)
      displayError("Error creating jewelry piece. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminGuard>
      <ErrorAlert message={error} isVisible={showError} onClose={hideError} />
      <SuccessAlert
        message={successMessage}
        isVisible={showSuccess}
        onClose={hideSuccess}
      />
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white">
          <div className="container py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Add New Piece
                </h1>
                <p className="mt-1 text-neutral-600">
                  Create a new jewelry piece for your collection
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="title"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Title
                    </label>
                    <input
                      {...register("title")}
                      type="text"
                      id="title"
                      className="input"
                      placeholder="e.g., Golden Ethiopian Cross Necklace"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Price (ETB)
                    </label>
                    <input
                      {...register("price", { valueAsNumber: true })}
                      type="number"
                      step="0.01"
                      id="price"
                      className="input"
                      placeholder="15000.00"
                    />
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Category
                    </label>
                    <select
                      {...register("category")}
                      id="category"
                      className="input"
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {JEWELRY_CATEGORIES.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Target Gender (Optional)
                    </label>
                    <select
                      {...register("gender")}
                      id="gender"
                      className="input"
                    >
                      <option value="">Not specified</option>
                      {JEWELRY_GENDERS.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      id="description"
                      rows={4}
                      className="input resize-none"
                      placeholder="Describe the piece, its inspiration, materials, and craftsmanship..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900">
                  Materials
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Common Materials (click to add)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COMMON_MATERIALS.map((material) => (
                        <button
                          key={material}
                          type="button"
                          onClick={() => addMaterial(material)}
                          className="rounded-md bg-neutral-100 px-3 py-1 text-sm text-neutral-700 transition-colors hover:bg-primary-100 hover:text-primary-700"
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Selected Materials
                    </label>
                    <div className="space-y-2">
                      {materialFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            {...register(`materials.${index}` as const)}
                            className="input flex-1"
                            placeholder="Enter material"
                          />
                          <button
                            type="button"
                            onClick={() => removeMaterial(index)}
                            className="rounded-md p-2 text-red-600 transition-colors hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => appendMaterial("")}
                        className="btn btn-outline btn-sm"
                      >
                        <Plus className="h-4 w-4" />
                        Add Material
                      </button>
                    </div>
                    {errors.materials && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.materials.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Ring Sizes (only for rings category) */}
              {selectedCategory === "rings" && (
                <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                  <h2 className="mb-6 text-xl font-semibold text-neutral-900">
                    Available Ring Sizes
                  </h2>

                  <div className="space-y-4">
                    <p className="text-sm text-neutral-600">
                      Select all available sizes for this ring (US sizes):
                    </p>

                    <div className="grid grid-cols-6 gap-3 md:grid-cols-8">
                      {RING_SIZES.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                            selectedSizes.includes(size)
                              ? "border-primary-500 bg-primary-50 text-primary-700"
                              : "border-neutral-300 bg-white text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {selectedSizes.length > 0 && (
                      <div className="rounded-md bg-neutral-50 p-3">
                        <p className="text-sm text-neutral-600">
                          Selected sizes: {selectedSizes.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Images */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900">
                  Images
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-neutral-700">
                      Upload Images (Max 5)
                    </label>
                    <div className="relative rounded-lg border-2 border-dashed border-neutral-300 p-6 text-center transition-colors hover:border-primary-400">
                      <Upload className="mx-auto mb-2 h-8 w-8 text-neutral-400" />
                      <p className="mb-2 text-neutral-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-neutral-500">
                        PNG, JPG up to 10MB each
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    </div>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div>
                      <p className="mb-2 text-sm font-medium text-neutral-700">
                        Preview
                      </p>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="group relative aspect-square"
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              fill
                              unoptimized
                              className="rounded-lg border border-neutral-200 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2">
                                <span className="rounded bg-primary-600 px-2 py-1 text-xs text-white">
                                  Primary
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900">
                  Settings
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        {...register("is_featured")}
                        type="checkbox"
                        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-neutral-700">
                        Feature this piece on homepage
                      </span>
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="admin_notes"
                      className="mb-2 block text-sm font-medium text-neutral-700"
                    >
                      Admin Notes (Private)
                    </label>
                    <textarea
                      {...register("admin_notes")}
                      id="admin_notes"
                      rows={3}
                      className="input resize-none"
                      placeholder="Private notes for admin use..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <Link href="/admin" className="btn btn-outline">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Create Piece
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AdminGuard>
  )
}
