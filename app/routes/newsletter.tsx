import React, { useState } from "react";
import MainLayout from "~/components/_layouts/main";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail("");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm font-medium text-primary uppercase tracking-wide">Newsletter</span>
          </div>
          
          <h1 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
            Stay Connected with <span className="text-primary">The African Stack</span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Join thousands of professionals, entrepreneurs, and innovators who rely on our weekly insights 
            to stay ahead in Africa's rapidly evolving data and AI landscape.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
            <p className="text-muted-foreground">
              Curated analysis from leading voices in African tech, data science, and AI innovation.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Early Access</h3>
            <p className="text-muted-foreground">
              Get first access to our latest articles, research reports, and exclusive interviews.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Connect with like-minded professionals building Africa's digital future.
            </p>
          </div>
        </div>

        {/* Newsletter Signup Form */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8 lg:p-12 mb-16">
          {isSubmitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground mb-6">
                We've sent a confirmation email to your inbox. Please check your email and click the confirmation link to complete your subscription.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
                Subscribe to Our Newsletter
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our weekly newsletter and get the latest insights on African data science, 
                AI innovations, and technology trends delivered straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 h-12 border border-border focus:border-primary/50 rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 h-12 px-8 text-primary-foreground font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  No spam, ever. Unsubscribe at any time. We respect your privacy and will never share your email.
                </p>
              </form>
            </div>
          )}
        </div>

        {/* What You'll Get Section */}
        <div className="mb-16">
          <h2 className="font-serif font-bold text-3xl text-center mb-12">What You'll Get</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Weekly Market Analysis</h3>
                <p className="text-muted-foreground">
                  Deep dives into African tech markets, funding trends, and emerging opportunities in data and AI.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Startup Spotlights</h3>
                <p className="text-muted-foreground">
                  Exclusive interviews and profiles of innovative African startups leveraging data and AI.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Tech Policy Updates</h3>
                <p className="text-muted-foreground">
                  Stay informed about regulatory changes and policy developments affecting African tech.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Event Invitations</h3>
                <p className="text-muted-foreground">
                  Priority access to webinars, conferences, and networking events in the African tech ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-border pt-16">
          <h2 className="font-serif font-bold text-3xl text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-lg mb-2">How often will I receive emails?</h3>
              <p className="text-muted-foreground">
                We send one comprehensive newsletter every week, typically on Wednesdays. 
                Occasionally, we may send special announcements for major events or breaking news.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Can I unsubscribe at any time?</h3>
              <p className="text-muted-foreground">
                Absolutely! Every email includes an unsubscribe link at the bottom. 
                You can opt out with a single click, no questions asked.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Do you share email addresses with third parties?</h3>
              <p className="text-muted-foreground">
                Never. We respect your privacy and will never share, sell, or rent your email address to anyone. 
                Your information is used solely for sending you our newsletter.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">What if I miss an issue?</h3>
              <p className="text-muted-foreground">
                Don't worry! All our newsletter content is archived and accessible through our blog. 
                You can always catch up on previous issues anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
