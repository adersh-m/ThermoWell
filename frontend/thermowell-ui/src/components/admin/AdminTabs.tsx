// src/components/admin/AdminTabs.tsx
import React from 'react';

interface AdminTabsProps {
  current: string;
  onChange: (key: string) => void;
}

const tabs = ['Tips', 'Advisories', 'Users'];

const AdminTabs: React.FC<AdminTabsProps> = ({ current, onChange }) => {
  return (
    <div className="flex space-x-4 mb-6 border-b border-gray-300 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 font-medium ${
            current === tab
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;
