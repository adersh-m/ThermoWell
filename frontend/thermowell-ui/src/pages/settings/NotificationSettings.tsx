import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

const NotificationSettings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyDigest: true,
    emergencyAlerts: true,
    heatWaveWarnings: true,
    dailyTips: false,
    nightMode: false,
    soundEnabled: true
  });

  useEffect(() => {
    // Load existing notification preferences
    const loadSettings = async () => {
      try {
        const profile = await UserService.fetchUserProfile();
        if (profile.preferences?.notifications !== undefined) {
          // Update based on stored preferences
          setNotificationSettings(prev => ({
            ...prev,
            emailAlerts: profile.preferences?.notifications || false
          }));
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };

    loadSettings();
  }, []);

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await UserService.updateUserPreferences({
        notifications: notificationSettings.emailAlerts
      });
      showSaveMessage('Notification settings saved successfully!');
    } catch (error) {
      showSaveMessage('Error saving notification settings.');
    } finally {
      setSaving(false);
    }
  };

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }> = ({ 
    checked, 
    onChange, 
    disabled = false 
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
    </label>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
            <p className="text-gray-600 text-sm mt-1">Choose how you want to be notified about heat advisories and updates.</p>
          </div>
        </div>

        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('Error') ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="space-y-8">
          {/* Emergency Notifications */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              🚨 Emergency Notifications
            </h3>
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Emergency Heat Alerts</div>
                  <div className="text-xs text-gray-500">Critical heat warnings and dangerous conditions</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.emergencyAlerts}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, emergencyAlerts: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Heat Wave Warnings</div>
                  <div className="text-xs text-gray-500">Advance warning of incoming heat waves</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.heatWaveWarnings}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, heatWaveWarnings: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Regular Notifications */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              📧 Regular Notifications
            </h3>
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Email Alerts</div>
                  <div className="text-xs text-gray-500">Receive important updates via email</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.emailAlerts}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailAlerts: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Weekly Health Digest</div>
                  <div className="text-xs text-gray-500">Summary of tips and health information</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.weeklyDigest}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, weeklyDigest: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Daily Safety Tips</div>
                  <div className="text-xs text-gray-500">Daily tips for heat safety and wellness</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.dailyTips}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, dailyTips: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              🔔 Push Notifications
            </h3>
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Browser Notifications</div>
                  <div className="text-xs text-gray-500">Get notifications in your browser</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.pushNotifications}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Sound Alerts</div>
                  <div className="text-xs text-gray-500">Play sound with notifications</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.soundEnabled}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, soundEnabled: checked }))}
                />
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              📱 SMS Notifications
            </h3>
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">SMS Alerts</div>
                  <div className="text-xs text-gray-500">Receive emergency alerts via text message</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.smsAlerts}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsAlerts: checked }))}
                />
              </div>
              
              {notificationSettings.smsAlerts && (
                <div className="ml-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📞 SMS notifications will be sent to your registered phone number. 
                    Standard messaging rates may apply.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Do Not Disturb */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              🌙 Do Not Disturb
            </h3>
            <div className="space-y-4 pl-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-gray-800">Night Mode (10 PM - 7 AM)</div>
                  <div className="text-xs text-gray-500">Silence non-emergency notifications during night hours</div>
                </div>
                <ToggleSwitch
                  checked={notificationSettings.nightMode}
                  onChange={(checked) => setNotificationSettings(prev => ({ ...prev, nightMode: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Notification Settings'}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Test */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Notifications</h3>
        <p className="text-gray-600 text-sm mb-4">
          Send yourself a test notification to ensure everything is working correctly.
        </p>
        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
          Send Test Notification
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
