import { render, screen } from '@testing-library/react'
import ReactionSection from '../ReactionSection'
import { describe, it, expect, vi } from 'vitest'

// Mock the auth store
vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    user: {
      id: '1',
      email: 'reader@example.com',
      displayName: 'Test Reader',
      role: 'reader',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }),
}))

describe('ReactionSection', () => {
  it('renders all reaction buttons', () => {
    render(<ReactionSection />)
    expect(screen.getByText('👍')).toBeInTheDocument()
    expect(screen.getByText('👏')).toBeInTheDocument()
    expect(screen.getByText('❤️')).toBeInTheDocument()
    expect(screen.getByText('🎉')).toBeInTheDocument()
    expect(screen.getByText('💡')).toBeInTheDocument()
    expect(screen.getByText('🤔')).toBeInTheDocument()
  })

  it('displays reaction counts', () => {
    render(<ReactionSection />)
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('renders the login prompt for non-logged in users', () => {
    // Mock no user
    vi.mock('@/stores/authStore', () => ({
      useAuthStore: () => ({
        user: null,
      }),
    }))
    
    render(<ReactionSection />)
    expect(screen.getByText('Log in to react to this article')).toBeInTheDocument()
  })
})