import React, { useState, useEffect } from 'react';
import { AdvisoryService } from '../services/AdvisoryService';
import type { GroupAdvisory, UrgentAlert } from '../services/AdvisoryService';
import { Link } from 'react-router-dom';

const AdvisoryPage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [groupAdvisories, setGroupAdvisories] = useState<GroupAdvisory[]>([]);
  const [urgentAlerts, setUrgentAlerts] = useState<UrgentAlert[]>([]);

  useEffect(() => {
    AdvisoryService.fetchGroupAdvisories().then((data: GroupAdvisory[]) => setGroupAdvisories(data));
    AdvisoryService.fetchUrgentAlerts().then((data: UrgentAlert[]) => setUrgentAlerts(data));
  }, []);

  const currentAdvisory = {
    type: 'Current Advisory',
    title: 'Extreme Heat Warning',
    description: 'Temperatures above 40°C. High risk for heatstroke. Stay indoors and hydrate.',
    time: 'Today, 10:00 AM',
    validUntil: 'Advisory valid until 8:00 PM. Updates will be provided as conditions change.'
  };

  const groups = ['All', 'Children', 'Elderly', 'Outdoor Workers'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Advisories</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Stay updated with the latest heatwave advisories and safety measures.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/tips" className="btn-primary text-lg font-semibold">View Tips</Link>
          <Link to="/resources" className="btn-secondary text-lg font-semibold">Explore Resources</Link>
        </div>
      </section>

      <h1 className="heading mb-10">Active Advisories</h1>

      {/* Current Advisory */}
      <div className="card bg-white shadow p-6 mb-12">
        <div className="text-secondary text-sm font-semibold mb-1">{currentAdvisory.type}</div>
        <div className="subheading mb-1">{currentAdvisory.title}</div>
        <div className="text-gray-600 mb-2">{currentAdvisory.description}</div>
      </div>

      {/* Urgent Alerts */}
      <section className="mb-12">
        <h2 className="subheading mb-4">Urgent Alerts</h2>
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
        <h2 className="subheading mb-4">Advisories by Group</h2>
        {/* Improved tab selection colors and alignments */}
        <div className="flex gap-4 mb-6">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
                selectedGroup === group
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-500'
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
              <div key={index} className="card">
                <div className="subheading mb-1">
                  {advisory.title}
                </div>
                <div className="text-primary">
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
