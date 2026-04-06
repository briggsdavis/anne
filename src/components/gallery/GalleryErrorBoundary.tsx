"use client"

import { Package, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import React from "react"
import GlobalErrorBoundary from "@/components/ui/GlobalErrorBoundary"

const GalleryErrorFallback: React.FC<{ error?: Error; reset: () => void }> = ({
  error,
  reset,
}) => (
  <div className="flex min-h-[500px] items-center justify-center p-6">
    <div className="mx-auto max-w-md text-center">
      <div className="mb-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
          <Package className="h-8 w-8 text-primary-600" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-neutral-900">
          Gallery Temporarily Unavailable
        </h2>
        <p className="mb-6 text-neutral-600">
          We&apos;re having trouble loading the jewelry collection right now.
          This could be due to a temporary connection issue.
        </p>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </button>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
        >
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Link>
      </div>

      {process.env.NODE_ENV === "development" && error && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
            Error Details
          </summary>
          <pre className="mt-2 overflow-auto rounded bg-neutral-100 p-3 text-xs text-neutral-800">
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  </div>
)

interface GalleryErrorBoundaryProps {
  children: React.ReactNode
}

const GalleryErrorBoundary: React.FC<GalleryErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <GlobalErrorBoundary fallback={GalleryErrorFallback}>
      {children}
    </GlobalErrorBoundary>
  )
}

export default GalleryErrorBoundary
