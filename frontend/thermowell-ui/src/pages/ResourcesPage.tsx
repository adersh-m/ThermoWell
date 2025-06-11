// src/pages/ResourcesPage.tsx
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import ResourceCardGrid, { type Resource } from '../components/resources/ResourceCardGrid';
import resourcesData from '../data/resources.json';

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetch('/api/resources')
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data: Resource[]) => setResources(data))
      .catch(() => {
        // Fallback to local JSON
        setResources(resourcesData as Resource[]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Resources"
        subtitle="Guides, links, and external tools"
      />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading resources…
        </p>
      ) : (
        <ResourceCardGrid resources={resources} />
      )}
    </>
  );
};

export default ResourcesPage;
