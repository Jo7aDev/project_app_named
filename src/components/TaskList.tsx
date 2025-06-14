import { useTask } from '../context/TaskContext'
import { TaskItem } from './TaskItem'

export function TaskList() {
  const { filteredTasks } = useTask()

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
} 