import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Task } from '../types/Task'
import { taskApi } from '../api/taskApi'

interface TaskContextType {
  tasks: Task[]
  filteredTasks: Task[]
  createTask: (task: Omit<Task, 'id'>) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  filterTasks: (priority: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    if (!filter) {
      setFilteredTasks(tasks)
    } else {
      setFilteredTasks(tasks.filter(task => task.priority === filter))
    }
  }, [tasks, filter])

  const loadTasks = async () => {
    try {
      const loadedTasks = await taskApi.getTasks()
      setTasks(loadedTasks)
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error)
    }
  }

  const createTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await taskApi.createTask(task)
      setTasks(prev => [...prev, newTask])
    } catch (error) {
      console.error('Erro ao criar tarefa:', error)
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await taskApi.updateTask(id, updates)
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await taskApi.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error)
    }
  }

  const filterTasks = (priority: string) => {
    setFilter(priority)
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      createTask,
      updateTask,
      deleteTask,
      filterTasks
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask deve ser usado dentro de um TaskProvider')
  }
  return context
}