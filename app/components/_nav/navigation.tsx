import React, { useState } from 'react'
import { Link } from 'react-router'
import { ThemeToggle } from '../theme-toggle'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-serif font-bold text-xl">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        The African Stack
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-foreground hover:text-primary transition-colors">
          Home
        </Link>
        <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
          Archive
        </Link>
        <a href="/about" className="text-foreground hover:text-primary transition-colors">
          About
        </a>
        <Link to="/newsletter" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg">
          Subscribe
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile menu controls */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-foreground hover:bg-muted"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isMobileMenuOpen && (
      <div className="md:hidden py-4 border-t border-border">
                <div className="flex flex-col gap-4">
          <Link 
            to="/" 
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Archive
          </Link>
          <a 
            href="/about" 
            className="text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <Link 
            to="/newsletter" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg w-fit"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Subscribe
          </Link>
        </div>
      </div>
    )}
  </div>
</nav>
  )
}
