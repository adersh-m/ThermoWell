import React, { useState, useEffect } from 'react';
import NotificationService from '../services/NotificationService';

const AlertsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'heatwave' | 'health' | 'emergency'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest');

  // Load notifications from service
  useEffect(() => {
    const updateNotifications = async () => {
      const allNotifications = await NotificationService.fetchNotifications();
      setNotifications(allNotifications);
    };

    // Initial load
    updateNotifications();

    // Subscribe to changes (this will call updateNotifications when notifications change)
    const unsubscribe = NotificationService.subscribe(() => updateNotifications());

    return unsubscribe;
  }, []);

  const getSeverityIndicator = NotificationService.getSeverityIndicator;
  const getTypeIcon = NotificationService.getTypeIcon;
  const formatTimestamp = NotificationService.formatTimestamp;

  const markAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      setNotifications(await NotificationService.fetchNotifications());
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.isRead;
    if (filter === 'all') return true;
    return notif.type === filter;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }
    if (sortBy === 'priority') {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="heading mb-6">Urgent Alerts</h1>
            <p className="text-gray-600">
              Stay informed about heatwave conditions, health reminders, and emergency updates
            </p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All notifications</option>
              <option value="unread">Unread only</option>
              <option value="heatwave">Heatwave alerts</option>
              <option value="health">Health reminders</option>
              <option value="emergency">Emergency alerts</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="priority">Priority level</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {sortedNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {filter === 'unread' ? 'You\'re all caught up!' : 'Check back later for updates.'}
            </p>
          </div>
        ) : (
          sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`card mb-6 ${
                !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityIndicator(notification.severity)}`}>
                          {notification.severity.toUpperCase()}
                        </span>
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                            Action Required
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{formatTimestamp(notification.timestamp)}</span>
                        <span>•</span>
                        <span>{notification.source}</span>
                        {notification.location && (
                          <>
                            <span>•</span>
                            <span>📍 {notification.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {notification.message}
                  </p>

                  {notification.actionRequired && (
                    <div className="flex space-x-3">
                      <button className="btn btn-primary" onClick={() => markAsRead(notification.id)}>
                        Acknowledge
                      </button>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex space-x-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-full">
              <span className="text-2xl">🌡️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Heatwave Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.type === 'heatwave').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">💧</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Health Reminders</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.type === 'health').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Emergency Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.type === 'emergency').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Actions Taken</p>
              <p className="text-2xl font-bold text-gray-900">
                {notifications.filter(n => n.isRead && n.actionRequired).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
