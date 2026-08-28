import { AuthLoadingScreen } from '@/features/auth/components/AuthLoadingScreen'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { AdminLayout } from '@/features/settings/components/AdminLayout'

function AppRoutes() {
  const { session, loading } = useAuth()

  if (loading) {
    return <AuthLoadingScreen />
  }

  if (!session) {
    return <LoginPage />
  }

  return <AdminLayout />
}

export function App() {
  return <AppRoutes />
}
