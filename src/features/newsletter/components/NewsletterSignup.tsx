import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset error state
    setError('')
    
    // Validate email
    if (!email) {
      setError('Please enter a valid email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real implementation, you would send the email to your backend
      // which would then handle the Mailchimp API integration
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate successful subscription
      setIsSubscribed(true)
      
      // Reset form
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setError('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle data-testid="newsletter-success">Thank You for Subscribing!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            You've been successfully subscribed to our newsletter. 
            Please check your email to confirm your subscription.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle data-testid="newsletter-title">Subscribe to Our Newsletter</CardTitle>
        <CardDescription>
          Stay updated with our latest articles and podcasts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" data-testid="newsletter-form">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              
              data-testid="newsletter-email-input"
            />
            {error && <p className="text-sm text-red-500" data-testid="newsletter-error">{error}</p>}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
            data-testid="newsletter-submit"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default NewsletterSignup