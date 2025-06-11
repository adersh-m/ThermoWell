// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';

import StatSummaryCards, { type Stat } from '../components/dashboard/StatSummaryCards';
import HeatIndexPanel from '../components/dashboard/HeatIndexPanel';
import QuickLinks from '../components/dashboard/QuickLinks';

import dashboardData from '../data/dashboardData.json'; // Mock data for now

interface DashboardModel {
  stats: Stat[];
  heatIndex: { value: string; advisory: string };
  quickLinks: { label: string; to: string }[];
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardModel | null>(null);

  useEffect(() => {
    // Replace with fetch('/api/dashboard') if API becomes available
    setData(dashboardData as DashboardModel);
  }, []);

  if (!data) {
    return (
      <>
        <PageHeader title="Dashboard" />
        <p className="text-center text-gray-500 dark:text-gray-400">Loading…</p>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Your personalized heat safety overview" />
      <StatSummaryCards stats={data.stats} />
      <HeatIndexPanel value={data.heatIndex.value} advisory={data.heatIndex.advisory} />
      <QuickLinks links={data.quickLinks} />
    </>
  );
};

export default DashboardPage;
