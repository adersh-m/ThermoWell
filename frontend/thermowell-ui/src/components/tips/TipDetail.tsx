// src/components/tips/TipDetail.tsx
import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

export interface TipDetailModel {
  id: string;
  title: string;
  content: string;          // full text (can include newlines)
}

interface TipDetailProps {
  tip: TipDetailModel;
}

const TipDetail: React.FC<TipDetailProps> = ({ tip }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-3xl mx-auto">
    {/* Header with icon + title */}
    <div className="flex items-center mb-6">
      <LightBulbIcon className="h-8 w-8 text-yellow-500 mr-3 flex-shrink-0" />
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {tip.title}
      </h2>
    </div>

    {/* Content */}
    <div className="prose dark:prose-invert text-gray-700 dark:text-gray-300">
      {tip.content.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  </div>
);

export default TipDetail;
