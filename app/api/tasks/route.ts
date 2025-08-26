import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET /api/tasks - Get all tasks for the authenticated user
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      // For now, create user with basic info from userId
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: `user-${userId}@example.com`,
          firstName: 'User',
          lastName: '',
          imageUrl: '',
        },
      })
    }

    const tasks = await prisma.task.findMany({
      where: { userId: user.id },
      orderBy: { dayNumber: 'asc' },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, dayNumber, isCompleted, githubUrl } = body

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    })

    if (!user) {
      // For now, create user with basic info from userId
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: `user-${userId}@example.com`,
          firstName: 'User',
          lastName: '',
          imageUrl: '',
        },
      })
    }

    // Check if user already has 7 tasks
    const existingTasksCount = await prisma.task.count({
      where: { userId: user.id },
    })

    if (existingTasksCount >= 7) {
      return NextResponse.json(
        { error: 'Maximum 7 tasks allowed' },
        { status: 400 }
      )
    }

    // Check if task for this day already exists
    const existingTask = await prisma.task.findFirst({
      where: {
        userId: user.id,
        dayNumber: dayNumber,
      },
    })

    if (existingTask) {
      return NextResponse.json(
        { error: 'Task for this day already exists' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dayNumber,
        isCompleted,
        githubUrl,
        userId: user.id,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
