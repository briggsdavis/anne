"use client"

import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import AdminGuard from "@/components/admin/admin-guard"
import ErrorAlert, { useErrorAlert } from "@/components/ui/error-alert"
import LoadingSpinner from "@/components/ui/loading-spinner"
import SuccessAlert, { useSuccessAlert } from "@/components/ui/success-alert"
import { WorkshopPriceService, type WorkshopPrice } from "@/lib/workshop-prices"

export default function WorkshopPricesAdminPage() {
  const [prices, setPrices] = useState<WorkshopPrice[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [saving, setSaving] = useState(false)
  const { error, isVisible: showError, showError: displayError, hideError } = useErrorAlert()
  const {
    message: successMessage,
    isVisible: showSuccess,
    showSuccess: displaySuccess,
    hideSuccess,
  } = useSuccessAlert()

  useEffect(() => {
    WorkshopPriceService.getAll()
      .then((data) => {
        setPrices(data)
        setValues(Object.fromEntries(data.map((p) => [p.id, String(p.price)])))
      })
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false))
  }, [])

  const changed = prices.filter((p) => Number(values[p.id]) !== p.price)

  const saveChanges = async () => {
    const invalid = changed.some((p) => {
      const value = values[p.id]?.trim()
      return !value || Number.isNaN(Number(value)) || Number(value) < 0
    })
    if (invalid) {
      displayError("Enter a valid price for every row")
      return
    }

    setSaving(true)
    try {
      const updated = await Promise.all(
        changed.map((p) => WorkshopPriceService.update(p.id, { price: Number(values[p.id]) })),
      )
      const byId = new Map(updated.map((p) => [p.id, p]))
      setPrices((current) => current.map((p) => byId.get(p.id) ?? p))
      displaySuccess("Prices saved")
    } catch {
      displayError("Failed to save prices")
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminGuard>
      <ErrorAlert message={error} isVisible={showError} onClose={hideError} />
      <SuccessAlert message={successMessage} isVisible={showSuccess} onClose={hideSuccess} />
      <div className="min-h-screen bg-neutral-50">
        <div className="border-b border-neutral-200 bg-white">
          <div className="container py-6">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="rounded-lg p-2 transition-colors hover:bg-neutral-100"
                aria-label="Back to admin"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-600" />
              </Link>
              <h1 className="text-3xl font-bold text-neutral-900">Workshop Prices</h1>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {loading ? (
            <LoadingSpinner size="lg" className="py-20" />
          ) : loadError ? (
            <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Failed to load workshop prices. Refresh to try again.
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                <table className="w-full">
                  <thead className="border-b border-neutral-200 bg-neutral-50">
                    <tr>
                      <th className="px-6 py-4 text-left font-medium text-neutral-900">Type</th>
                      <th className="px-6 py-4 text-left font-medium text-neutral-900">Material</th>
                      <th className="px-6 py-4 text-left font-medium text-neutral-900">
                        Price (USD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices.map((price) => (
                      <tr key={price.id} className="border-b border-neutral-100 last:border-0">
                        <td className="px-6 py-3 text-neutral-900">{price.workshop_type}</td>
                        <td className="px-6 py-3 text-neutral-600">{price.material}</td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-neutral-500">$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.05"
                              value={values[price.id] ?? ""}
                              onChange={(e) =>
                                setValues((current) => ({ ...current, [price.id]: e.target.value }))
                              }
                              className="input w-32"
                              aria-label={`${price.workshop_type} ${price.material} price`}
                            />
                            {price.is_starting_price && <span className="text-neutral-500">+</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={saveChanges}
                  disabled={saving || changed.length === 0}
                  className="btn btn-primary"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
