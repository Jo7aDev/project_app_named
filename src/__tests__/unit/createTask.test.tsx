import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '../../context/TaskContext'
import { TaskForm } from '../../components/TaskForm'
import { TaskList } from '../../components/TaskList'

describe('Criar Tarefa', () => {
  it('deve criar uma nova tarefa com sucesso', async () => {
    const user = userEvent.setup()
    render(
      <TaskProvider>
        <TaskForm />
        <TaskList />
      </TaskProvider>
    )

    // Preencher o formulário
    const titleInput = screen.getByLabelText(/título/i)
    const descriptionInput = screen.getByLabelText(/descrição/i)
    const prioritySelect = screen.getByLabelText(/prioridade/i)
    const deadlineInput = screen.getByLabelText(/prazo/i)

    await user.type(titleInput, 'Nova Tarefa')
    await user.type(descriptionInput, 'Descrição da tarefa')
    await user.selectOptions(prioritySelect, 'alta')
    
    // Definir prazo para amanhã
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await user.type(deadlineInput, tomorrow.toISOString().slice(0, 16))

    // Submeter o formulário
    const submitButton = screen.getByRole('button', { name: /criar/i })
    await user.click(submitButton)

    // Verificar se a tarefa foi criada
    expect(await screen.findByText('Nova Tarefa')).toBeInTheDocument()
    expect(screen.getByText(/prioridade: alta/i)).toBeInTheDocument()
    console.log('✅ Teste de criação de tarefa passou!')
  })
}) 