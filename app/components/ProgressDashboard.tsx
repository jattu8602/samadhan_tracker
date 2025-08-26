'use client'

import { CheckCircle, Circle, TrendingUp, Target } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  dayNumber: number
  isCompleted: boolean
  githubUrl: string
}

interface ProgressDashboardProps {
  tasks: Task[]
}

export default function ProgressDashboard({ tasks }: ProgressDashboardProps) {
  const completedTasks = tasks.filter((task) => task.isCompleted)
  const totalTasks = tasks.length
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0

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

  if (totalTasks === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Progress Dashboard
        </h3>
        <div className="text-center py-8">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">No tasks selected yet</p>
          <p className="text-sm text-gray-500">
            Select up to 7 tasks to start tracking your progress
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Progress Dashboard
      </h3>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{totalTasks}</div>
          <div className="text-sm text-blue-600">Total Tasks</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {completedTasks.length}
          </div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {totalTasks - completedTasks.length}
          </div>
          <div className="text-sm text-purple-600">Remaining</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Progress
          </span>
          <span
            className={`text-sm font-bold ${getProgressColor(
              completionPercentage
            )}`}
          >
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${getProgressBarColor(
              completionPercentage
            )}`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3">
          Recent Activity
        </h4>
        <div className="space-y-2">
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
            >
              {task.isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  Day {task.dayNumber.toString().padStart(2, '0')}: {task.title}
                </p>
                <p className="text-xs text-gray-500">
                  {task.isCompleted ? 'Completed' : 'In Progress'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation Message */}
      {completionPercentage > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Keep Going!
            </span>
          </div>
          <p className="text-sm text-blue-700">
            {completionPercentage >= 80
              ? "You're almost there! Great job on your learning journey."
              : completionPercentage >= 50
              ? "You're making excellent progress! Keep up the momentum."
              : 'Great start! Every completed task brings you closer to your goals.'}
          </p>
        </div>
      )}
    </div>
  )
}
