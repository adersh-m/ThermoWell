// src/components/alerts/AlertList.tsx
import React from 'react';
import {
  ExclamationTriangleIcon,
  BellAlertIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export interface Alert {
  id: string;
  type: 'Warning' | 'Watch' | 'Info';
  title: string;
  message: string;
  timestamp: string; // ISO date
}

interface Props {
  alerts: Alert[];
}

const typeMap: Record<
  Alert['type'],
  { Icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string }
> = {
  Warning: { Icon: ExclamationTriangleIcon, color: 'text-red-500' },
  Watch:   { Icon: BellAlertIcon,          color: 'text-yellow-500' },
  Info:    { Icon: InformationCircleIcon,   color: 'text-blue-500' },
};

const AlertList: React.FC<Props> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No alerts at this time.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {alerts.map((alert) => {
        const { Icon, color } = typeMap[alert.type] || typeMap.Info;
        return (
          <li
            key={alert.id}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition flex items-start"
          >
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {alert.title}
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {alert.message}
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 text-right">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default AlertList;
