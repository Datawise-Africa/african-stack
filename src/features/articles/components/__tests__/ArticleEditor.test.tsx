import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ArticleEditor from '../ArticleEditor'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

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

// Mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({}),
  }
})

// Mock window.ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('ArticleEditor', () => {
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

  it('renders the article editor title', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByText('Create New Article')).toBeInTheDocument()
  })

  it('renders the title input', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
  })

  it('renders the excerpt textarea', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByLabelText('Excerpt')).toBeInTheDocument()
  })

  it('renders the category select', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByLabelText('Category')).toBeInTheDocument()
  })

  it('renders the status buttons', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.getByText('Publish')).toBeInTheDocument()
  })

  it('renders the content editor', () => {
    renderWithRouter(<ArticleEditor />)
    // Target the specific editor content div
    expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument()
  })

  it('renders the editor toolbar with formatting buttons', () => {
    renderWithRouter(<ArticleEditor />)
    
    // Check for text formatting buttons
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument()
    
    // Check for heading buttons
    expect(screen.getByRole('button', { name: /heading 1/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /heading 2/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /heading 3/i })).toBeInTheDocument()
    
    // Check for list buttons
    expect(screen.getByRole('button', { name: /bullet list/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ordered list/i })).toBeInTheDocument()
    
    // Check for table button
    expect(screen.getByRole('button', { name: /table/i })).toBeInTheDocument()
  })

  it('renders the edit and preview tabs', () => {
    renderWithRouter(<ArticleEditor />)
    
    expect(screen.getByRole('tab', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /preview/i })).toBeInTheDocument()
  })

  it('switches between edit and preview modes', async () => {
    renderWithRouter(<ArticleEditor />)
    const user = userEvent.setup()
    
    // Initially in edit mode
    expect(screen.getByRole('tab', { name: /edit/i })).toHaveAttribute('aria-selected', 'true')
    
    // Switch to preview mode
    await user.click(screen.getByRole('tab', { name: /preview/i }))
    
    // Now in preview mode
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /preview/i })).toHaveAttribute('aria-selected', 'true')
    })
  })

  it('opens link popover when link button is clicked', async () => {
    renderWithRouter(<ArticleEditor />)
    const user = userEvent.setup()
    
    // Click the link button
    await user.click(screen.getByRole('button', { name: /link/i }))
    
    // Check if the popover is open
    await waitFor(() => {
      expect(screen.getByLabelText('URL')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    })
  })

  it('opens image popover when image button is clicked', async () => {
    renderWithRouter(<ArticleEditor />)
    const user = userEvent.setup()
    
    // Click the image button
    await user.click(screen.getByRole('button', { name: /image/i }))
    
    // Check if the popover is open
    await waitFor(() => {
      expect(screen.getByLabelText('Image URL')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /insert/i })).toBeInTheDocument()
    })
  })

  it('renders the tags section', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renders the save button', () => {
    renderWithRouter(<ArticleEditor />)
    expect(screen.getByText('Save Article')).toBeInTheDocument()
  })
})