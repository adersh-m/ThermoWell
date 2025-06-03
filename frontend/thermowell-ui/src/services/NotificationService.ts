import BaseService from '../utils/baseService';

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

class NotificationService extends BaseService {
  private static listeners: Array<() => void> = [];
  static fetchCount = 0;

  static subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private static notify() {
    this.listeners.forEach(listener => listener());
  }

  static async fetchNotifications(): Promise<Notification[]> {
    console.warn('NotificationService.fetchNotifications is disabled for debugging.');
    return [];
  }

  // Get unread notifications only
  static async getUnreadNotifications(): Promise<Notification[]> {
    const notifications = await this.fetchNotifications();
    return notifications.filter(notification => !notification.isRead);
  }

  // Mark notification as read
  static async markAsRead(notificationId: string): Promise<void> {
    const notifications = await this.fetchNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.notify();
    }
  }

  // Get unread count
  static async getUnreadCount(): Promise<number> {
    const notifications = await this.fetchNotifications();
    return notifications.filter(n => !n.isRead).length;
  }

  // Get recent notifications (sorted by timestamp, limited by count)
  static async getRecentNotifications(limit: number): Promise<Notification[]> {
    const notifications = await this.fetchNotifications();
    return notifications
      .slice()
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Utility: Get CSS class for severity indicator
  static getSeverityIndicator(severity: Notification['severity']): string {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-300';
    }
  }

  // Utility: Get icon for notification type
  static getTypeIcon(type: Notification['type']): string {
    switch (type) {
      case 'heatwave': return '🌡️';
      case 'health': return '🩺';
      case 'emergency': return '🚨';
      case 'system': return '⚙️';
      case 'reminder': return '⏰';
      default: return '🔔';
    }
  }

  // Utility: Format timestamp for display
  static formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }
}

export default NotificationService;
