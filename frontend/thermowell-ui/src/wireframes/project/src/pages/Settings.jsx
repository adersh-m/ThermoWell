function Settings() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Email Notifications</h4>
                <p className="text-gray-600 text-sm">Receive alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">SMS Alerts</h4>
                <p className="text-gray-600 text-sm">Receive alerts via text message</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Push Notifications</h4>
                <p className="text-gray-600 text-sm">Receive alerts on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Location Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="location">
                Primary Location
              </label>
              <input
                type="text"
                id="location"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your location"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoLocation"
                className="rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="autoLocation" className="text-gray-700">
                Use automatic location detection
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Temperature Units</h3>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="temp-unit"
                className="form-radio text-red-600 focus:ring-red-500"
                checked
              />
              <span className="ml-2">Celsius (°C)</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="temp-unit"
                className="form-radio text-red-600 focus:ring-red-500"
              />
              <span className="ml-2">Fahrenheit (°F)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;