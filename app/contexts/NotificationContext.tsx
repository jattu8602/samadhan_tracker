'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import Notification, { NotificationType } from '../components/Notification'

interface NotificationItem {
  id: string
  type: NotificationType
  message: string
  duration?: number
}

interface NotificationContextType {
  showNotification: (
    type: NotificationType,
    message: string,
    duration?: number
  ) => void
  hideNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(
      'useNotifications must be used within a NotificationProvider'
    )
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])

  const showNotification = (
    type: NotificationType,
    message: string,
    duration = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: NotificationItem = { id, type, message, duration }

    setNotifications((prev) => [...prev, newNotification])
  }

  const hideNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    )
  }

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification }}
    >
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}
