import React from 'react'

interface FeedbackProps {
  message: string
  type: 'error' | 'success'
}

export function Feedback({ message, type }: FeedbackProps) {
  return (
    <div role="alert" className={`feedback ${type}`}>
      {message}
    </div>
  )
} 