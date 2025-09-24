import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 py-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">African Stack</h3>
            <p className="text-gray-600">
              A place to read, write, and deepen your understanding.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Help</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link to="/twitter" className="text-gray-600 hover:text-gray-900">Twitter</Link></li>
              <li><Link to="/facebook" className="text-gray-600 hover:text-gray-900">Facebook</Link></li>
              <li><Link to="/linkedin" className="text-gray-600 hover:text-gray-900">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} African Stack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer