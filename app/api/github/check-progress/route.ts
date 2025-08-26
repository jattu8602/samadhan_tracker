import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/github/check-progress - Check GitHub repository for task completion
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const dayNumber = searchParams.get('day')

    if (!dayNumber) {
      return NextResponse.json(
        { error: 'Day number is required' },
        { status: 400 }
      )
    }

    const repoOwner = process.env.GITHUB_REPO_OWNER
    const repoName = process.env.GITHUB_REPO_NAME 
    const githubToken = process.env.GITHUB_TOKEN

    if (!githubToken) {
      return NextResponse.json(
        {
          error: 'GitHub token not configured',
          message: 'Please add GITHUB_TOKEN to your environment variables',
        },
        { status: 500 }
      )
    }

    // Check if the Day-XX folder exists and has content
    const folderName = `Day-${dayNumber.padStart(2, '0')}`

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderName}`,
        {
          headers: {
            Authorization: `token ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Samadhan-Tracker-App',
          },
        }
      )

      if (response.status === 404) {
        return NextResponse.json({
          dayNumber: parseInt(dayNumber),
          folderExists: false,
          hasContent: false,
          message: `Folder ${folderName} does not exist yet`,
        })
      }

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const contents = await response.json()

      // Check if the folder has meaningful content (files, not just empty)
      const hasContent = Array.isArray(contents) && contents.length > 0

      // Check for specific file types that indicate progress
      const hasCodeFiles =
        Array.isArray(contents) &&
        contents.some(
          (item: { type: string; name: string }) =>
            item.type === 'file' &&
            (item.name.endsWith('.js') ||
              item.name.endsWith('.ts') ||
              item.name.endsWith('.jsx') ||
              item.name.endsWith('.tsx') ||
              item.name.endsWith('.html') ||
              item.name.endsWith('.css') ||
              item.name.endsWith('.json') ||
              item.name.endsWith('.md'))
        )

      return NextResponse.json({
        dayNumber: parseInt(dayNumber),
        folderExists: true,
        hasContent,
        hasCodeFiles,
        fileCount: Array.isArray(contents) ? contents.length : 0,
        message: hasCodeFiles
          ? `Folder ${folderName} exists with code files`
          : `Folder ${folderName} exists but may not have code files yet`,
      })
    } catch (githubError) {
      console.error('GitHub API error:', githubError)
      return NextResponse.json(
        {
          dayNumber: parseInt(dayNumber),
          folderExists: false,
          hasContent: false,
          error: 'Failed to check GitHub repository',
          message: 'Unable to verify task progress on GitHub',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error checking GitHub progress:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
