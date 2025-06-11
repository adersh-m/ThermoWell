// src/components/dashboard/QuickLinks.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface LinkItem {
  label: string;
  to: string;
}

const QuickLinks: React.FC<{ links: LinkItem[] }> = ({ links }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
    <ul className="list-disc ml-5 text-blue-600 dark:text-blue-400">
      {links.map(link => (
        <li key={link.to}>
          <Link to={link.to} className="hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default QuickLinks;
