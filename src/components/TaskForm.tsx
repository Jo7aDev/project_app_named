import React, { useState } from 'react'
import { useTask } from '../context/TaskContext'

export function TaskForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'baixa' | 'média' | 'alta'>('média')
  const [deadline, setDeadline] = useState('')
  const { addTask } = useTask()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask({ title, description, priority, deadline: new Date(deadline) })
    setTitle('')
    setDescription('')
    setPriority('média')
    setDeadline('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="priority">Prioridade:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'baixa' | 'média' | 'alta')}
        >
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div>
        <label htmlFor="deadline">Prazo:</label>
        <input
          id="deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <button type="submit">Criar Tarefa</button>
    </form>
  )
} 