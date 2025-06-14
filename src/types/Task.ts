export interface Task {
  id: string
  title: string
  description: string
  priority: 'baixa' | 'média' | 'alta'
  deadline: string
  completed: boolean
} 