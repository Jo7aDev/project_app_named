import { Task } from '../types/Task'

// Simulação de um banco de dados em memória
let tasks: Task[] = []

// Simulação de delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const taskApi = {
  // Método para testes
  resetTasks() {
    tasks = []
  },

  // Buscar todas as tarefas
  async getTasks(): Promise<Task[]> {
    await delay(100) // Simula delay de rede
    return [...tasks]
  },

  // Criar uma nova tarefa
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    await delay(100)
    const newTask: Task = {
      id: Date.now().toString(),
      ...task
    }
    tasks.push(newTask)
    return newTask
  },

  // Atualizar uma tarefa existente
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    await delay(100)
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Tarefa não encontrada')
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates }
    return tasks[taskIndex]
  },

  // Excluir uma tarefa
  async deleteTask(id: string): Promise<void> {
    await delay(100)
    const taskIndex = tasks.findIndex(task => task.id === id)
    if (taskIndex === -1) {
      throw new Error('Tarefa não encontrada')
    }
    tasks.splice(taskIndex, 1)
  }
} 