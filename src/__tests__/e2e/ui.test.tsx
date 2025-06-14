import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import { TaskProvider } from '../../context/TaskContext';
import { NotificationProvider } from '../../context/NotificationContext';
import App from '../../App';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <TaskProvider>
          <NotificationProvider>
            {component}
          </NotificationProvider>
        </TaskProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Interface do Usuário', () => {
  test('deve ter navegação intuitiva', () => {
    renderWithProviders(<App />);
    
    // Verificar se os elementos principais estão presentes
    expect(screen.getByText('BEM VINDO!')).toBeInTheDocument();
    expect(screen.getByText('ENTRAR')).toBeInTheDocument();
    expect(screen.getByText('CRIE UMA CONTA')).toBeInTheDocument();
    
    // Navegar para a página de login
    fireEvent.click(screen.getByText('ENTRAR'));
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('deve ter feedback visual para ações do usuário', () => {
    renderWithProviders(<App />);
    
    // Navegar para a página de login
    fireEvent.click(screen.getByText('ENTRAR'));
    
    // Tentar fazer login com credenciais inválidas
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });
    
    fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha-errada' } });
    fireEvent.click(submitButton);
    
    // Verificar se a mensagem de erro é exibida
    expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
  });

  test('deve ter acessibilidade adequada', () => {
    renderWithProviders(<App />);
    
    // Verificar se os elementos têm roles apropriados
    expect(screen.getByRole('heading', { name: /bem vindo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crie uma conta/i })).toBeInTheDocument();
  });
}); 