import React, { useState } from 'react';

const AdvisoryPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('All');

  const currentAdvisory = {
    type: 'Current Advisory',
    title: 'Extreme Heat Warning',
    description: 'Temperatures above 40°C. High risk for heatstroke. Stay indoors and hydrate.',
    time: 'Today, 10:00 AM',
    validUntil: 'Advisory valid until 8:00 PM. Updates will be provided as conditions change.'
  };

  const urgentAlerts = [
    {
      risk: 'Heatstroke risk: High',
      action: 'Limit outdoor activity',
      time: '09:45 AM',
      status: 'Active'
    },
    {
      risk: 'Medical advisory: Elderly',
      action: 'Check on neighbors',
      time: '09:30 AM',
      status: 'Active'
    }
  ];

  const groups = ['All', 'Children', 'Elderly', 'Outdoor Workers'];

  const groupAdvisories = [
    {
      group: 'Children',
      title: 'Hydration Alert',
      description: 'Encourage water breaks every 30 minutes.'
    },
    {
      group: 'Elderly',
      title: 'Stay Cool',
      description: 'Use fans and avoid direct sun.'
    },
    {
      group: 'Outdoor Workers',
      title: 'Rest Breaks',
      description: 'Take breaks in shaded areas.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Active Advisories
      </h1>

      {/* Current Advisory */}
      <div className="bg-white rounded-xl shadow p-6 mb-12">
        <div className="mb-3">
          <div className="text-heat text-sm font-semibold mb-1">
            {currentAdvisory.type}
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="font-semibold text-lg mb-1 md:mb-0">
              {currentAdvisory.title}
            </div>
            <div className="text-xs text-gray-500">
              {currentAdvisory.time}
            </div>
          </div>
        </div>
        <div className="text-gray-700 mb-2">
          {currentAdvisory.description}
        </div>
        <div className="text-xs text-gray-400">
          {currentAdvisory.validUntil}
        </div>
      </div>

      {/* Urgent Alerts */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Urgent Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {urgentAlerts.map((alert, index) => (
            <div key={index} className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4 flex flex-col gap-1 shadow">
              <div className="font-semibold text-red-700">
                {alert.risk}
              </div>
              <div className="text-sm text-red-600">
                {alert.action}
              </div>
              <div className="text-xs text-gray-500">
                Issued: {alert.time}
              </div>
              <div className="text-xs text-red-500 font-semibold">
                Status: {alert.status}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Advisories by Group */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Advisories by Group
        </h2>
        <div className="flex gap-4 mb-6">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
                selectedGroup === group
                  ? 'bg-heat text-white border-heat'
                  : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupAdvisories
            .filter(advisory => selectedGroup === 'All' || advisory.group === selectedGroup)
            .map((advisory, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
                <div className="font-semibold text-lg mb-1">
                  {advisory.title}
                </div>
                <div className="text-gray-700 text-sm">
                  {advisory.description}
                </div>
                <div className="text-xs text-gray-400">
                  Group: {advisory.group}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default AdvisoryPage;
