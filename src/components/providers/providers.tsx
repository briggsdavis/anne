"use client"

import { SupabaseAuthProvider } from "@/components/providers/supabase-auth-provider"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <SupabaseAuthProvider>{children}</SupabaseAuthProvider>
}
