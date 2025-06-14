import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Feedback } from './Feedback'
import { checkLoginAttempts } from '../utils/security'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      checkLoginAttempts(email)
      await login(email, password)
      setSuccess('Bem-vindo!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <Feedback message={error} type="error" />}
      {success && <Feedback message={success} type="success" />}
      <button type="submit">Entrar</button>
    </form>
  )
} 