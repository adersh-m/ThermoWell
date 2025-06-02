function Advisories() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Health Advisories</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Current Warning Signs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <div>
                  <h4 className="font-medium">Heat Exhaustion</h4>
                  <p className="text-gray-600">Excessive sweating, weakness, dizziness</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <div>
                  <h4 className="font-medium">Heat Cramps</h4>
                  <p className="text-gray-600">Muscle pain or spasms</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <div>
                  <h4 className="font-medium">Heat Stroke</h4>
                  <p className="text-gray-600">High body temperature, confusion</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <div>
                  <h4 className="font-medium">Dehydration</h4>
                  <p className="text-gray-600">Extreme thirst, dry mouth</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Based on guidelines from Asian Heat Health Information Network</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Preventive Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Indoor Safety</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-700">
                  <span>🏠</span>
                  <span>Use air conditioning or fans</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span>💧</span>
                  <span>Drink water every 15-20 minutes</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span>👕</span>
                  <span>Wear light cotton clothing</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Outdoor Precautions</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 text-gray-700">
                  <span>⏰</span>
                  <span>Avoid peak hours (11 AM - 4 PM)</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span>🧴</span>
                  <span>Use SPF 30+ sunscreen</span>
                </li>
                <li className="flex items-center space-x-2 text-gray-700">
                  <span>👥</span>
                  <span>Check on elderly neighbors</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Recommended by WHO Western Pacific Region</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Vulnerable Groups</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span>👴</span>
                <span>Elderly (65+ years)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>👶</span>
                <span>Young children</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🤰</span>
                <span>Pregnant women</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span>🏃</span>
                <span>Outdoor workers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🏥</span>
                <span>People with chronic conditions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>💊</span>
                <span>Those on certain medications</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">As per ASEAN guidelines on heat vulnerability</p>
        </div>
      </div>
    </div>
  );
}

export default Advisories;