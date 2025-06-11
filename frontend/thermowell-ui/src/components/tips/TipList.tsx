// src/components/tips/TipList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { LightBulbIcon } from '@heroicons/react/24/outline';

export interface TipSummary {
  id: string;
  title: string;
  summary: string;
}

interface TipListProps {
  tips: TipSummary[];
}

const TipList: React.FC<TipListProps> = ({ tips }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {tips.map((tip) => (
      <Link
        key={tip.id}
        to={`/tips/${tip.id}`}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition flex"
      >
        {/* Icon */}
        <LightBulbIcon className="h-6 w-6 text-yellow-500 mr-4 flex-shrink-0" />
        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {tip.title}
          </h3>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            {tip.summary}
          </p>
        </div>
      </Link>
    ))}
  </div>
);

export default TipList;
