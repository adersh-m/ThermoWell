// src/pages/AlertsPage.tsx
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import AlertList, { type Alert } from '../components/alerts/AlertList';

const AlertsPage: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/alerts')
            .then((res) => res.json())
            .then((data: Alert[]) => setAlerts(data))
            .catch(() => {
                // fallback sample
                setAlerts([
                    {
                        id: '1',
                        type: 'Warning',
                        title: 'Heatwave Warning Issued',
                        message: 'High temperatures expected in your area.',
                        timestamp: '2025-06-10T14:20:00Z',
                    },
                    {
                        id: '2',
                        type: 'Watch',
                        title: 'Heat Advisory in Effect',
                        message: 'Elevated temperatures forecasted for tomorrow.',
                        timestamp: '2025-06-10T08:00:00Z',
                    },
                    {
                        id: '3',
                        type: 'Info',
                        title: 'Weather Update',
                        message: 'Temperatures will remain high through the weekend.',
                        timestamp: '2025-06-09T12:00:00Z',
                    },
                    {
                        id: '4',
                        type: 'Warning',
                        title: 'Severe Weather Alert',
                        message: 'Severe thunderstorms expected in the afternoon.',
                        timestamp: '2025-06-10T10:00:00Z',
                    },
                ]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <PageHeader title="Alerts" />

            {loading ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
            ) : (
                <AlertList alerts={alerts} />
            )}
        </>
    );
};

export default AlertsPage;
