import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import { TaskProvider } from '../../context/TaskContext';
import { LoginForm } from '../../components/LoginForm';
import { TaskForm } from '../../components/TaskForm';
import { encryptData, hashPassword, verifyPassword, generateToken, verifyToken, sanitizeInput, validatePassword, validateEmail, validateUserData } from '../../utils/security';
import { User } from '../../types/User';
import { describe, it, expect } from 'vitest'

describe('Segurança do Sistema', () => {
  test('deve criptografar dados sensíveis', () => {
    const sensitiveData = 'dados-sensiveis';
    const encrypted = encryptData(sensitiveData);
    expect(encrypted).not.toBe(sensitiveData);
    expect(encrypted).toMatch(/^[A-Za-z0-9+/=]+$/);
  });

  test('deve fazer hash de senhas de forma segura', () => {
    const password = 'senha123';
    const hashed = hashPassword(password);
    expect(hashed).not.toBe(password);
    expect(typeof hashed).toBe('string');
    expect(hashed).toMatch(/^\$2[aby]\$\d+\$/);
  });

  test('deve verificar senhas corretamente', async () => {
    const password = 'senha123';
    const hashed = hashPassword(password);
    const isMatch = await verifyPassword(password, hashed);
    expect(isMatch).toBe(true);
    
    const wrongMatch = await verifyPassword('senha-errada', hashed);
    expect(wrongMatch).toBe(false);
  });

  test('deve prevenir ataques de força bruta', async () => {
    render(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    // Tentar fazer login várias vezes com senha errada
    for (let i = 0; i < 5; i++) {
      fireEvent.change(emailInput, { target: { value: 'teste@exemplo.com' } });
      fireEvent.change(passwordInput, { target: { value: 'senha-errada' } });
      fireEvent.click(submitButton);
    }

    // Verificar se a conta foi bloqueada
    expect(await screen.findByText(/conta temporariamente bloqueada/i)).toBeInTheDocument();
  });

  test('deve validar tokens JWT', () => {
    const user = { id: 1, email: 'teste@exemplo.com' };
    const token = generateToken(user);
    expect(typeof token).toBe('string');

    const decoded = verifyToken(token);
    expect(decoded).toMatchObject(user);

    expect(() => verifyToken('token-invalido')).toThrow();
  });

  test('deve prevenir XSS', () => {
    render(
      <TaskProvider>
        <TaskForm />
      </TaskProvider>
    );

    const titleInput = screen.getByLabelText(/título/i);
    const submitButton = screen.getByRole('button', { name: /criar/i });

    const maliciousInput = '<script>alert("XSS")</script>';
    fireEvent.change(titleInput, { target: { value: maliciousInput } });
    fireEvent.click(submitButton);

    const sanitizedInput = sanitizeInput(maliciousInput);
    expect(sanitizedInput).not.toContain('<script>');
    expect(sanitizedInput).not.toContain('alert');
  });
});

describe('Segurança', () => {
  it('deve validar senha forte', () => {
    expect(validatePassword('Senha123!')).toBe(true)
    expect(validatePassword('senha123')).toBe(false)
    expect(validatePassword('Senha123')).toBe(false)
    expect(validatePassword('senha!')).toBe(false)
  })

  it('deve validar email', () => {
    expect(validateEmail('teste@email.com')).toBe(true)
    expect(validateEmail('teste@email')).toBe(false)
    expect(validateEmail('teste.com')).toBe(false)
  })

  it('deve validar dados do usuário', () => {
    const user: User = {
      id: '1',
      name: 'Teste',
      email: 'teste@email.com',
      password: 'Senha123!'
    }

    const errors = validateUserData(user)
    expect(errors).toHaveLength(0)

    const invalidUser: User = {
      id: '1',
      name: '',
      email: 'email-invalido',
      password: 'senha'
    }

    const invalidErrors = validateUserData(invalidUser)
    expect(invalidErrors).toHaveLength(3)
  })

  it('deve sanitizar input', () => {
    expect(sanitizeInput('  <script>alert("xss")</script>  ')).toBe('scriptalert("xss")/script')
  })

  it('deve hash e verificar senha', () => {
    const password = 'Senha123!'
    const hashed = hashPassword(password)
    expect(verifyPassword(password, hashed)).toBe(true)
    expect(verifyPassword('SenhaErrada', hashed)).toBe(false)
  })

  it('deve gerar e verificar token', () => {
    const user: User = {
      id: '1',
      name: 'Teste',
      email: 'teste@email.com',
      password: 'Senha123!'
    }
    const token = generateToken(user)
    expect(verifyToken(token)).toBe(true)
    expect(verifyToken('token_invalido')).toBe(false)
  })
}) 