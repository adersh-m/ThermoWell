import React, { useState, useEffect } from 'react';
import { AdvisoryService } from '../services/AdvisoryService';
import type { UrgentAlert, GroupAdvisory } from '../services/AdvisoryService';
import type { Advisory } from '../services/AdvisoryService';

const severityColors: Record<string, string> = {
  High: 'bg-red-500 text-white',
  Moderate: 'bg-yellow-400 text-gray-900',
  Low: 'bg-green-500 text-white',
};

const groupIcons: Record<string, string> = {
  Children: '🧒',
  Elderly: '🧓',
  'Outdoor Workers': '👷',
  default: '👥',
};

const AdvisoryPage: React.FC = () => {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [groupAdvisories, setGroupAdvisories] = useState<GroupAdvisory[]>([]);
  const [urgentAlerts, setUrgentAlerts] = useState<UrgentAlert[]>([]);
  const [currentAdvisory, setCurrentAdvisory] = useState<{
    type: string;
    title: string;
    description: string;
    time: string;
    validUntil: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      AdvisoryService.fetchAdvisories(),
      AdvisoryService.fetchGroupAdvisories(),
      AdvisoryService.fetchUrgentAlerts(),
      AdvisoryService.fetchCurrentAdvisory(),
    ]).then(([advs, groupAdvs, urgent, current]) => {
      setAdvisories(advs);
      setGroupAdvisories(groupAdvs);
      setUrgentAlerts(urgent);
      setCurrentAdvisory(current);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
        <img src="/images/heatwave-alert.jpg" alt="Advisories Banner" className="w-full h-40 object-cover object-center" />
      </div>
      <h1 className="heading mb-6">Heatwave Advisory</h1>
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading advisories...</p>
        </div>
      ) : (
        <>
          {/* Current Advisory */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="subheading mb-2">Current Advisory</h2>
            {currentAdvisory ? (
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-orange-500 text-xl">⚠️</span>
                  <span className="text-orange-600 text-sm font-semibold uppercase">{currentAdvisory.type}</span>
                </div>
                <h4 className="font-medium text-lg mb-2">{currentAdvisory.title}</h4>
                <p className="text-gray-600 mb-2">{currentAdvisory.description}</p>
                <div className="text-sm text-gray-500">
                  {/* Show validUntil as string if not a date */}
                  {currentAdvisory.validUntil && !/^\d{4}-\d{2}-\d{2}/.test(currentAdvisory.validUntil)
                    ? currentAdvisory.validUntil
                    : (() => {
                        const date = new Date(currentAdvisory.validUntil);
                        return isNaN(date.getTime())
                          ? 'Valid until: (date unavailable)'
                          : `Valid until: ${date.toLocaleDateString()}`;
                      })()}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Loading current advisory...</div>
            )}
          </div>

          {/* All Advisories */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="subheading mb-2">All Active Advisories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advisories.map((adv) => (
                <div key={adv.id} className="border-l-4 pl-4 mb-2 bg-gray-50 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${severityColors[adv.severity] || 'bg-gray-300 text-gray-800'}`}>{adv.severity}</span>
                    <span className="font-semibold text-gray-800">{adv.title}</span>
                  </div>
                  <div className="text-gray-600 text-sm">{adv.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Advisories */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="subheading mb-2">Group-Specific Advisories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupAdvisories.map((group, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <span className="text-2xl">{groupIcons[group.group] || groupIcons.default}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{group.title}</div>
                    <div className="text-gray-600 text-sm">{group.description}</div>
                    <div className="text-xs text-gray-400 mt-1">Group: {group.group}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Alerts */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="subheading mb-2">Urgent Alerts</h2>
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
            <h2 className="subheading mb-2">Warning Signs to Watch For</h2>
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
          </div>
        </>
      )}
    </div>
  );
};

export default AdvisoryPage;
