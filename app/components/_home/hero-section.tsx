import React from 'react'
import { Link } from 'react-router'

export default function HeroSection() {
  return (
  <section className="relative py-20 lg:py-32 overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background"></div>

  {/* Geometric background elements */}
  <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rotate-45 opacity-50"></div>
  <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary/20 rotate-12 opacity-60"></div>
  <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-accent/50 rounded-full opacity-40"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
        <span className="text-sm font-medium text-primary uppercase tracking-wide">Africa's Data & AI Movement</span>
      </div>

      <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
        The African <span className="text-primary">Stack</span>
      </h1>

      <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
        Building Africa's future in data, infrastructure, and intelligence. The intellectual and strategic home for Africa's data, AI, and infrastructure movement.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/blog" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center">
          Read the Latest Issue
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </Link>
        <Link to="/newsletter" className="border border-border hover:bg-muted bg-transparent px-6 py-3 rounded-lg font-medium transition-colors">
          Subscribe Now
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}
