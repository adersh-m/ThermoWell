import React, { useState } from 'react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: false,
    smsNotifications: false,
    pushNotifications: false,
    severeHeatwaves: true,
    dailySummaries: false
  });

  const userProfile = {
    name: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 555 123 4567',
    city: 'San Francisco',
    bio: 'Health advisor passionate about wellness and safety.'
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Account Settings</h1>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {['Profile', 'Notifications', 'Security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-semibold border-b-2 transition-colors duration-150 ${
              activeTab === tab
                ? 'border-heat text-heat'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'Profile' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile</h2>

          {/* Personal Info Section */}
          <div className="flex items-start justify-between bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-heat flex items-center justify-center text-white text-lg font-bold">
                {userProfile.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-base mb-1">Personal Info</div>
                <div className="text-gray-500 text-sm">Manage your name, contact, and bio. This information helps us personalize your experience.</div>
              </div>
            </div>
            <button className="btn-primary text-xs px-3 py-1">
              Edit
            </button>
          </div>

          {/* Contact Details */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-500 mb-2">Contact Details</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Full Name</div>
                <div className="bg-gray-50 rounded-md p-3 text-sm">
                  {userProfile.name}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Email</div>
                <div className="bg-gray-50 rounded-md p-3 text-sm">
                  {userProfile.email}
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-500 mb-2">Phone Number</div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Phone</div>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                {userProfile.phone}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-500 mb-2">Location</div>
            <div>
              <div className="text-xs text-gray-400 mb-1">City</div>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                {userProfile.city}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <div className="text-xs font-semibold text-gray-500 mb-2">Bio</div>
            <div>
              <div className="text-xs text-gray-400 mb-1">About You</div>
              <div className="bg-gray-50 rounded-md p-3 text-sm min-h-[80px]">
                {userProfile.bio}
              </div>
            </div>
          </div>

          <button className="btn-primary">Save Changes</button>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'Notifications' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Notifications</h2>
          <p className="text-gray-500 mb-6 text-sm">Manage how you receive alerts and updates.</p>

          <div className="flex flex-col gap-4 mb-8">
            {/* Email Alerts */}
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Email Alerts</div>
                <div className="text-gray-500 text-xs">Get important advisories by email</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-heat focus:ring-heat"
                  checked={notificationSettings.emailAlerts}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    emailAlerts: e.target.checked
                  })}
                />
              </label>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">SMS Notifications</div>
                <div className="text-gray-500 text-xs">Receive urgent updates via SMS</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-heat focus:ring-heat"
                  checked={notificationSettings.smsNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    smsNotifications: e.target.checked
                  })}
                />
              </label>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Push Notifications</div>
                <div className="text-gray-500 text-xs">Enable real-time alerts on your device</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-heat focus:ring-heat"
                  checked={notificationSettings.pushNotifications}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    pushNotifications: e.target.checked
                  })}
                />
              </label>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Advisory Preferences</h3>
          <div className="flex flex-col gap-4">
            {/* Severe Heatwaves */}
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Severe Heatwaves</div>
                <div className="text-gray-500 text-xs">Always notify for severe events</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-heat focus:ring-heat"
                  checked={notificationSettings.severeHeatwaves}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    severeHeatwaves: e.target.checked
                  })}
                />
              </label>
            </div>

            {/* Daily Summaries */}
            <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
              <div className="flex-1">
                <div className="font-medium text-sm mb-1">Daily Summaries</div>
                <div className="text-gray-500 text-xs">Get a daily summary of conditions</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-heat focus:ring-heat"
                  checked={notificationSettings.dailySummaries}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    dailySummaries: e.target.checked
                  })}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'Security' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Security</h2>
          <p className="text-gray-500 mb-6 text-sm">Manage your password and account security settings.</p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Password</h3>
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-xs text-gray-400 mb-1">Current Password</div>
                <input
                  type="password"
                  className="w-full rounded-md border-gray-300 focus:border-heat focus:ring-2 focus:ring-heat focus:ring-opacity-50 transition duration-150 ease-in-out p-3 text-sm"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value
                  })}
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">New Password</div>
                <input
                  type="password"
                  className="w-full rounded-md border-gray-300 focus:border-heat focus:ring-2 focus:ring-heat focus:ring-opacity-50 transition duration-150 ease-in-out p-3 text-sm"
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })}
                />
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">Confirm New Password</div>
                <input
                  type="password"
                  className="w-full rounded-md border-gray-300 focus:border-heat focus:ring-2 focus:ring-heat focus:ring-opacity-50 transition duration-150 ease-in-out p-3 text-sm"
                  placeholder="Re-enter new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })}
                />
              </div>
              <button className="btn-primary">Update Password</button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
            <div className="flex flex-col gap-4">
              {/* Authenticator App */}
              <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">Authenticator App</div>
                  <div className="text-gray-500 text-xs">Add extra security with an authenticator app</div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-heat focus:ring-heat" />
                </label>
              </div>
              {/* SMS Verification */}
              <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center" />
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">SMS Verification</div>
                  <div className="text-gray-500 text-xs">Receive codes via SMS for login</div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-heat focus:ring-heat" />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
