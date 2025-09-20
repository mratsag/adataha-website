import { NextResponse } from 'next/server'

export async function GET() {
  // Sadece admin için debug endpoint
  const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasServiceRoleKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    supabase: {
      url: hasSupabaseUrl ? 'SET' : 'MISSING',
      serviceRoleKey: hasServiceRoleKey ? 'SET' : 'MISSING',
      anonKey: hasAnonKey ? 'SET' : 'MISSING',
    },
    timestamp: new Date().toISOString()
  })
}
