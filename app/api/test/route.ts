import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      hasClerkKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      hasClerkSecret: !!process.env.CLERK_SECRET_KEY,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasGithubToken: !!process.env.GITHUB_TOKEN,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    }

    return NextResponse.json({
      message: 'Test API endpoint working',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      status: 'success',
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Test API endpoint error',
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 'error',
      },
      { status: 500 }
    )
  }
}
