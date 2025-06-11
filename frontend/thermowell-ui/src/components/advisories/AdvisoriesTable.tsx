// src/components/advisories/AdvisoriesTable.tsx
import React from 'react';

export interface Advisory {
  id: string;
  region: string;
  heatIndex: number;
  level: 'Severe' | 'High' | 'Moderate' | 'Normal';
  issuedDate: string; // ISO or human‐friendly
  status: 'active' | 'resolved';
}

interface Props {
  advisories: Advisory[];
}

const levelColors: Record<Advisory['level'], string> = {
  Severe:    'bg-red-100 text-red-800',
  High:      'bg-orange-100 text-orange-800',
  Moderate:  'bg-yellow-100 text-yellow-800',
  Normal:    'bg-green-100 text-green-800',
};

const AdvisoriesTable: React.FC<Props> = ({ advisories }) => (
  <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Region
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Heat Index
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Warning Level
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Issued Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {advisories.map((a) => (
          <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
              {a.region}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-gray-100">
              {a.heatIndex}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${levelColors[a.level]}`}
              >
                {a.level}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
              {new Date(a.issuedDate).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdvisoriesTable;
