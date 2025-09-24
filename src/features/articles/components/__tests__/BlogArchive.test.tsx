import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import BlogArchive from '../BlogArchive'
import { describe, it, expect } from 'vitest'

describe('BlogArchive', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the blog archive title', () => {
    renderWithRouter(<BlogArchive />)
    expect(screen.getByText('All Stories')).toBeInTheDocument()
  })

  it('renders the correct number of articles', () => {
    renderWithRouter(<BlogArchive />)
    const articles = screen.getAllByText(/The Future of Web Development|Building Sustainable Applications|The Art of User Experience|Machine Learning in Everyday Applications|Cybersecurity Best Practices for 2023|The Rise of Low-Code Platforms/)
    expect(articles).toHaveLength(6)
  })

  it('renders search input', () => {
    renderWithRouter(<BlogArchive />)
    expect(screen.getByPlaceholderText('Search articles...')).toBeInTheDocument()
  })

  it('renders category filter', () => {
    renderWithRouter(<BlogArchive />)
    expect(screen.getByText('All Categories')).toBeInTheDocument()
  })

  it('renders sort filter', () => {
    renderWithRouter(<BlogArchive />)
    expect(screen.getByText('Newest')).toBeInTheDocument()
  })
})