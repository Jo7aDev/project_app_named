# Gerenciador de Tarefas

## Testes

Este projeto inclui uma suíte completa de testes para garantir a qualidade e confiabilidade do sistema.

### Tipos de Testes

1. **Testes Unitários**
   - Testes de componentes individuais
   - Testes de funções utilitárias
   - Testes de hooks personalizados
   - Localização: `src/__tests__/unit/`

2. **Testes de Integração**
   - Testes de fluxos completos
   - Testes de interação entre componentes
   - Testes de contextos
   - Localização: `src/__tests__/integration/`

3. **Testes E2E**
   - Testes de interface do usuário
   - Testes de responsividade
   - Testes de acessibilidade
   - Localização: `src/__tests__/e2e/`

### Executando os Testes

```bash
# Instalar dependências
npm install

# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage

# Executar testes com interface visual
npm run test:ui

# Executar testes E2E
npm run test:e2e
```

### Cobertura de Testes

Os testes cobrem as seguintes funcionalidades:

- Cadastro e autenticação de usuários
- Gerenciamento de tarefas (CRUD)
- Sistema de notificações
- Relatórios de produtividade
- Interface do usuário
- Segurança e validações

### Boas Práticas

1. Mantenha os testes organizados por funcionalidade
2. Use nomes descritivos para os testes
3. Siga o padrão AAA (Arrange, Act, Assert)
4. Mantenha os testes independentes
5. Use mocks e stubs quando necessário
6. Mantenha a cobertura de testes acima de 80%

### Estrutura de Diretórios

```
src/
  __tests__/
    unit/          # Testes unitários
    integration/   # Testes de integração
    e2e/          # Testes end-to-end
    setup.ts      # Configuração global dos testes
```

### Contribuindo

Ao adicionar novas funcionalidades:

1. Crie testes unitários para as funções e componentes
2. Adicione testes de integração para fluxos completos
3. Atualize os testes E2E se necessário
4. Mantenha a cobertura de testes
5. Execute todos os testes antes de submeter alterações 