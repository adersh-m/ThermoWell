import { useState } from 'react';

function Dashboard() {
  const [selectedRegion] = useState('Southeast Asia');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Heat Advisory Dashboard</h2>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-600">Region: </span>
          <span className="font-medium">{selectedRegion}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Current Temperature</h3>
          <p className="text-3xl font-bold text-red-600">38°C</p>
          <p className="text-gray-500">Feels like 42°C</p>
          <p className="text-sm text-gray-600 mt-2">Based on IMD guidelines</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Humidity</h3>
          <p className="text-3xl font-bold text-blue-600">75%</p>
          <p className="text-gray-500">High humidity alert</p>
          <p className="text-sm text-gray-600 mt-2">Source: PAGASA</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Heat Index</h3>
          <p className="text-3xl font-bold text-orange-600">Danger</p>
          <p className="text-gray-500">Take immediate precautions</p>
          <p className="text-sm text-gray-600 mt-2">As per JMA standards</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Regional Alerts</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span>Central Region</span>
              <span className="text-red-600 font-medium">41°C</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span>Eastern Coast</span>
              <span className="text-orange-600 font-medium">39°C</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span>Southern District</span>
              <span className="text-yellow-600 font-medium">37°C</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">Data from regional meteorological departments</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Emergency Resources</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Cooling Centers</span>
              <span className="text-green-600">15 Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Medical Units</span>
              <span className="text-blue-600">8 Available</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="font-medium">Water Stations</span>
              <span className="text-purple-600">12 Operational</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Updated every 30 minutes</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Health Advisory Status</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-700">
              <span className="w-32">Air Quality:</span>
              <span className="font-medium text-orange-600">Moderate (128 AQI)</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <span className="w-32">UV Index:</span>
              <span className="font-medium text-red-600">Very High (11)</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <span className="w-32">Ozone Level:</span>
              <span className="font-medium text-yellow-600">Moderate</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Based on WHO guidelines for Asia Pacific</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Local Guidelines</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2 text-gray-700">
              <span>🏥</span>
              <span>Follow Ministry of Health advisory</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <span>🌡️</span>
              <span>Monitor local temperature updates</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700">
              <span>⚕️</span>
              <span>Contact nearest health center if needed</span>
            </li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">Guidelines by National Disaster Management Authority</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;