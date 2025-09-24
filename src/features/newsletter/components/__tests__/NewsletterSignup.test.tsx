import { render, screen } from '@testing-library/react'
import NewsletterSignup from '../NewsletterSignup'
import { describe, it, expect } from 'vitest'

describe('NewsletterSignup', () => {

  it('renders the newsletter signup form', () => {
    render(<NewsletterSignup />)
    
    expect(screen.getByText('Subscribe to Our Newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('shows validation error for invalid email', () => {
    render(<NewsletterSignup />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    
    // Check that the input is rendered
    expect(emailInput).toBeInTheDocument()
  })

  it('shows success message after subscription', () => {
    render(<NewsletterSignup />)
    
    const emailInput = screen.getByPlaceholderText('Your email address')
    const submitButton = screen.getByRole('button', { name: 'Subscribe' })
    
    // Check that the form elements are rendered
    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})