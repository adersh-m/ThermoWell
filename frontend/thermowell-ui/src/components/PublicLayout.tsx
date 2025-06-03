import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
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
              <li>
                <Link
                  to="/login"
                  className="btn font-bold rounded-full px-5 py-2 border-2 border-primary-500 text-primary-500 bg-white shadow-lg hover:bg-primary-50 hover:border-primary-600 hover:text-primary-600 transition-all duration-200 shadow-primary"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="btn font-bold rounded-full px-5 py-2 border-2 border-secondary-500 text-secondary-500 bg-white shadow-lg hover:bg-secondary-50 hover:border-secondary-600 hover:text-secondary-600 transition-all duration-200 shadow-secondary"
                >
                  Register
                </Link>
              </li>
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
                <li><Link to="/login" className="btn btn-primary w-full text-center mt-4 py-3 font-bold" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                <li><Link to="/auth/register" className="btn btn-secondary w-full text-center mt-2 py-3 font-bold" onClick={() => setMobileMenuOpen(false)}>Register</Link></li>
              </ul>
            </nav>
          </div>
        </div>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
      <footer className="bg-white border-t border-gray-200 p-8 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-500 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-500 hover:text-primary-500 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-500 hover:text-primary-500 transition-colors">Contact</Link>
            {isAuthenticated && <Link to="/dashboard" className="text-gray-500 hover:text-primary-500 transition-colors">Dashboard</Link>}
          </div>
          <div className="text-gray-400 text-xs text-center md:text-right w-full md:w-auto">© {new Date().getFullYear()} ThermoWell. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
