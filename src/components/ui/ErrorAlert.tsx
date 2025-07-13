"use client"

import { AlertCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

interface ErrorAlertProps {
  message: string
  isVisible: boolean
  onClose: () => void
  autoHide?: boolean
  duration?: number
}

export default function ErrorAlert({ 
  message, 
  isVisible, 
  onClose, 
  autoHide = true, 
  duration = 5000 
}: ErrorAlertProps) {
  const [show, setShow] = useState(isVisible)

  useEffect(() => {
    setShow(isVisible)
    
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        setShow(false)
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, duration, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg max-w-md">
        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
        <p className="text-sm text-red-800 flex-1">{message}</p>
        <button
          onClick={() => {
            setShow(false)
            onClose()
          }}
          className="text-red-600 hover:text-red-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Hook for managing error alerts
export function useErrorAlert() {
  const [error, setError] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)

  const showError = (message: string) => {
    setError(message)
    setIsVisible(true)
  }

  const hideError = () => {
    setIsVisible(false)
    setError("")
  }

  return {
    error,
    isVisible,
    showError,
    hideError,
  }
}