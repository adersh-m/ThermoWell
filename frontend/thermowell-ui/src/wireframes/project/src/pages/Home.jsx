import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
        <img 
          src="https://images.pexels.com/photos/3873175/pexels-photo-3873175.jpeg"
          alt="Heatwave" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 to-transparent flex items-center">
          <div className="px-8 max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">
              Stay Safe During Extreme Heat
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Get real-time alerts and health advisories to protect yourself and your loved ones
            </p>
            <Link 
              to="/dashboard" 
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block"
            >
              View Live Updates
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg mb-12">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-red-500 text-3xl">🌡️</span>
          </div>
          <div className="ml-4">
            <h3 className="text-red-800 text-xl font-semibold">Current Alert Status</h3>
            <p className="text-red-700 text-lg">High Alert: Temperature expected to reach 40°C (104°F)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3933881/pexels-photo-3933881.jpeg"
            alt="Cooling Center" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cooling Centers</h2>
            <p className="text-gray-600 mb-4">Find nearby cooling centers to stay safe during extreme heat</p>
            <Link 
              to="/resources" 
              className="text-red-600 hover:text-red-700 font-medium"
            >
              View Locations →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3943882/pexels-photo-3943882.jpeg"
            alt="Health Advisory" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Health Advisory</h2>
            <p className="text-gray-600 mb-4">Get important health tips and preventive measures</p>
            <Link 
              to="/advisories" 
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Learn More →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3958391/pexels-photo-3958391.jpeg"
            alt="Emergency Help" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Emergency Help</h2>
            <p className="text-gray-600 mb-4">Access emergency contacts and immediate assistance</p>
            <Link 
              to="/help" 
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Get Help →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;