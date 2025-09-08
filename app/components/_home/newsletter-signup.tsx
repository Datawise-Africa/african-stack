import React from 'react'

export default function NewsletterSignup() {
  return (
  <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/10 dark:to-background">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="border border-blue-200 dark:border-blue-800 shadow-lg rounded-lg">
      <div className="p-8 lg:p-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
          <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Stay Updated</span>
        </div>

        <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Get exclusive insights, early access to articles, and weekly AI news delivered to your inbox. Join
          thousands of AI enthusiasts and professionals.
        </p>

        <form id="newsletter-form" className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full pl-10 h-12 border border-blue-200 focus:border-blue-400 dark:border-blue-800 rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-white font-medium rounded-md transition-colors"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </form>

        {/* Success message (hidden by default) */}
        <div id="success-message" className="hidden flex items-center justify-center gap-2 text-green-600 font-medium mt-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Thank you for subscribing! Check your email for confirmation.
        </div>

        {/* Error message (hidden by default) */}
        <div id="error-message" className="hidden text-sm text-red-600 mt-2"></div>
      </div>
    </div>
  </div>
</section>
  )
}
