import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '../../context/TaskContext'
import { TaskForm } from '../../components/TaskForm'
import { TaskList } from '../../components/TaskList'

describe('Fluxo de Tarefas', () => {
  it('deve criar uma tarefa e exibi-la na lista', async () => {
    const user = userEvent.setup()
    render(
      <TaskProvider>
        <TaskForm />
        <TaskList />
      </TaskProvider>
    )

    // Criar uma nova tarefa
    const titleInput = screen.getByLabelText(/título/i)
    const descriptionInput = screen.getByLabelText(/descrição/i)
    const prioritySelect = screen.getByLabelText(/prioridade/i)
    const deadlineInput = screen.getByLabelText(/prazo/i)

    await user.type(titleInput, 'Tarefa de Integração')
    await user.type(descriptionInput, 'Teste de integração completo')
    await user.selectOptions(prioritySelect, 'alta')
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await user.type(deadlineInput, tomorrow.toISOString().slice(0, 16))

    const submitButton = screen.getByRole('button', { name: /criar/i })
    await user.click(submitButton)

    // Verificar se a tarefa aparece na lista
    expect(await screen.findByText('Tarefa de Integração')).toBeInTheDocument()
    expect(screen.getByText(/prioridade: alta/i)).toBeInTheDocument()

    // Filtrar tarefas por prioridade
    const filterSelect = screen.getByLabelText(/filtrar por/i)
    await user.selectOptions(filterSelect, 'alta')

    // Verificar se a tarefa ainda está visível após o filtro
    expect(screen.getByText('Tarefa de Integração')).toBeInTheDocument()

    // Mudar o filtro para baixa e verificar se a tarefa não aparece
    await user.selectOptions(filterSelect, 'baixa')
    expect(screen.queryByText('Tarefa de Integração')).not.toBeInTheDocument()

    console.log('✅ Teste de integração do fluxo de tarefas passou!')
  })
}) 