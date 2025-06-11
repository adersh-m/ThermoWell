// src/components/settings/SettingsForm.tsx
import React from 'react';
import { type UserSettings } from '../../types/UserSettings';

interface Props {
  settings: UserSettings;
  onChange: (updates: Partial<UserSettings>) => void;
}

const SettingsForm: React.FC<Props> = ({ settings, onChange }) => {
  const handleToggle = (key: keyof UserSettings) => {
    onChange({ [key]: !settings[key] });
  };

  const Toggle = ({
    label,
    value,
    onClick,
  }: {
    label: string;
    value: boolean;
    onClick: () => void;
  }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <span className="text-gray-800 dark:text-gray-100">{label}</span>
      <button
        onClick={onClick}
        className={`w-11 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 duration-300 ease-in-out ${
          value ? 'bg-blue-500' : ''
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            value ? 'translate-x-5' : ''
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <Toggle
        label="Enable Notifications"
        value={settings.notifications}
        onClick={() => handleToggle('notifications')}
      />
      <Toggle
        label="Dark Mode"
        value={settings.darkMode}
        onClick={() => handleToggle('darkMode')}
      />
      <Toggle
        label="Allow Health Data Sharing"
        value={settings.shareData}
        onClick={() => handleToggle('shareData')}
      />
    </div>
  );
};

export default SettingsForm;
