import React, { useState, useEffect } from 'react';
import { AdvisoryService } from '../services/AdvisoryService';
import type { UrgentAlert } from '../services/AdvisoryService';

const AdvisoryPage: React.FC = () => {
  const [urgentAlerts, setUrgentAlerts] = useState<UrgentAlert[]>([]);
  const [currentAdvisory, setCurrentAdvisory] = useState<{
    type: string;
    title: string;
    description: string;
    time: string;
    validUntil: string;
  } | null>(null);

  useEffect(() => {
    AdvisoryService.fetchUrgentAlerts().then((data: UrgentAlert[]) => setUrgentAlerts(data));
    AdvisoryService.fetchCurrentAdvisory().then((data) => setCurrentAdvisory(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Health Advisories</h2>

      {/* Current Advisory */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Current Advisory</h3>
        {currentAdvisory ? (
          <div className="border-l-4 border-orange-500 pl-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-orange-500 text-xl">⚠️</span>
              <span className="text-orange-600 text-sm font-semibold uppercase">{currentAdvisory.type}</span>
            </div>
            <h4 className="font-medium text-lg mb-2">{currentAdvisory.title}</h4>
            <p className="text-gray-600 mb-2">{currentAdvisory.description}</p>
            <div className="text-sm text-gray-500">
              Valid until: {new Date(currentAdvisory.validUntil).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="text-gray-500">Loading current advisory...</div>
        )}
      </div>

      {/* Urgent Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Urgent Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urgentAlerts.map((alert, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl">🚨</span>
                <div>
                  <h4 className="font-medium text-red-800">{alert.risk}</h4>
                  <p className="text-gray-600 text-sm">{alert.action}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: <span className="font-medium">{alert.status}</span> • {alert.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Warning Signs to Watch For</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <h4 className="font-medium">Heat Exhaustion</h4>
                <p className="text-gray-600 text-sm">Excessive sweating, weakness, dizziness</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <h4 className="font-medium">Heat Cramps</h4>
                <p className="text-gray-600 text-sm">Muscle pain or spasms</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <h4 className="font-medium">Heat Stroke</h4>
                <p className="text-gray-600 text-sm">High body temperature, confusion</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <div>
                <h4 className="font-medium">Dehydration</h4>
                <p className="text-gray-600 text-sm">Extreme thirst, dry mouth</p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Based on guidelines from health authorities</p>
      </div>
    </div>
  );
};

export default AdvisoryPage;
