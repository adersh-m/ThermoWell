import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  BellAlertIcon,
  LightBulbIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  HeartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { label: 'Home', to: '/', icon: HomeIcon },
  { label: 'Dashboard', to: '/dashboard', icon: ChartBarIcon },
  { label: 'Health Score', to: '/health-score', icon: HeartIcon },
  { label: 'Advisories', to: '/advisories', icon: ExclamationTriangleIcon },
  { label: 'Alerts', to: '/alerts', icon: BellAlertIcon },
  { label: 'Tips', to: '/tips', icon: LightBulbIcon },
  { label: 'Resources', to: '/resources', icon: BookOpenIcon },
  { label: 'Settings', to: '/settings', icon: Cog6ToothIcon },
  { label: 'Help', to: '/help', icon: UserGroupIcon },
  { label: 'About', to: '/about', icon: InformationCircleIcon },
  { label: 'Contact', to: '/contact', icon: EnvelopeIcon },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 h-screen border-r dark:border-gray-700 hidden md:flex flex-col fixed">
      <div className="text-xl font-bold p-6 text-gray-900 dark:text-white">
        ThermoWell
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="text-sm font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
