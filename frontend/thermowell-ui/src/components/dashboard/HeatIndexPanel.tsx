// src/components/dashboard/HeatIndexPanel.tsx
import React from 'react';

interface Props {
  value: string;
  advisory: string;
}

const HeatIndexPanel: React.FC<Props> = ({ value, advisory }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Current Heat Index</h3>
    <p className="text-4xl font-bold text-red-600 dark:text-red-400 mb-1">{value}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{advisory}</p>
  </div>
);

export default HeatIndexPanel;
