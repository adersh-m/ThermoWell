// src/pages/auth/ForgotPasswordPage.tsx
import React, { useState } from 'react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset link sent to:', email);
    setSent(true);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
        Forgot Password
      </h1>
      {sent ? (
        <p className="text-center text-green-600 dark:text-green-400">
          Reset link sent! Please check your email.
        </p>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter your email address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordPage;
