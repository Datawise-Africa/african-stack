import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SEO from './SEO'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Header />
      <main className="flex-grow" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout