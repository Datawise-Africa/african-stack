import React from 'react'
import { Link } from 'react-router'

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 font-serif font-bold text-xl">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        The African Stack
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <a href="/" className="text-foreground hover:text-blue-600 transition-colors">
          Home
        </a>
        <a href="/blog" className="text-foreground hover:text-blue-600 transition-colors">
          Archive
        </a>
        <a href="/about" className="text-foreground hover:text-blue-600 transition-colors">
          About
        </a>
        <a href="/newsletter" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          Subscribe
        </a>
      </div>

      {/* Mobile menu button */}
      <button id="mobile-menu-button" className="md:hidden p-2 rounded-md text-foreground hover:bg-muted">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    {/* Mobile Navigation */}
    <div id="mobile-menu" className="hidden md:hidden py-4 border-t border-border">
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-foreground hover:text-blue-600 transition-colors">
          Home
        </Link>
        <Link to="/blog" className="text-foreground hover:text-blue-600 transition-colors">
          Archive
        </Link>
        <Link to="/about" className="text-foreground hover:text-blue-600 transition-colors">
          About
        </Link>
        <Link to="/newsletter" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors w-fit">
          Subscribe
        </Link>
      </div>
    </div>
  </div>
</nav>
  )
}
