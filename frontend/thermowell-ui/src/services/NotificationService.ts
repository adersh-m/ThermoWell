export interface Notification {
  id: string;
  type: 'heatwave' | 'health' | 'emergency' | 'system' | 'reminder';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  location?: string;
  actionRequired?: boolean;
  source: string;
}

class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      type: 'heatwave',
      severity: 'critical',
      title: 'Extreme Heat Warning',
      message: 'Temperatures expected to reach 115°F (46°C) in your area. Avoid outdoor activities between 10 AM - 6 PM.',
      timestamp: '2025-06-02T14:30:00Z',
      isRead: false,
      location: 'Phoenix, AZ',
      actionRequired: true,
      source: 'National Weather Service'
    },
    {
      id: '2',
      type: 'health',
      severity: 'medium',
      title: 'Hydration Reminder',
      message: 'You haven\'t logged water intake in 4 hours. Remember to stay hydrated during high temperatures.',
      timestamp: '2025-06-02T13:15:00Z',
      isRead: false,
      location: 'Phoenix, AZ',
      actionRequired: true,
      source: 'ThermoWell Health Monitor'
    },
    {
      id: '3',
      type: 'emergency',
      severity: 'high',
      title: 'Cooling Center Alert',
      message: 'Emergency cooling centers are now open in your area due to excessive heat conditions.',
      timestamp: '2025-06-02T12:00:00Z',
      isRead: true,
      location: 'Phoenix, AZ',
      actionRequired: false,
      source: 'Emergency Management'
    },
    {
      id: '4',
      type: 'heatwave',
      severity: 'high',
      title: 'Heat Advisory Extended',
      message: 'Heat advisory has been extended through Thursday. Heat index values up to 108°F expected.',
      timestamp: '2025-06-02T10:45:00Z',
      isRead: true,
      location: 'Phoenix, AZ',
      actionRequired: false,
      source: 'National Weather Service'
    },
    {
      id: '5',
      type: 'system',
      severity: 'low',
      title: 'Weekly Safety Report',
      message: 'Your weekly heatwave safety report is ready. You\'ve followed 85% of recommended safety measures.',
      timestamp: '2025-06-01T09:00:00Z',
      isRead: true,
      location: '',
      actionRequired: false,
      source: 'ThermoWell Analytics'
    },
    {
      id: '6',
      type: 'reminder',
      severity: 'medium',
      title: 'Emergency Kit Check',
      message: 'It\'s time to check your emergency kit. Ensure you have adequate water supplies and battery-powered fans.',
      timestamp: '2025-05-31T16:00:00Z',
      isRead: false,
      location: '',
      actionRequired: true,
      source: 'ThermoWell Preparedness'
    }
  ];

  // Listeners for real-time updates
  private listeners: ((notifications: Notification[]) => void)[] = [];

  // Get all notifications
  getAllNotifications(): Notification[] {
    return [...this.notifications];
  }

  // Get unread notifications only
  getUnreadNotifications(): Notification[] {
    return this.notifications.filter(n => !n.isRead);
  }

  // Get recent notifications (for TopBar popup)
  getRecentNotifications(limit: number = 5): Notification[] {
    return this.notifications
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Mark notification as read
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
      this.notifyListeners();
    }
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    this.notifications.forEach(n => n.isRead = true);
    this.notifyListeners();
  }

  // Delete notification
  deleteNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  // Add new notification
  addNotification(notification: Omit<Notification, 'id'>): void {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    this.notifications.unshift(newNotification);
    this.notifyListeners();
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.isRead).length;
  }

  // Subscribe to notification updates
  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of changes
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  // Format timestamp for display
  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  }

  // Get severity color class
  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  // Get type icon
  getTypeIcon(type: string): string {
    switch (type) {
      case 'heatwave': return '🌡️';
      case 'health': return '💧';
      case 'emergency': return '🚨';
      case 'system': return '📊';
      case 'reminder': return '⏰';
      default: return '📢';
    }
  }

  // Get severity indicator for TopBar
  getSeverityIndicator(severity: string): string {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
export default notificationService;
