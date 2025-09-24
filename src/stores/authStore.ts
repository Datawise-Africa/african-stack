import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, displayName: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, _password: string) => {
        set({ isLoading: true })
        try {
          // Mock API call - replace with actual API endpoint
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock user data based on email for testing different roles
          let role: User['role'] = 'reader'
          let displayName = 'John Doe'
          
          if (email === 'admin@example.com') {
            role = 'admin'
            displayName = 'Admin User'
          } else if (email === 'author@example.com') {
            role = 'author'
            displayName = 'Author User'
          } else if (email === 'reader@example.com') {
            role = 'reader'
            displayName = 'Reader User'
          }
          
          const mockUser: User = {
            id: '1',
            email,
            displayName,
            role,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        })
      },
      
      register: async (email: string, _password: string, displayName: string) => {
        set({ isLoading: true })
        try {
          // Mock API call - replace with actual API endpoint
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Mock user data
          const mockUser: User = {
            id: '1',
            email,
            displayName,
            role: 'reader',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          
          set({
            user: mockUser,
            isAuthenticated: true,
            isLoading: false
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)