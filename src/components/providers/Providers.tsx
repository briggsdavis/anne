'use client'

import { SupabaseAuthProvider } from '@/components/providers/SupabaseAuthProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SupabaseAuthProvider>
      {children}
    </SupabaseAuthProvider>
  )
}