// src/components/advisories/AdvisoriesStatsCards.tsx
import React from 'react';

export interface AdvisoryStats {
  total: number;
  active: number;
  resolved: number;
}

interface Props {
  stats: AdvisoryStats;
}

const AdvisoriesStatsCards: React.FC<Props> = ({ stats }) => {
  const items = [
    { label: 'Total Advisories',   value: stats.total },
    { label: 'Active Advisories',  value: stats.active },
    { label: 'Resolved Advisories', value: stats.resolved },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdvisoriesStatsCards;
