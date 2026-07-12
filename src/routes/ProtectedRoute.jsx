import { useAuthStore } from '../features/auth/authStore'
import LoginForm from '../features/auth/components/LoginForm'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return children
}