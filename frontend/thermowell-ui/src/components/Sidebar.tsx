import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiGrid, FiAlertCircle, FiBell, FiActivity, FiBookOpen, FiHelpCircle, FiSettings } from 'react-icons/fi';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <FiGrid /> },
    { label: 'Advisories', path: '/advisories', icon: <FiAlertCircle /> },
    { label: 'Alerts', path: '/alerts', icon: <FiBell /> },
    { label: 'Health Score', path: '/health-score', icon: <FiActivity /> },
    { label: 'Tips', path: '/tips', icon: <FiBookOpen /> },
    { label: 'Resources', path: '/resources', icon: <FiBookOpen /> }
  ];

  const supportItems = [
    { label: 'Help', path: '/help', icon: <FiHelpCircle /> },
    { label: 'Settings', path: '/settings', icon: <FiSettings /> }
  ];

  const isActive = (path: string) => {
    if (path === '/settings') {
      return location.pathname.startsWith('/settings');
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white border border-gray-200 rounded-lg p-2 shadow focus:outline-none"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Sidebar overlay for mobile */}
      {open && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden" onClick={() => setOpen(false)}></div>
      )}
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen ${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-200 z-40 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{ boxShadow: open ? '0 2px 16px rgba(0,0,0,0.08)' : undefined }}
      >
        <div className={`px-5 py-5 flex items-center justify-between ${collapsed ? 'justify-center' : ''}`}>
          {/* App Icon */}
          <span className="flex items-center gap-2">
            <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
            </svg>
            {!collapsed && 
              <div className="text-2xl font-bold font-heading bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">ThermoWell</div>
            }
          </span>
          <button
            className="md:hidden p-1 ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto min-h-0">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-3 text-sm rounded-none transition-colors duration-150 border-l-4 ${
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-700 font-semibold border-primary-600'
                  : 'text-secondary hover:bg-gray-50 hover:text-primary-700 border-transparent'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
          <div className={`mt-8 px-5 text-xs font-semibold text-secondary uppercase tracking-wide mb-2 ${collapsed ? 'hidden' : ''}`}>Support</div>
          {supportItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-3 text-sm rounded-none transition-colors duration-150 ${
                isActive(item.path)
                  ? 'bg-gray-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
        {/* Collapse button at the very bottom, always aligned */}
        <div className="flex-shrink-0 flex flex-col items-center justify-end mt-0" style={{minHeight:'56px'}}>
          <button
            className="hidden md:inline-flex flex-row justify-center p-2 text-gray-400 hover:text-gray-700 focus:outline-none border-gray-200 bg-white shadow transition-colors duration-150 w-full"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Collapse sidebar"
          >
            {collapsed ? <FiChevronRight className="h-6 w-6" /> : <FiChevronLeft className="h-6 w-6" />}
            {!collapsed && <span className="text-xs mt-1 text-gray-500">Click to hide</span>}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
