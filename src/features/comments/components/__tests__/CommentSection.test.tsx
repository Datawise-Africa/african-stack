import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CommentSection from '../CommentSection'
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

describe('CommentSection', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the comment section title', () => {
    renderWithRouter(<CommentSection />)
    expect(screen.getByText('Comments (2)')).toBeInTheDocument()
  })

  it('renders existing comments', () => {
    renderWithRouter(<CommentSection />)
    expect(screen.getByText('This is a great article! I learned a lot from reading it.')).toBeInTheDocument()
  })

  it('renders the comment input for logged in users', () => {
    renderWithRouter(<CommentSection />)
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument()
  })

  it('renders the reply button for comments', () => {
    renderWithRouter(<CommentSection />)
    // Use getAllByText since there are multiple reply buttons
    expect(screen.getAllByText('Reply')).toHaveLength(3)
  })
})