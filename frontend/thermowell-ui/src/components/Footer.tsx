import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <img 
              src="/logo/thermowell-high-resolution-logo-transparent.png" 
              alt="ThermoWell Logo" 
              className="h-12 mb-4 mx-auto md:mx-0" 
            />
            <p className="text-sm text-gray-400">
              Protecting communities through advanced heat monitoring and health services.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/advisories" className="hover:text-gray-300">Advisories</Link></li>
              <li><Link to="/health-score" className="hover:text-gray-300">Health Score</Link></li>
              <li><Link to="/resources" className="hover:text-gray-300">Resources</Link></li>
              <li><Link to="/tips" className="hover:text-gray-300">Tips</Link></li>
              <li><Link to="/alerts" className="hover:text-gray-300">Alerts</Link></li>
              <li><Link to="/help" className="hover:text-gray-300">Help</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Emergency: <span className="text-gray-400">911</span></li>
              <li>Email: <a href="mailto:support@thermowell.com" className="hover:text-gray-300">support@thermowell.com</a></li>
              <li>Support: <span className="text-gray-400">24/7 Available</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ThermoWell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
