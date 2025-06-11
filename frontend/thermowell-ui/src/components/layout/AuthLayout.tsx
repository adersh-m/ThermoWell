// src/layouts/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => (
  <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <Outlet /> {/* 🔥 Render child routes here */}
    </div>
  </main>
);

export default AuthLayout;
