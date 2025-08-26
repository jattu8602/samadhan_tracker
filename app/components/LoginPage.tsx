'use client'

import { SignInButton } from '@clerk/nextjs'
import { BookOpen, Code, Github, Users, Target, TrendingUp } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">
                  Samadhan Tracker
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Track Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Learning Journey
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg lg:max-w-none">
                Join a community of learners tracking their progress through the
                Samadhan curriculum. Monitor your daily achievements and see how
                others are progressing.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Daily Progress
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Github className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  GitHub Integration
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Community
                </span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Analytics
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <SignInButton mode="modal">
              <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                <span>Get Started Now</span>
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </SignInButton>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome Back!
                </h3>
                <p className="text-gray-600">
                  Sign in to continue your learning journey
                </p>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    JavaScript Basics
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    ✓ Completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">React Setup</span>
                  <span className="text-sm font-medium text-blue-600">
                    In Progress
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: '65%' }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Node.js Backend</span>
                  <span className="text-sm font-medium text-gray-600">
                    Not Started
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-300 h-2 rounded-full"
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">21</div>
                  <div className="text-xs text-gray-500">Total Days</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">7</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-purple-600">33%</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-8 text-gray-500">
        <p className="text-sm">
          Join thousands of developers building their skills with Samadhan
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
