import React from 'react';

const AdminPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminSection title="Advisories" description="Create, update, and manage advisories." />
        <AdminSection title="Dashboard Cards" description="Manage dashboard summary/status cards." />
        <AdminSection title="Notifications" description="Manage system notifications and alerts." />
        <AdminSection title="Tips" description="Manage health and safety tips." />
        <AdminSection title="Urgent Alerts" description="Manage urgent alerts for users." />
        <AdminSection title="Vulnerable Group Advice" description="Manage advice for vulnerable groups." />
      </div>
    </div>
  );
};

interface AdminSectionProps {
  title: string;
  description: string;
}

const AdminSection: React.FC<AdminSectionProps> = ({ title, description }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="mb-4 text-gray-500">{description}</p>
    {/* TODO: Wire up CRUD UI for {title} */}
    <div className="flex gap-2 mt-auto">
      <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition">Add</button>
      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition">Edit</button>
      <button className="bg-danger text-white px-4 py-2 rounded hover:bg-danger-dark transition">Delete</button>
    </div>
  </div>
);

export default AdminPage;