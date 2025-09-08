import React from 'react'
import Footer from '../_nav/footer'
import Navigation from '../_nav/navigation'

type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
   <div className="flex flex-col min-h-screen">
    <Navigation />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
  )
}
