'use client'

import { useAuth } from '@/components/providers/SupabaseAuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import AdminErrorBoundary from './AdminErrorBoundary'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { loading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we've finished loading auth and user is not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, loading, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Show loading while redirecting unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <AdminErrorBoundary>{children}</AdminErrorBoundary>
}