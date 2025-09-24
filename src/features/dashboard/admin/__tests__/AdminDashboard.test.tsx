import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AdminDashboard from '../AdminDashboard'
import { describe, it, expect, vi } from 'vitest'

// Mock the auth store
vi.mock('@/stores/authStore', () => ({
  useAuthStore: () => ({
    user: {
      id: '1',
      email: 'admin@example.com',
      displayName: 'Admin User',
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  }),
}))

describe('AdminDashboard', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the admin dashboard title', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
  })

  it('renders the welcome message', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByText('Welcome back, Admin User!')).toBeInTheDocument()
  })

  it('renders the stats overview cards', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('Active Authors')).toBeInTheDocument()
    expect(screen.getByText('Pending Applications')).toBeInTheDocument()
    expect(screen.getByText('Articles Pending Review')).toBeInTheDocument()
  })

  it('renders the user management tab', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByRole('tab', { name: 'Users' })).toBeInTheDocument()
  })

  it('renders the applications tab', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByRole('tab', { name: 'Applications' })).toBeInTheDocument()
  })

  it('renders the articles tab', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByRole('tab', { name: 'Articles' }).closest('button')).toBeInTheDocument()
  })

  it('renders the categories tab', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByRole('tab', { name: 'Categories' }).closest('button')).toBeInTheDocument()
  })

  it('renders users in the user management tab', () => {
    renderWithRouter(<AdminDashboard />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})