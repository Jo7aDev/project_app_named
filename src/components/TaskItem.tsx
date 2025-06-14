import { useState } from 'react'
import { Task } from '../types/Task'
import { useTask } from '../context/TaskContext'
import { Button } from './Button'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask } = useTask()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  const handleSave = () => {
    updateTask(task.id, { title })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      deleteTask(task.id)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <Button onClick={handleSave}>Salvar</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <h3 className="text-lg font-medium">{task.title}</h3>
            <p className="text-sm text-gray-500">Prioridade: {task.priority}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </>
      )}
    </div>
  )
} 