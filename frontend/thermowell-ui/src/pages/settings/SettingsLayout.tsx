import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const SettingsLayout: React.FC = () => {
  const navigationItems = [
    { to: '/settings/profile', label: 'Profile', icon: '👤' },
    { to: '/settings/notifications', label: 'Notifications', icon: '🔔' },
    { to: '/settings/security', label: 'Security', icon: '🔒' },
    { to: '/settings/preferences', label: 'Preferences', icon: '⚙️' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-sm p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-700'
                          : 'text-secondary hover:bg-gray-50 hover:text-primary-900'
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="subheading mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="btn btn-secondary w-full text-left">Export Data</button>
              <button className="btn btn-secondary w-full text-left text-danger-600">Delete Account</button>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
