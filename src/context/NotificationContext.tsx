import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTask } from './TaskContext'

interface Notification {
  id: string
  message: string
  read: boolean
  timestamp: number
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { tasks } = useTask()

  useEffect(() => {
    // Verificar tarefas próximas do prazo e atrasadas
    const now = new Date()
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    tasks.forEach(task => {
      if (task.deadline) {
        const deadline = new Date(task.deadline)
        
        // Tarefa atrasada
        if (deadline < now) {
          addNotification(`A tarefa "${task.title}" está atrasada`)
        }
        // Tarefa próxima do prazo (menos de 24 horas)
        else if (deadline <= oneDayFromNow) {
          addNotification(`A tarefa "${task.title}" está próxima do prazo`)
        }
      }
    })
  }, [tasks])

  const addNotification = (message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      read: false,
      timestamp: Date.now(),
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification deve ser usado dentro de um NotificationProvider')
  }
  return context
} 