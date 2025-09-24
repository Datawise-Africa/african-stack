import { render, screen } from '@testing-library/react'
import PodcastDetail from '../PodcastDetail'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('PodcastDetail', () => {
  beforeEach(() => {
    // Mock window.ResizeObserver
    window.ResizeObserver = ResizeObserver
  })

  afterEach(() => {
    // Clean up mocks
    vi.clearAllMocks()
  })

  it('renders the podcast title', () => {
    render(<PodcastDetail />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Future of Web Development')
  })

  it('renders the author information', () => {
    render(<PodcastDetail />)
    // Target the first occurrence of the author name in the main content area
    const authorElements = screen.getAllByText('Jane Smith')
    expect(authorElements[0]).toBeInTheDocument()
  })

  it('renders the podcast description', () => {
    render(<PodcastDetail />)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders the audio player controls', () => {
    render(<PodcastDetail />)
    expect(screen.getByText('▶')).toBeInTheDocument()
  })
})