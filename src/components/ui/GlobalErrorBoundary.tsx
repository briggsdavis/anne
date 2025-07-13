'use client'

import React from 'react'
import { logger } from '@/utils/logger'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

const DefaultErrorFallback: React.FC<{ error?: Error; reset: () => void }> = ({ 
  error, 
  reset 
}) => (
  <div className="min-h-[400px] flex items-center justify-center p-6">
    <div className="text-center max-w-md mx-auto">
      <div className="mb-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-neutral-600 mb-6">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-4 text-left">
            <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
              Technical Details
            </summary>
            <pre className="mt-2 p-3 bg-neutral-100 rounded text-xs text-neutral-800 overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
      <button
        onClick={reset}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        Try Again
      </button>
    </div>
  </div>
)

class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error
    logger.error('React Error Boundary caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent 
          error={this.state.error} 
          reset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

export default GlobalErrorBoundary