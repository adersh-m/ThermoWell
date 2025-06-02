function Resources() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Resources</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
          <ul className="space-y-4">
            <li>
              <div className="font-medium text-gray-800">Emergency Services</div>
              <div className="text-red-600 text-lg">911</div>
            </li>
            <li>
              <div className="font-medium text-gray-800">Heat Emergency Hotline</div>
              <div className="text-red-600 text-lg">1-800-HEAT-HELP</div>
            </li>
            <li>
              <div className="font-medium text-gray-800">Medical Emergency</div>
              <div className="text-red-600 text-lg">1-800-MED-HELP</div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Cooling Centers</h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center">
              <span className="font-medium">Downtown Community Center</span>
              <span className="text-green-600">Open</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium">North Library</span>
              <span className="text-green-600">Open</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-medium">South Recreation Center</span>
              <span className="text-green-600">Open</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Downloadable Resources</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <span>📄</span>
              <span className="text-blue-600 hover:underline cursor-pointer">
                Heat Safety Guide (PDF)
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📄</span>
              <span className="text-blue-600 hover:underline cursor-pointer">
                Emergency Preparedness Checklist
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📄</span>
              <span className="text-blue-600 hover:underline cursor-pointer">
                Vulnerable Groups Advisory
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                National Weather Service
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Public Health Department
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Red Cross Heat Safety
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Resources;