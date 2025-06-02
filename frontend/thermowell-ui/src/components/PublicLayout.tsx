import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full flex items-center justify-between bg-white border-b border-gray-200 px-8 py-3 h-16 z-20 shadow-sm">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 3a1 1 0 00-1 1c0 1-.3 1.1-1 1.63-1.3 1-1.7 1.8-1.95 2.37h-.05a4 4 0 00-3 3.87 4 4 0 001 2.63A4 4 0 109 10.5a4 4 0 001-2.63c0-1.43.8-2.4.95-2.37.25-.57.7-1.37 2-2.37.7-.53 1-1.3 1-1.63A1 1 0 0012 3z" clipRule="evenodd" />
            </svg>
            <div className="text-2xl font-bold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">ThermoWell</div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-gray-700 hover:text-primary-500 font-medium">Home</Link></li>
              <li><Link to="/about" className="text-gray-700 hover:text-primary-500 font-medium">About</Link></li>
              <li><Link to="/contact" className="text-gray-700 hover:text-primary-500 font-medium">Contact</Link></li>
              <li><Link to="/login" className="btn btn-primary px-5 py-2 text-white font-medium rounded-full">Login</Link></li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </header>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden fixed inset-0 z-10 transform ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
          <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white shadow-lg z-20 p-6">
            <div className="flex justify-end mb-8">
              <button onClick={() => setMobileMenuOpen(false)} className="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                <li><Link to="/" className="block text-gray-700 hover:text-primary-500 font-medium text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                <li><Link to="/about" className="block text-gray-700 hover:text-primary-500 font-medium text-lg py-2" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
                <li><Link to="/contact" className="block text-gray-700 hover:text-primary-500 font-medium text-lg py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
                <li><Link to="/login" className="btn btn-primary w-full text-center mt-4 py-3 text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-white border-t border-gray-200 p-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 3a1 1 0 00-1 1c0 1-.3 1.1-1 1.63-1.3 1-1.7 1.8-1.95 2.37h-.05a4 4 0 00-3 3.87 4 4 0 001 2.63A4 4 0 109 10.5a4 4 0 001-2.63c0-1.43.8-2.4.95-2.37.25-.57.7-1.37 2-2.37.7-.53 1-1.3 1-1.63A1 1 0 0012 3z" clipRule="evenodd" />
                  </svg>
                  <div className="text-xl font-bold font-heading">ThermoWell</div>
                </div>
                <p className="text-gray-500 mb-4">Protecting communities during extreme heat events.</p>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-500 hover:text-primary-500">Home</Link></li>
                  <li><Link to="/about" className="text-gray-500 hover:text-primary-500">About</Link></li>
                  <li><Link to="/contact" className="text-gray-500 hover:text-primary-500">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-500 hover:text-primary-500">Heat Safety Guide</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary-500">Emergency Planning</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-primary-500">Community Support</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold mb-4">Connect</h3>
                <div className="flex space-x-4 mb-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-500 transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-500 transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-500 transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
              <p>© {new Date().getFullYear()} ThermoWell. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;
