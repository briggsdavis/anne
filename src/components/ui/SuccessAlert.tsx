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
  duration = 3000 
}: SuccessAlertProps) {
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
      <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 shadow-lg max-w-md">
        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800 flex-1">{message}</p>
        <button
          onClick={() => {
            setShow(false)
            onClose()
          }}
          className="text-green-600 hover:text-green-800 transition-colors"
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