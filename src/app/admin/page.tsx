"use client"

import AdminGuard from "@/components/admin/AdminGuard"
import { useAuth } from "@/components/providers/SupabaseAuthProvider"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { JewelryService } from "@/lib/jewelry"
import type { JewelryPiece } from "@/types/jewelry"
import { motion } from "framer-motion"
import {
  DollarSign,
  Edit3,
  ExternalLink,
  Eye,
  LogOut,
  Package,
  Plus,
  Settings,
  Trash2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function AdminPage() {
  const [pieces, setPieces] = useState<JewelryPiece[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    featured: 0,
    totalValue: 0,
  })
  const { signOut } = useAuth()

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const allPieces = await JewelryService.getAllPieces()
        setPieces(allPieces)

        // Calculate stats
        const available = allPieces.filter((p) => !p.is_sold).length
        const sold = allPieces.filter((p) => p.is_sold).length
        const featured = allPieces.filter((p) => p.is_featured).length
        const totalValue = allPieces
          .filter((p) => !p.is_sold)
          .reduce((sum, p) => sum + p.price, 0)

        setStats({
          total: allPieces.length,
          available,
          sold,
          featured,
          totalValue,
        })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const handleToggleSoldStatus = async (id: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await JewelryService.markAsAvailable(id)
      } else {
        await JewelryService.markAsSold(id)
      }

      // Refresh data
      const allPieces = await JewelryService.getAllPieces()
      setPieces(allPieces)
    } catch (error) {
      console.error("Error updating sold status:", error)
    }
  }

  const handleDeletePiece = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this piece? This action cannot be undone.",
      )
    ) {
      return
    }

    try {
      await JewelryService.deletePiece(id)

      // Refresh data
      const allPieces = await JewelryService.getAllPieces()
      setPieces(allPieces)
    } catch (error) {
      console.error("Error deleting piece:", error)
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="border-b border-neutral-200 bg-white">
          <div className="container py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                  Admin Dashboard
                </h1>
                <p className="mt-1 text-neutral-600">
                  Manage your jewelry collection
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Link href="/" target="_blank" className="btn btn-ghost btn-sm">
                  <ExternalLink className="h-4 w-4" />
                  View Site
                </Link>

                <button onClick={signOut} className="btn btn-outline btn-sm">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {loading ? (
            <LoadingSpinner size="lg" className="py-20" />
          ) : (
            <>
              {/* Stats Cards */}
              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Total Pieces</p>
                      <p className="text-2xl font-bold text-neutral-900">
                        {stats.total}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-primary-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Available</p>
                      <p className="text-2xl font-bold text-green-600">
                        {stats.available}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Sold</p>
                      <p className="text-2xl font-bold text-red-600">
                        {stats.sold}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-red-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Featured</p>
                      <p className="text-2xl font-bold text-primary-600">
                        {stats.featured}
                      </p>
                    </div>
                    <Settings className="h-8 w-8 text-primary-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Total Value</p>
                      <p className="text-2xl font-bold text-neutral-900">
                        ETB {stats.totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary-600" />
                  </div>
                </motion.div>
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8 flex items-center justify-between"
              >
                <h2 className="text-xl font-semibold text-neutral-900">
                  Inventory Management
                </h2>

                <Link href="/admin/add" className="btn btn-primary">
                  <Plus className="h-4 w-4" />
                  Add New Piece
                </Link>
              </motion.div>

              {/* Inventory Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
              >
                {pieces.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-neutral-200 bg-neutral-50">
                        <tr>
                          <th className="px-6 py-4 text-left font-medium text-neutral-900">
                            Piece
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-neutral-900">
                            Category
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-neutral-900">
                            Price
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-neutral-900">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-neutral-900">
                            Featured
                          </th>
                          <th className="px-6 py-4 text-left font-medium text-neutral-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pieces.map((piece) => (
                          <tr
                            key={piece.id}
                            className="border-b border-neutral-100 hover:bg-neutral-50"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <div className="relative h-12 w-12 flex-shrink-0 rounded-lg bg-neutral-200">
                                  {piece.images?.[0] && (
                                    <Image
                                      src={piece.images[0].image_url}
                                      alt={piece.images[0].alt_text}
                                      fill
                                      className="h-full w-full rounded-lg object-cover"
                                    />
                                  )}
                                </div>
                                <div>
                                  <p className="line-clamp-1 font-medium text-neutral-900">
                                    {piece.title}
                                  </p>
                                  <p className="line-clamp-1 text-sm text-neutral-600">
                                    {piece.description}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-block rounded-md bg-neutral-100 px-2 py-1 text-xs text-neutral-700 capitalize">
                                {piece.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium">
                              ETB {piece.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() =>
                                  handleToggleSoldStatus(
                                    piece.id,
                                    piece.is_sold,
                                  )
                                }
                                className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${
                                  piece.is_sold
                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                    : "bg-green-100 text-green-700 hover:bg-green-200"
                                }`}
                              >
                                {piece.is_sold ? "SOLD" : "AVAILABLE"}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {piece.is_featured && (
                                <span className="inline-block rounded-md bg-primary-100 px-2 py-1 text-xs text-primary-700">
                                  Featured
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <Link
                                  href={`/gallery/${piece.id}`}
                                  target="_blank"
                                  className="rounded-md p-2 text-neutral-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                                  title="View piece"
                                >
                                  <Eye className="h-4 w-4" />
                                </Link>
                                <Link
                                  href={`/admin/edit/${piece.id}`}
                                  className="rounded-md p-2 text-neutral-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                  title="Edit piece"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </Link>
                                <button
                                  onClick={() => handleDeletePiece(piece.id)}
                                  className="rounded-md p-2 text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
                                  title="Delete piece"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Package className="mx-auto mb-4 h-12 w-12 text-neutral-400" />
                    <h3 className="mb-2 text-lg font-medium text-neutral-900">
                      No jewelry pieces yet
                    </h3>
                    <p className="mb-4 text-neutral-600">
                      Start by adding your first piece to the collection.
                    </p>
                    <Link href="/admin/add" className="btn btn-primary">
                      <Plus className="h-4 w-4" />
                      Add New Piece
                    </Link>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
