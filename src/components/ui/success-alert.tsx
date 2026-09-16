"use client"

import { CheckCircle, X } from "lucide-react"
import { useEffect, useState } from "react"

interface SuccessAlertProps {
  message: string
  isVisible: boolean
  onClose: () => void
  autoHide?: boolean
  duration?: number
}

export default function SuccessAlert({
  message,
  isVisible,
  onClose,
  autoHide = true,
  duration = 3000,
}: SuccessAlertProps) {
  useEffect(() => {
    if (isVisible && autoHide) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHide, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="animate-in slide-in-from-right fixed top-4 right-4 z-50 duration-300">
      <div className="flex max-w-md items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 shadow-lg">
        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
        <p className="flex-1 text-sm text-green-800">{message}</p>
        <button
          onClick={onClose}
          aria-label="Dismiss success message"
          className="text-green-600 transition-colors hover:text-green-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// Hook for managing success alerts
export function useSuccessAlert() {
  const [message, setMessage] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)

  const showSuccess = (msg: string) => {
    setMessage(msg)
    setIsVisible(true)
  }

  const hideSuccess = () => {
    setIsVisible(false)
    setMessage("")
  }

  return {
    message,
    isVisible,
    showSuccess,
    hideSuccess,
  }
}
