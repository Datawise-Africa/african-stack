import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import SEO from '@/components/layout/SEO'

// Define the form schema with Zod
const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

const ResetPassword = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordForm) => {
    setLoading(true)
    setError('')
    setEmail(data.email)
    
    try {
      // Mock password reset - will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
    } catch (error) {
      console.error('Password reset error:', error)
      setError('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <SEO
          title="Password Reset - African Stack"
          description="Reset your password for your African Stack account."
          keywords="password reset, forgot password, account recovery"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold">Check your email</h1>
          <p className="text-gray-600 mt-2">
            We've sent a password reset link to {email}
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Password reset email sent successfully!
        </div>
        
        <Button
          onClick={() => navigate('/login')}
          className="w-full"
        >
          Back to login
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <SEO
        title="Reset Password - African Stack"
        description="Forgot your password? Enter your email to receive a password reset link."
        keywords="reset password, forgot password, account recovery"
      />
      <div className="text-center">
        <h1 className="text-3xl font-bold">Reset your password</h1>
        <p className="text-gray-600 mt-2">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>
      
      <div className="text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword