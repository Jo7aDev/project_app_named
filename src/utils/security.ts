import { User } from '../types/User'

export const validatePassword = (password: string): boolean => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  )
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUserData = (user: User): string[] => {
  const errors: string[] = []

  if (!user.name) {
    errors.push('Nome é obrigatório')
  }

  if (!validateEmail(user.email)) {
    errors.push('Email inválido')
  }

  if (!validatePassword(user.password)) {
    errors.push('Senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais')
  }

  return errors
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<[^>]*>/g, '')
}

export const hashPassword = (password: string): string => {
  return btoa(password)
}

export const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return btoa(password) === hashedPassword
}

export const generateToken = (user: User): string => {
  return btoa(JSON.stringify(user))
}

export const verifyToken = (token: string): boolean => {
  try {
    JSON.parse(atob(token))
    return true
  } catch {
    return false
  }
} 