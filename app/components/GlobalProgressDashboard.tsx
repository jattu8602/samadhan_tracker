'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  CheckCircle,
  Circle,
  Trophy,
  Target,
} from 'lucide-react'
import Image from 'next/image'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  imageUrl: string | null
  isCompleted: boolean
  taskId: string
}

interface DayProgress {
  dayNumber: number
  title: string
  description: string
  totalUsers: number
  completedUsers: number
  inProgressUsers: number
  users: User[]
}

interface GlobalProgressData {
  overallProgress: number
  totalUsers: number
  totalTasks: number
  completedTasks: number
  progressByDay: DayProgress[]
}

export default function GlobalProgressDashboard() {
  const [progressData, setProgressData] = useState<GlobalProgressData | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  useEffect(() => {
    loadGlobalProgress()
  }, [])

  const loadGlobalProgress = async () => {
    try {
      const response = await fetch('/api/progress')
      if (response.ok) {
        const data = await response.json()
        setProgressData(data)
      }
    } catch (error) {
      console.error('Error loading global progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!progressData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center">
        <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600">Failed to load global progress</p>
      </div>
    )
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    if (percentage >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    if (percentage >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Users className="h-6 w-6 text-blue-600" />
        Global Progress Dashboard
      </h3>

      {/* Overall Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-600">
            {progressData.totalUsers}
          </div>
          <div className="text-xs text-blue-600">Total Users</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-600">
            {progressData.completedTasks}
          </div>
          <div className="text-xs text-green-600">Completed</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-xl font-bold text-purple-600">
            {progressData.totalTasks}
          </div>
          <div className="text-xs text-purple-600">Total Tasks</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-600">
            {progressData.overallProgress}%
          </div>
          <div className="text-xs text-orange-600">Progress</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Community Progress
          </span>
          <span
            className={`text-sm font-bold ${getProgressColor(
              progressData.overallProgress
            )}`}
          >
            {progressData.overallProgress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor(
              progressData.overallProgress
            )}`}
            style={{ width: `${progressData.overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Progress by Day */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-800 mb-3">
          Progress by Day
        </h4>
        {progressData.progressByDay.map((day) => {
          const dayProgress =
            day.totalUsers > 0
              ? Math.round((day.completedUsers / day.totalUsers) * 100)
              : 0

          return (
            <div
              key={day.dayNumber}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Day {day.dayNumber.toString().padStart(2, '0')}
                  </div>
                  <h5 className="font-medium text-gray-800">{day.title}</h5>
                </div>
                <button
                  onClick={() =>
                    setSelectedDay(
                      selectedDay === day.dayNumber ? null : day.dayNumber
                    )
                  }
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {selectedDay === day.dayNumber ? 'Hide' : 'Show'} Users
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-3">{day.description}</p>

              {/* Day Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">
                    {day.completedUsers}/{day.totalUsers} completed
                  </span>
                  <span
                    className={`text-xs font-medium ${getProgressColor(
                      dayProgress
                    )}`}
                  >
                    {dayProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
                      dayProgress
                    )}`}
                    style={{ width: `${dayProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* User List (Collapsible) */}
              {selectedDay === day.dayNumber && (
                <div className="mt-4 pt-4 border-t">
                  <h6 className="text-sm font-medium text-gray-700 mb-3">
                    Users working on this task:
                  </h6>
                  <div className="grid gap-2">
                    {day.users.map((user) => (
                      <div
                        key={user.taskId}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          {user.imageUrl ? (
                            <Image
                              src={user.imageUrl}
                              alt={`${user.firstName} ${user.lastName}`}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs text-gray-600 font-medium">
                                {user.firstName.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.firstName ||
                                user.email.split('@')[0] ||
                                'Anonymous'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {user.isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Motivation Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-green-600" />
          <span className="text-sm font-medium text-green-800">
            Community Achievement
          </span>
        </div>
        <p className="text-sm text-green-700">
          {progressData.overallProgress >= 80
            ? 'Amazing! The community is making incredible progress together!'
            : progressData.overallProgress >= 50
            ? 'Great teamwork! The community is building momentum.'
            : 'The journey has begun! Every completed task inspires others.'}
        </p>
      </div>
    </div>
  )
}
