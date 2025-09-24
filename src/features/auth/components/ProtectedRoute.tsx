import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/types'

interface ProtectedRouteProps {
  children?: React.ReactNode
  requiredRole?: 'reader' | 'author' | 'admin'
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true })
    } else if (requiredRole && user && user.role !== requiredRole) {
      // Check role hierarchy: admin > author > reader
      const roleHierarchy: Record<User['role'], number> = {
        reader: 1,
        author: 2,
        admin: 3,
        editor: 2 // Treat editor as author level
      }
      
      if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
        navigate('/')
      }
    }
  }, [isAuthenticated, user, requiredRole, navigate, location])

  if (!isAuthenticated) {
    return null
  }

  // Check role access
  if (requiredRole && user) {
    const roleHierarchy: Record<User['role'], number> = {
      reader: 1,
      author: 2,
      admin: 3,
      editor: 2 // Treat editor as author level
    }
    
    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return null
    }
  }

  return <>{children}</>
}

export default ProtectedRoute