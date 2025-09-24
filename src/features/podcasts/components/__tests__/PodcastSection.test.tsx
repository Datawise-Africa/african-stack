import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PodcastSection from '../PodcastSection'
import { describe, it, expect } from 'vitest'

describe('PodcastSection', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  it('renders the podcast section title', () => {
    renderWithRouter(<PodcastSection />)
    expect(screen.getByText('Podcasts')).toBeInTheDocument()
  })

  it('renders podcast cards', () => {
    renderWithRouter(<PodcastSection />)
    expect(screen.getByText('The Future of Web Development')).toBeInTheDocument()
  })

  it('renders the search input', () => {
    renderWithRouter(<PodcastSection />)
    expect(screen.getByPlaceholderText('Search podcasts...')).toBeInTheDocument()
  })

  it('renders the category filter', () => {
    renderWithRouter(<PodcastSection />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})