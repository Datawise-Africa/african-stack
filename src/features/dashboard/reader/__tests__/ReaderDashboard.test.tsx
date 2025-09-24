import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ReaderDashboard from '../ReaderDashboard'
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

describe('ReaderDashboard', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the reader dashboard title', () => {
    renderWithRouter(<ReaderDashboard />)
    expect(screen.getByText('Reader Dashboard')).toBeInTheDocument()
  })

  it('renders the welcome message', () => {
    renderWithRouter(<ReaderDashboard />)
    expect(screen.getByText('Welcome back, Test Reader!')).toBeInTheDocument()
  })

  it('renders the reading history tab trigger', () => {
    renderWithRouter(<ReaderDashboard />)
    // Use getByRole to specifically target the tab trigger
    expect(screen.getByRole('tab', { name: 'Reading History' })).toBeInTheDocument()
  })

  it('renders the saved articles tab trigger', () => {
    renderWithRouter(<ReaderDashboard />)
    // Use getByRole to specifically target the tab trigger
    expect(screen.getByRole('tab', { name: 'Saved Articles' }).closest('button')).toBeInTheDocument()
  })

  it('renders articles in reading history', () => {
    renderWithRouter(<ReaderDashboard />)
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument()
  })
})