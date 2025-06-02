import React, { useState, useEffect } from 'react';
import { AdvisoryService } from '../services/AdvisoryService';
import type { UrgentAlert } from '../services/AdvisoryService';

const AdvisoryPage: React.FC = () => {
  const [urgentAlerts, setUrgentAlerts] = useState<UrgentAlert[]>([]);

  useEffect(() => {
    AdvisoryService.fetchUrgentAlerts().then((data: UrgentAlert[]) => setUrgentAlerts(data));
  }, []);

  const currentAdvisory = {
    type: 'Current Advisory',
    title: 'Extreme Heat Warning',
    description: 'Temperatures above 40°C. High risk for heatstroke. Stay indoors and hydrate.',
    time: 'Today, 10:00 AM',
    validUntil: 'Advisory valid until 8:00 PM. Updates will be provided as conditions change.'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Advisories</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Stay updated with the latest heatwave advisories and safety measures.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Advisory</h2>
        <div className="card bg-white shadow p-6">
          <div className="text-secondary text-sm font-semibold mb-1">{currentAdvisory.type}</div>
          <div className="subheading mb-1">{currentAdvisory.title}</div>
          <div className="text-gray-600 mb-2">{currentAdvisory.description}</div>
        </div>
      </section>

      {/* Urgent Alerts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Urgent Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urgentAlerts.map((alert, index) => (
            <div key={index} className="card bg-white shadow p-6">
              <div className="text-secondary text-sm font-semibold mb-1">{alert.risk}</div>
              <div className="text-gray-600 mb-2">{alert.action}</div>
              <div className="text-xs text-gray-500">Issued: {alert.time}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 flex items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
          AM
        </div>
        <div>
          <div className="font-semibold text-gray-900">Alex Morgan</div>
          <div className="text-gray-600 text-sm">Health Advisor</div>
        </div>
      </footer>
    </div>
  );
};

export default AdvisoryPage;
