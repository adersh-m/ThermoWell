// src/pages/SettingsPage.tsx
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import SettingsForm from '../components/settings/SettingsForm';
import { type UserSettings } from '../types/UserSettings';

const defaultSettings: UserSettings = {
  notifications: true,
  darkMode: false,
  shareData: false,
};

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage or fallback
    const stored = localStorage.getItem('user-settings');
    if (stored) {
      setSettings(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleChange = (updates: Partial<UserSettings>) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    localStorage.setItem('user-settings', JSON.stringify(updated));
  };

  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your preferences" />

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading…</p>
      ) : (
        <SettingsForm settings={settings} onChange={handleChange} />
      )}
    </>
  );
};

export default SettingsPage;
