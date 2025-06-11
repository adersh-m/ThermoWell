// src/layouts/AdminLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';

const AdminLayout: React.FC = () => {

  const { user, logout } = useAuth();
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Admin Panel</h2>
        <nav className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <a href="/admin" className="block hover:underline">Dashboard</a>
          <a href="/admin/tips" className="block hover:underline">Manage Tips</a>
          <a href="/admin/advisories" className="block hover:underline">Manage Advisories</a>
          <a href="/admin/users" className="block hover:underline">User Roles</a>
          {user && (
            <button
              onClick={logout}
              className="text-sm text-red-600 hover:underline mt-4"
            >
              <ArrowLeftStartOnRectangleIcon className="h-6 w-6 inline-block mr-1 text-red-600" />
              Logout
            </button>
          )}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet /> {/* 🔥 Render child routes here */}
      </main>
    </div>)
};

export default AdminLayout;
