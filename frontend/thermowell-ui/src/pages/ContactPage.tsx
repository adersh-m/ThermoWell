// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Have questions or feedback?" />

      {submitted ? (
        <div className="max-w-xl mx-auto bg-green-100 dark:bg-green-900 p-6 rounded-xl text-center text-green-800 dark:text-green-300">
          Thank you! Your message has been received.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl mx-auto space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <input type="text" className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600" required />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <textarea className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600" rows={4} required />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      )}
    </>
  );
};

export default ContactPage;
