import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import { logger } from '@/utils/logger'

export async function GET() {
  try {
    // Create Supabase client
    logger.debug('Creating Supabase server client')
    const supabase = await createServerSupabaseClient()
    
    // Get the current user
    logger.debug('Getting current user from Supabase')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      logger.warn('Supabase auth error', { error: authError.message })
      return NextResponse.json({ isAuthenticated: false, reason: 'Authentication error' }, { status: 401 })
    }
    
    if (!user) {
      logger.debug('No authenticated user found')
      return NextResponse.json({ isAuthenticated: false, reason: 'No user authenticated' }, { status: 401 })
    }

    // Log successful authentication
    logger.authEvent('User authentication verified', { userEmail: user.email })

    return NextResponse.json({ 
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email
      }
    })
  } catch (error) {
    logger.apiError('admin-check', error, { 
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : String(error)
    })
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          details: error instanceof Error ? error.message : String(error)
        })
      }, 
      { status: 500 }
    )
  }
}