import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid, FiAlertCircle, FiBook, FiHelpCircle, FiSettings } from 'react-icons/fi';

function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { icon: FiHome, text: 'Home', path: '/' },
    { icon: FiGrid, text: 'Dashboard', path: '/dashboard' },
    { icon: FiAlertCircle, text: 'Advisories', path: '/advisories' },
    { icon: FiBook, text: 'Resources', path: '/resources' },
    { icon: FiHelpCircle, text: 'Help', path: '/help' },
    { icon: FiSettings, text: 'Settings', path: '/settings' },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out
  `;

  return (
    <>
      <div className={sidebarClasses}>
        <div className="p-6">
          <div className="space-y-6">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-100 text-red-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.text}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

export default Sidebar;