import { useContext } from 'react'

import { AuthContext } from '@/features/auth/context/AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  return 'Authentication failed. Please try again.'
}
