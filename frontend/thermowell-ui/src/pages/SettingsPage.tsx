import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const userProfile = {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 555 123 4567',
    city: 'San Francisco',
    bio: 'Health advisor passionate about wellness and safety.'
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Account Settings</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Manage your profile, notifications, and preferences to stay updated.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {['Profile', 'Notifications', 'Security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors duration-150 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'Profile' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile</h2>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-base mb-1">Personal Info</div>
              <div className="text-gray-500 text-sm">Manage your name, contact, and bio.</div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'Notifications' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Notifications</h2>
          <p className="text-gray-500 mb-6 text-sm">Manage how you receive alerts and updates.</p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Email Alerts</div>
                <div className="text-gray-500 text-xs">Get important advisories by email</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'Security' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Security</h2>
          <p className="text-gray-500 mb-6 text-sm">Update your password and secure your account.</p>
        </div>
      )}

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

export default SettingsPage;
