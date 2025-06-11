// src/pages/TipsPage.tsx
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import TipList, { type TipSummary } from '../components/tips/TipList';

import tipsData from '../data/tips.json'; // Assuming you have a local JSON file for fallback

const TipsPage: React.FC = () => {
  const [tips, setTips] = useState<TipSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tips')
      .then((res) => res.json())
      .then((data: TipSummary[]) => setTips(data))
      .catch(() => {
        // Fallback sample data
        setTips((tipsData as TipSummary[])); // Limit to 10 for performance
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Safety Tips"
        subtitle="Practical advice to protect yourself during extreme heat"
      />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading tips…
        </p>
      ) : (
        <TipList tips={tips} />
      )}
    </>
  );
};

export default TipsPage;
