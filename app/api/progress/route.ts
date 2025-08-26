import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for Vercel
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface DayProgressData {
  dayNumber: number
  title: string
  description: string | null
  totalUsers: number
  completedUsers: number
  inProgressUsers: number
  users: Array<{
    id: string
    firstName: string | null
    lastName: string | null
    email: string
    imageUrl: string | null
    isCompleted: boolean
    taskId: string
  }>
}

// GET /api/progress - Get global progress for all users
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all tasks with user information
    const allTasks = await prisma.task.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [{ dayNumber: 'asc' }, { user: { firstName: 'asc' } }],
    })

    // Get unique users count
    const uniqueUsers = await prisma.user.count()

    // Calculate global statistics
    const totalTasks = allTasks.length
    const completedTasks = allTasks.filter((task) => task.isCompleted).length
    const overallProgress =
      uniqueUsers > 0
        ? Math.round((completedTasks / (totalTasks || 1)) * 100)
        : 0

    // Group tasks by day
    const tasksByDay = allTasks.reduce((acc, task) => {
      const day = task.dayNumber
      if (!acc[day]) {
        acc[day] = {
          dayNumber: day,
          title: task.title,
          description: task.description,
          totalUsers: 0,
          completedUsers: 0,
          inProgressUsers: 0,
          users: [],
        }
      }

      acc[day].totalUsers++
      if (task.isCompleted) {
        acc[day].completedUsers++
      } else {
        acc[day].inProgressUsers++
      }

      acc[day].users.push({
        id: task.user.id,
        firstName: task.user.firstName,
        lastName: task.user.lastName,
        email: task.user.email,
        imageUrl: task.user.imageUrl,
        isCompleted: task.isCompleted,
        taskId: task.id,
      })

      return acc
    }, {} as Record<number, DayProgressData>)

    // Convert to array and sort by day
    const progressData = Object.values(tasksByDay).sort(
      (a, b) => a.dayNumber - b.dayNumber
    )

    return NextResponse.json({
      overallProgress,
      totalUsers: uniqueUsers,
      totalTasks,
      completedTasks,
      progressByDay: progressData,
    })
  } catch (error) {
    console.error('Error fetching global progress:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
