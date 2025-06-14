import { useTask } from '../context/TaskContext'
import { TaskList } from '../components/TaskList'
import { TaskForm } from '../components/TaskForm'

export function Diary() {
  const { tasks } = useTask()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Diário de Tarefas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
          <TaskForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tarefas ({tasks.length})</h2>
          <TaskList />
        </div>
      </div>
    </div>
  )
}