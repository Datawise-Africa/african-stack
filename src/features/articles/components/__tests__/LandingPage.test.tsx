import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LandingPage from '../LandingPage'
import { describe, it, expect } from 'vitest'

describe('LandingPage', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the landing page title', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Where good ideas find you')).toBeInTheDocument()
  })

  it('renders the featured articles section', () => {
    renderWithRouter(<LandingPage />)
    expect(screen.getByText('Featured Stories')).toBeInTheDocument()
  })

  it('renders the correct number of featured articles', () => {
    renderWithRouter(<LandingPage />)
    const featuredArticles = screen.getAllByText(/The Future of Web Development|Building Sustainable Applications|The Art of User Experience/)
    expect(featuredArticles).toHaveLength(3)
  })
})