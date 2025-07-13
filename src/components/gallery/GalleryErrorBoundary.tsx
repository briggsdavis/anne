'use client'

import React from 'react'
import GlobalErrorBoundary from '@/components/ui/GlobalErrorBoundary'
import { Package, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

const GalleryErrorFallback: React.FC<{ error?: Error; reset: () => void }> = ({ 
  error, 
  reset 
}) => (
  <div className="min-h-[500px] flex items-center justify-center p-6">
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
          <Package className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Gallery Temporarily Unavailable
        </h2>
        <p className="text-neutral-600 mb-6">
          We&apos;re having trouble loading the jewelry collection right now. 
          This could be due to a temporary connection issue.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Return Home
        </Link>
      </div>
      
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
            Error Details
          </summary>
          <pre className="mt-2 p-3 bg-neutral-100 rounded text-xs text-neutral-800 overflow-auto">
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

const GalleryErrorBoundary: React.FC<GalleryErrorBoundaryProps> = ({ children }) => {
  return (
    <GlobalErrorBoundary fallback={GalleryErrorFallback}>
      {children}
    </GlobalErrorBoundary>
  )
}

export default GalleryErrorBoundary