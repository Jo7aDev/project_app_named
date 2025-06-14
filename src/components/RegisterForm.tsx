import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Feedback } from './Feedback'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar')
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
      <button type="submit">Cadastrar</button>
    </form>
  )
} 