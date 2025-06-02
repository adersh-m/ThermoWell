import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '⚠️', label: 'Advisories', path: '/advisories' },
    { icon: '🔔', label: 'Alerts', path: '/alerts' },
    { icon: '🌡️', label: 'Health Score', path: '/health-score' },
    { icon: '📍', label: 'Tips', path: '/tips' },
    { icon: '📚', label: 'Resources', path: '/resources' }
  ];

  const supportItems = [
    { icon: '❓', label: 'Help', path: '/help' },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-60 bg-white border-r border-gray-200 py-5 flex flex-col min-h-screen">
      <div className="px-5 pb-8 text-lg font-semibold text-gray-800">Heatwave Health</div>
      <div className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-5 py-3 text-sm rounded-none transition-colors duration-150 ${
              isActive(item.path)
                ? 'bg-gray-100 text-blue-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'
            }`}
          >
            <span className="w-4 h-4 mr-3 opacity-70">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <div className="mt-8 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Support</div>
        {supportItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-5 py-3 text-sm rounded-none transition-colors duration-150 ${
              isActive(item.path)
                ? 'bg-gray-100 text-blue-700 font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'
            }`}
          >
            <span className="w-4 h-4 mr-3 opacity-70">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
