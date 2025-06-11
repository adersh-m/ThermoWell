// src/pages/AdminPage.tsx
import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import AdminTabs from '../components/admin/AdminTabs';
import TipsTable from '../components/admin/TipTable';
import UsersTable from '../components/admin/UsersTable';
import AdvisoriesTable from '../components/admin/AdvisoriesTable';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tips');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Tips':
        return <TipsTable />;
      case 'Advisories':
        return <AdvisoriesTable />;
      case 'Users':
        return <UsersTable />;
      default:
        return null;
    }
  };

  return (
    <>
      <PageHeader title="Admin Panel" subtitle="Manage app content and users" />
      <AdminTabs current={activeTab} onChange={setActiveTab} />
      {renderTabContent()}
    </>
  );
};

export default AdminPage;
