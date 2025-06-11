// src/components/dashboard/StatSummaryCards.tsx
import React from 'react';
import {
  ExclamationTriangleIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ExclamationTriangleIcon,
  HeartIcon,
  LightBulbIcon
};

const StatSummaryCards: React.FC<{ stats: Stat[] }> = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    {stats.map(({ id, label, value, icon, color }) => {
      const Icon = iconMap[icon] ?? LightBulbIcon;
      return (
        <div
          key={id}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="flex items-center mb-2">
            <Icon className={`h-6 w-6 ${color} mr-2`} />
            <h4 className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</h4>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      );
    })}
  </div>
);

export default StatSummaryCards;
