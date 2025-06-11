// src/pages/auth/LoginPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email); // Simulated login
    navigate('/admin'); // Redirect on success
  };
  

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
        Welcome Back
      </h1>
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
        Sign in to continue to ThermoWell
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-sm transition"
        >
          Sign In
        </button>

        <div className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          <Link to="/auth/forgot" className="text-blue-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
