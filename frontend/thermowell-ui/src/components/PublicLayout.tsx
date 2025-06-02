import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="w-full flex items-center justify-between bg-white border-b border-gray-200 px-8 py-3 h-16 z-10">
          <div className="text-xl font-bold text-blue-600">ThermoWell</div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-600 hover:text-blue-600">Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-blue-600">About</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a></li>
              <li><a href="/login" className="text-blue-600 font-medium">Login</a></li>
            </ul>
          </nav>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 p-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ThermoWell. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PublicLayout;
