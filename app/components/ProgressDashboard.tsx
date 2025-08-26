'use client'

import {
  CheckCircle,
  Circle,
  TrendingUp,
  Target,
  Award,
  Calendar,
} from 'lucide-react'

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
    if (percentage >= 80) return 'bg-gradient-to-r from-green-500 to-green-600'
    if (percentage >= 60)
      return 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    if (percentage >= 40)
      return 'bg-gradient-to-r from-orange-500 to-orange-600'
    return 'bg-gradient-to-r from-red-500 to-red-600'
  }

  const getMotivationMessage = (percentage: number) => {
    if (percentage >= 80)
      return "You're almost there! Great job on your learning journey."
    if (percentage >= 60)
      return "You're making excellent progress! Keep up the momentum."
    if (percentage >= 40)
      return 'Great start! Every completed task brings you closer to your goals.'
    if (percentage >= 20) return 'Keep going! Every step forward counts.'
    return "The journey of a thousand miles begins with a single step. You've got this!"
  }

  if (totalTasks === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Progress Dashboard
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium">No tasks selected yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Select up to 7 tasks to start tracking your progress
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Target className="h-5 w-5 text-blue-600" />
        Progress Dashboard
      </h3>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {totalTasks}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Total Tasks
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-700">
                {completedTasks.length}
              </div>
              <div className="text-sm text-green-600 font-medium">
                Completed
              </div>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-700" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">
                {totalTasks - completedTasks.length}
              </div>
              <div className="text-sm text-purple-600 font-medium">
                Remaining
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-700">
            Overall Progress
          </span>
          <span
            className={`text-lg font-bold ${getProgressColor(
              completionPercentage
            )}`}
          >
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ease-out ${getProgressBarColor(
              completionPercentage
            )}`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Achievement Badge */}
      {completionPercentage > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800">
                {completionPercentage >= 80
                  ? 'Master Learner'
                  : completionPercentage >= 60
                  ? 'Advanced Learner'
                  : completionPercentage >= 40
                  ? 'Intermediate Learner'
                  : completionPercentage >= 20
                  ? 'Beginner Learner'
                  : 'New Learner'}
              </h4>
              <p className="text-sm text-yellow-700">
                {getMotivationMessage(completionPercentage)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          Recent Activity
        </h4>
        <div className="space-y-3">
          {tasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                {task.isCompleted ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Circle className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
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
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Keep Going!
            </span>
          </div>
          <p className="text-sm text-blue-700">
            {getMotivationMessage(completionPercentage)}
          </p>
        </div>
      )}
    </div>
  )
}
