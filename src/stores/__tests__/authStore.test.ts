import { describe, it, expect } from 'vitest'
import { useAuthStore } from '../authStore'

describe('authStore', () => {
  it('should initialize with default values', () => {
    const store = useAuthStore.getState()
    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(store.isLoading).toBe(false)
  })
})