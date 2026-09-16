"use client"

import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"
import React from "react"
import GlobalErrorBoundary from "@/components/ui/global-error-boundary"

const AdminErrorFallback: React.FC<{ error?: Error; reset: () => void }> = ({ error, reset }) => (
  <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
    <div className="mx-auto max-w-lg text-center">
      <div className="mb-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-neutral-900">Admin Dashboard Error</h1>
        <p className="mb-6 text-neutral-600">
          The admin dashboard encountered an unexpected error. This could be due to a network issue,
          database connection problem, or a temporary service disruption.
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <details className="mb-6 text-left">
            <summary className="mb-2 cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
              Technical Details (Development Only)
            </summary>
            <div className="rounded-lg bg-neutral-100 p-4">
              <p className="mb-2 text-sm font-medium text-neutral-800">Error: {error.message}</p>
              <pre className="max-h-40 overflow-auto text-xs text-neutral-700">{error.stack}</pre>
            </div>
          </details>
        )}
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry Dashboard
        </button>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
        >
          <Home className="mr-2 h-4 w-4" />
          Return to Homepage
        </Link>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <p className="text-sm text-neutral-500">
          If this error persists, please contact technical support with the error details above.
        </p>
      </div>
    </div>
  </div>
)

interface AdminErrorBoundaryProps {
  children: React.ReactNode
}

const AdminErrorBoundary: React.FC<AdminErrorBoundaryProps> = ({ children }) => {
  return (
    <GlobalErrorBoundary
      fallback={AdminErrorFallback}
      onError={(error, errorInfo) => {
        // Additional admin-specific error handling could go here
        console.error("Admin dashboard error:", { error, errorInfo })
      }}
    >
      {children}
    </GlobalErrorBoundary>
  )
}

export default AdminErrorBoundary
