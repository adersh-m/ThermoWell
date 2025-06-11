import React from 'react';
import { BellIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {

  return (
  <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
    {/* Mobile menu button */}
    <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
      <Bars3Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
    </button>

    {/* Placeholder: could be search, page title, etc. */}
    <div />

    {/* Notification & user */}
    <div className="flex items-center space-x-4">
      
      <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
        <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>
      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  </header>);
};

export default Header;
