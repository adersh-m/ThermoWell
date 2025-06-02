import React, { useState } from 'react';

const SecuritySettings: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [sessions] = useState([
    { id: 1, device: 'Chrome on macOS', location: 'New York, NY', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'New York, NY', lastActive: '1 hour ago', current: false },
    { id: 3, device: 'Firefox on Windows', location: 'Boston, MA', lastActive: '2 days ago', current: false }
  ]);

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handlePasswordChange = async () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showSaveMessage('Passwords do not match.');
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      showSaveMessage('Password must be at least 8 characters long.');
      return;
    }

    try {
      setSaving(true);
      // Simulate password change API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSaveMessage('Password updated successfully!');
      setSecurityForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: securityForm.twoFactorEnabled
      });
    } catch (error) {
      showSaveMessage('Error updating password.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOutSession = (sessionId: number) => {
    // Handle session termination
    showSaveMessage(`Session terminated successfully.`);
  };

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  );

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
            <p className="text-gray-600 text-sm mt-1">Update your password to keep your account secure.</p>
          </div>
        </div>

        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            saveMessage.includes('Error') ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'
          }`}>
            {saveMessage}
          </div>
        )}

        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={securityForm.currentPassword}
              onChange={(e) => setSecurityForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={securityForm.newPassword}
              onChange={(e) => setSecurityForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters long</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={securityForm.confirmPassword}
              onChange={(e) => setSecurityForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
          
          <button
            onClick={handlePasswordChange}
            disabled={saving || !securityForm.currentPassword || !securityForm.newPassword || !securityForm.confirmPassword}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
            <p className="text-gray-600 text-sm mt-1">Add an extra layer of security to your account.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-gray-800">Enable Two-Factor Authentication</div>
              <div className="text-xs text-gray-500 mt-1">
                Protect your account with an authenticator app like Google Authenticator or Authy
              </div>
            </div>
            <ToggleSwitch
              checked={securityForm.twoFactorEnabled}
              onChange={(checked) => setSecurityForm(prev => ({ ...prev, twoFactorEnabled: checked }))}
            />
          </div>

          {securityForm.twoFactorEnabled && (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Setup Two-Factor Authentication</h4>
              <ol className="text-sm text-green-700 space-y-1">
                <li>1. Download an authenticator app</li>
                <li>2. Scan the QR code below</li>
                <li>3. Enter the 6-digit code from your app</li>
              </ol>
              <div className="mt-4 p-4 bg-white rounded border-2 border-dashed border-green-300 text-center">
                <div className="w-32 h-32 bg-gray-100 mx-auto rounded-lg flex items-center justify-center">
                  QR Code Placeholder
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Active Sessions</h2>
            <p className="text-gray-600 text-sm mt-1">Manage your active sessions across all devices.</p>
          </div>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {session.device.includes('Chrome') ? '🌐' : session.device.includes('Safari') ? '🧭' : '🦊'}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Current Session
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session.location} • Last active {session.lastActive}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleSignOutSession(session.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Sign Out
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Sign out of all other sessions
          </button>
        </div>
      </div>

      {/* Account Security Info */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last password change</span>
            <span className="text-sm text-gray-900">3 months ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Account created</span>
            <span className="text-sm text-gray-900">January 2025</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last security audit</span>
            <span className="text-sm text-green-600">✓ No issues found</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
