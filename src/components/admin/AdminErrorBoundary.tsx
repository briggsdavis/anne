'use client'

import React from 'react'
import GlobalErrorBoundary from '@/components/ui/GlobalErrorBoundary'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

const AdminErrorFallback: React.FC<{ error?: Error; reset: () => void }> = ({ 
  error, 
  reset 
}) => (
  <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
    <div className="text-center max-w-lg mx-auto">
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">
          Admin Dashboard Error
        </h1>
        <p className="text-neutral-600 mb-6">
          The admin dashboard encountered an unexpected error. This could be due to a network issue, 
          database connection problem, or a temporary service disruption.
        </p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700 mb-2">
              Technical Details (Development Only)
            </summary>
            <div className="p-4 bg-neutral-100 rounded-lg">
              <p className="text-sm font-medium text-neutral-800 mb-2">
                Error: {error.message}
              </p>
              <pre className="text-xs text-neutral-700 overflow-auto max-h-40">
                {error.stack}
              </pre>
            </div>
          </details>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Dashboard
        </button>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <Home className="w-4 h-4 mr-2" />
          Return to Homepage
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200">
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
        console.error('Admin dashboard error:', { error, errorInfo })
      }}
    >
      {children}
    </GlobalErrorBoundary>
  )
}

export default AdminErrorBoundary