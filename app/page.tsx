'use client'

import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import { CheckCircle, Circle, Github, Trash2 } from 'lucide-react'
import ProgressDashboard from './components/ProgressDashboard'
import LoadingSpinner from './components/LoadingSpinner'
import { useNotifications } from './contexts/NotificationContext'

interface Task {
  id: string
  title: string
  description: string
  dayNumber: number
  isCompleted: boolean
  githubUrl: string
}

const TASK_LIST = [
  {
    day: 1,
    title: 'JavaScript Basics',
    description: 'Variables, types, operators, first Node.js script',
  },
  {
    day: 2,
    title: 'Functions & Loops',
    description: 'Functions, conditionals, loops (for, while, forEach)',
  },
  {
    day: 3,
    title: 'Arrays & Objects',
    description:
      'Array methods (map, filter, reduce), objects and nested objects',
  },
  {
    day: 4,
    title: 'Node.js Intro',
    description:
      'What is Node.js, npm init, installing packages, creating first Node server',
  },
  {
    day: 5,
    title: 'Express.js Basics',
    description: 'Install Express, create routes (GET, POST)',
  },
  {
    day: 6,
    title: 'React Setup',
    description: 'Create React app (Vite), JSX, components, props',
  },
  {
    day: 7,
    title: 'State Management',
    description: 'useState, handling inputs',
  },
  {
    day: 8,
    title: 'Lists & Events',
    description:
      'Rendering lists with .map, handling events (onClick, onChange)',
  },
  {
    day: 9,
    title: 'useEffect & Fetch API',
    description: 'useEffect basics, fetching from Node backend',
  },
  {
    day: 10,
    title: 'Styling',
    description: 'Tailwind CSS setup, component-based styling',
  },
  {
    day: 11,
    title: 'Backend CRUD',
    description: 'Express routes: GET, POST, PUT, DELETE',
  },
  {
    day: 12,
    title: 'React + API',
    description: 'Fetch + render data from backend, add + delete functionality',
  },
  {
    day: 13,
    title: 'Database Basics',
    description: 'Connect Express with DB, store/retrieve data',
  },
  {
    day: 14,
    title: 'Authentication Basics',
    description: 'JWT intro, create login API',
  },
  {
    day: 15,
    title: 'React + Auth',
    description: 'Login form in React, protected routes',
  },
  {
    day: 16,
    title: 'E-commerce Store',
    description: 'Product catalog, shopping cart, payment integration',
  },
  {
    day: 17,
    title: 'Real-time Chat App',
    description: 'Socket.io integration, real-time messaging, user status',
  },
  {
    day: 18,
    title: 'Task Management System',
    description: 'Drag & drop, team collaboration, progress tracking',
  },
  {
    day: 19,
    title: 'Social Media Dashboard',
    description: 'User profiles, posts & comments, like system',
  },
  {
    day: 20,
    title: 'Weather App with Maps',
    description: 'API integration, geolocation, interactive maps',
  },
  {
    day: 21,
    title: 'Portfolio Website',
    description: 'Personal branding, project showcase, contact forms',
  },
]

export default function Home() {
  const { user, isSignedIn } = useUser()
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const { showNotification } = useNotifications()

  useEffect(() => {
    if (isSignedIn && user) {
      loadUserTasks()
    }
  }, [isSignedIn, user])

  const loadUserTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/tasks')
      if (response.ok) {
        const tasks = await response.json()
        setSelectedTasks(tasks)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (dayNumber: number) => {
    if (selectedTasks.length >= 7) {
      showNotification('warning', 'You can only select up to 7 tasks!')
      return
    }

    const taskData = TASK_LIST.find((t) => t.day === dayNumber)
    if (!taskData) return

    const newTask: Omit<Task, 'id'> = {
      title: taskData.title,
      description: taskData.description,
      dayNumber,
      isCompleted: false,
      githubUrl: `https://github.com/taniyaapatel/Samadhan/tree/main/Day-${dayNumber
        .toString()
        .padStart(2, '0')}`,
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      })

      if (response.ok) {
        const savedTask = await response.json()
        setSelectedTasks([...selectedTasks, savedTask])
        showNotification(
          'success',
          `Task "${taskData.title}" added successfully!`
        )
      } else {
        const errorData = await response.json()
        showNotification('error', errorData.error || 'Failed to add task')
      }
    } catch (error) {
      console.error('Error adding task:', error)
      showNotification('error', 'Failed to add task. Please try again.')
    }
  }

  const removeTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const taskToRemove = selectedTasks.find((t) => t.id === taskId)
        setSelectedTasks(selectedTasks.filter((t) => t.id !== taskId))
        showNotification(
          'success',
          `Task "${taskToRemove?.title}" removed successfully!`
        )
      } else {
        showNotification('error', 'Failed to remove task')
      }
    } catch (error) {
      console.error('Error removing task:', error)
      showNotification('error', 'Failed to remove task. Please try again.')
    }
  }

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCompleted: !selectedTasks.find((t) => t.id === taskId)?.isCompleted,
        }),
      })

      if (response.ok) {
        const task = selectedTasks.find((t) => t.id === taskId)
        const newStatus = !task?.isCompleted
        setSelectedTasks(
          selectedTasks.map((t) =>
            t.id === taskId ? { ...t, isCompleted: newStatus } : t
          )
        )
        showNotification(
          'success',
          `Task "${task?.title}" marked as ${
            newStatus ? 'completed' : 'in progress'
          }!`
        )
      } else {
        showNotification('error', 'Failed to update task status')
      }
    } catch (error) {
      console.error('Error updating task:', error)
      showNotification(
        'error',
        'Failed to update task status. Please try again.'
      )
    }
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Samadhan Tracker
          </h1>
          <p className="text-gray-600 mb-6">
            Track your learning progress with GitHub integration
          </p>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Sign In to Continue
            </button>
          </SignInButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Samadhan Tracker
              </h1>
              <p className="text-gray-600">
                Welcome back,{' '}
                {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {selectedTasks.length}/7 tasks selected
              </span>
              <SignOutButton>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>

        {/* Progress Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            {/* Selected Tasks */}
            {loading ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <LoadingSpinner />
              </div>
            ) : selectedTasks.length > 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Your Selected Tasks
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">
                          Day {task.dayNumber.toString().padStart(2, '0')}
                        </h3>
                        <button
                          onClick={() => removeTask(task.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <h4 className="font-medium text-gray-700 mb-2">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="flex items-center gap-2 text-sm"
                        >
                          {task.isCompleted ? (
                            <CheckCircle className="text-green-500" size={20} />
                          ) : (
                            <Circle className="text-gray-400" size={20} />
                          )}
                          {task.isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                        <a
                          href={task.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <Github size={16} />
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  No Tasks Selected
                </h2>
                <p className="text-gray-600 mb-6">
                  Select up to 7 tasks from the list below to start tracking
                  your progress
                </p>
              </div>
            )}
          </div>

          {/* Progress Dashboard Sidebar */}
          <div className="lg:col-span-1">
            <ProgressDashboard tasks={selectedTasks} />
          </div>
        </div>

        {/* Available Tasks */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Available Tasks
          </h2>
          <p className="text-gray-600 mb-6">
            Select up to 7 tasks to track your progress
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TASK_LIST.map((task) => {
              const isSelected = selectedTasks.some(
                (t) => t.dayNumber === task.day
              )
              const isDisabled = !isSelected && selectedTasks.length >= 7

              return (
                <div
                  key={task.day}
                  className={`border rounded-lg p-4 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Day {task.day.toString().padStart(2, '0')}
                    </h3>
                    {isSelected && (
                      <CheckCircle className="text-blue-500" size={20} />
                    )}
                  </div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {task.description}
                  </p>
                  <button
                    onClick={() => addTask(task.day)}
                    disabled={isSelected || isDisabled}
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
                        : isDisabled
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSelected
                      ? 'Selected'
                      : isDisabled
                      ? 'Max Tasks Reached'
                      : 'Add Task'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
