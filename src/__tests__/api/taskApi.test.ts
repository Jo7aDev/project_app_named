import { describe, it, expect, beforeEach } from 'vitest'
import { taskApi } from '../../api/taskApi'

describe('API de Tarefas', () => {
  beforeEach(() => {
    // Limpar o banco de dados simulado antes de cada teste
    taskApi.resetTasks()
  })

  it('deve criar uma nova tarefa', async () => {
    const novaTarefa = {
      title: 'Tarefa de Teste',
      description: 'Descrição da tarefa de teste',
      priority: 'alta' as const,
      deadline: new Date().toISOString(),
      completed: false
    }

    const tarefaCriada = await taskApi.createTask(novaTarefa)

    expect(tarefaCriada).toMatchObject({
      ...novaTarefa,
      id: expect.any(String)
    })
    console.log('✅ Teste de criação de tarefa via API passou!')
  })

  it('deve atualizar uma tarefa existente', async () => {
    // Criar uma tarefa inicial
    const tarefaInicial = {
      title: 'Tarefa Original',
      description: 'Descrição original',
      priority: 'baixa' as const,
      deadline: new Date().toISOString(),
      completed: false
    }

    const tarefaCriada = await taskApi.createTask(tarefaInicial)

    // Atualizar a tarefa
    const atualizacoes = {
      title: 'Tarefa Atualizada',
      priority: 'alta' as const
    }

    const tarefaAtualizada = await taskApi.updateTask(tarefaCriada.id, atualizacoes)

    expect(tarefaAtualizada).toMatchObject({
      ...tarefaCriada,
      ...atualizacoes
    })
    console.log('✅ Teste de atualização de tarefa via API passou!')
  })

  it('deve excluir uma tarefa', async () => {
    // Criar uma tarefa para excluir
    const tarefa = {
      title: 'Tarefa para Excluir',
      description: 'Será excluída',
      priority: 'média' as const,
      deadline: new Date().toISOString(),
      completed: false
    }

    const tarefaCriada = await taskApi.createTask(tarefa)
    await taskApi.deleteTask(tarefaCriada.id)

    // Tentar buscar a tarefa excluída deve lançar um erro
    await expect(taskApi.updateTask(tarefaCriada.id, { title: 'Nova' }))
      .rejects
      .toThrow('Tarefa não encontrada')
    
    console.log('✅ Teste de exclusão de tarefa via API passou!')
  })
}) 