import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AnalyticsTracker from '../AnalyticsTracker'
import { describe, it, expect, vi } from 'vitest'

// Mock the useAnalytics hook
vi.mock('../../hooks/useAnalytics', () => ({
  useAnalytics: vi.fn()
}))

describe('AnalyticsTracker', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <AnalyticsTracker />
      </BrowserRouter>
    )
    
    // The component should render nothing
    expect(container.firstChild).toBeNull()
  })
})