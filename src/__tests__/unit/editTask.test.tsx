import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '../../context/TaskContext'
import { TaskList } from '../../components/TaskList'
import { TaskForm } from '../../components/TaskForm'

describe('Editar Tarefa', () => {
  it('deve editar uma tarefa existente com sucesso', async () => {
    const user = userEvent.setup()
    render(
      <TaskProvider>
        <TaskForm />
        <TaskList />
      </TaskProvider>
    )

    // Primeiro criar uma tarefa para editar
    const titleInput = screen.getByLabelText(/título/i)
    const descriptionInput = screen.getByLabelText(/descrição/i)
    const prioritySelect = screen.getByLabelText(/prioridade/i)
    const deadlineInput = screen.getByLabelText(/prazo/i)

    await user.type(titleInput, 'Tarefa Original')
    await user.type(descriptionInput, 'Descrição original')
    await user.selectOptions(prioritySelect, 'média')
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await user.type(deadlineInput, tomorrow.toISOString().slice(0, 16))

    const submitButton = screen.getByRole('button', { name: /criar/i })
    await user.click(submitButton)

    // Agora editar a tarefa
    const taskItem = screen.getByText('Tarefa Original').closest('li')
    const editButton = taskItem?.querySelector('button')
    if (!editButton) throw new Error('Botão de editar não encontrado')
    await user.click(editButton)

    // Editar apenas o título
    const editTitleInput = screen.getByDisplayValue('Tarefa Original')
    await user.clear(editTitleInput)
    await user.type(editTitleInput, 'Tarefa Editada')

    // Salvar as alterações
    const saveButton = screen.getByRole('button', { name: /salvar/i })
    await user.click(saveButton)

    // Verificar se as alterações foram salvas
    const editedTaskItem = screen.getByText('Tarefa Editada').closest('li')
    expect(editedTaskItem).toHaveTextContent(/prioridade: média/i)
    console.log('✅ Teste de edição de tarefa passou!')
  })
}) 