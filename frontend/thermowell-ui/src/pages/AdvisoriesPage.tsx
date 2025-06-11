// src/pages/AdvisoriesPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import AdvisoriesStatsCards from '../components/advisories/AdvisoriesStatsCards';
import AdvisoriesTable, { type Advisory } from '../components/advisories/AdvisoriesTable';

const advisories: Advisory[] = [
  {
    id: '1', region: 'North', heatIndex: 85, level: 'High', issuedDate: '2023-10-01',
    status: 'active'
  },
  {
    id: '2', region: 'South', heatIndex: 90, level: 'Severe', issuedDate: '2023-10-02',
    status: 'active'
  },
  {
    id: '3', region: 'East', heatIndex: 75, level: 'Moderate', issuedDate: '2023-10-03',
    status: 'active'
  },
  {
    id: '4', region: 'West', heatIndex: 80, level: 'Normal', issuedDate: '2023-10-04',
    status: 'resolved'
  },
  {
    id: '5', region: 'Central', heatIndex: 88, level: 'High', issuedDate: '2023-10-05',
    status: 'active'
  },
  {
    id: '6', region: 'North-East', heatIndex: 82, level: 'Moderate', issuedDate: '2023-10-06',
    status: 'active'
  },
  {
    id: '7', region: 'South-West', heatIndex: 95, level: 'Severe', issuedDate: '2023-10-07',
    status: 'resolved'
  },
  {
    id: '8', region: 'North-West', heatIndex: 78, level: 'Normal', issuedDate: '2023-10-08',
    status: 'active'
  },
  {
    id: '9', region: 'South-East', heatIndex: 89, level: 'High', issuedDate: '2023-10-09',
    status: 'active'
  },
  {
    id: '10', region: 'Central-East', heatIndex: 84, level: 'Moderate', issuedDate: '2023-10-10',
    status: 'resolved'
  },
];

const AdvisoriesPage: React.FC = () => {

  const [list, setList] = useState<Advisory[]>([]);

  useEffect(() => {
      fetch('api/advisories')
      .then(res => res.json())
      .then((data: Advisory[]) => setList(data))
      .catch(() => {
        // fallback or error handling
        setList(advisories);
      });
  }, []);

  const stats = useMemo(() => {
    const total    = list.length;
    const active   = list.filter(a => a.status === 'active').length;
    const resolved = list.filter(a => a.status === 'resolved').length;
    return { total, active, resolved };
  }, [list]);

  return (
    <>
      <PageHeader
        title="Advisories"
        actions={
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            New Advisory
          </button>
        }
      />

      {/* Stats cards */}
      <AdvisoriesStatsCards stats={stats} />

      {/* AdvisoriesTable */}
      <AdvisoriesTable advisories={list} />
    </>
  );
};

export default AdvisoriesPage;
