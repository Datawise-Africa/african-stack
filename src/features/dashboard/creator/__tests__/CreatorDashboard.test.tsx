import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import CreatorDashboard from '../CreatorDashboard'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock the auth store
vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    user: {
      id: '1',
      email: 'creator@example.com',
      displayName: 'Test Creator',
      role: 'author',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }),
}))

describe('CreatorDashboard', () => {
  beforeEach(() => {
    // Mock window.ResizeObserver
    window.ResizeObserver = ResizeObserver
  })

  afterEach(() => {
    // Clean up mocks
    vi.clearAllMocks()
  })

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the creator dashboard title', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByText('Creator Dashboard')).toBeInTheDocument()
  })

  it('renders the welcome message', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByText('Welcome back, Test Creator!')).toBeInTheDocument()
  })

  it('renders the stats overview cards', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByText('Total Articles')).toBeInTheDocument()
    expect(screen.getByText('Total Views')).toBeInTheDocument()
    expect(screen.getByText('Total Reactions')).toBeInTheDocument()
    expect(screen.getByText('Total Comments')).toBeInTheDocument()
  })

  it('renders the articles tab', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByRole('tab', { name: 'My Articles' })).toBeInTheDocument()
  })

  it('renders the profile tab', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByRole('tab', { name: 'Profile' }).closest('button')).toBeInTheDocument()
  })

  it('renders articles in the articles tab', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument()
  })

  it('renders the create new article button', () => {
    renderWithRouter(<CreatorDashboard />)
    expect(screen.getByText('Create New Article')).toBeInTheDocument()
  })
})