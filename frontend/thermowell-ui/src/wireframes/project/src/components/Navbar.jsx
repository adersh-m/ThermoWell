import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiSearch, FiUser, FiMenu } from 'react-icons/fi';

function Navbar({ toggleSidebar }) {
  const [notifications] = useState(3);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 lg:hidden hover:bg-gray-100"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-3 ml-4">
              <img
                src="https://images.pexels.com/photos/3873175/pexels-photo-3873175.jpeg"
                alt="Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-red-600">Heatwave Alert</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FiBell className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <FiUser className="h-5 w-5 text-gray-500" />
                </div>
                <span className="hidden md:block text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;