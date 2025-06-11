// src/components/resources/ResourceCardGrid.tsx
import React from 'react';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface ResourceCardGridProps {
  resources: Resource[];
}

const ResourceCardGrid: React.FC<ResourceCardGridProps> = ({ resources }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {resources.map((res) => (
      <a
        key={res.id}
        href={res.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {res.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {res.description}
        </p>
        <span className="text-blue-600 dark:text-blue-400 hover:underline">
          Learn more →
        </span>
      </a>
    ))}
  </div>
);

export default ResourceCardGrid;
