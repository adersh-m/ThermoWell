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

// Validation function
const isValidNotification = (item: any): item is Notification => {
  const validTypes = ['heatwave', 'health', 'emergency', 'system', 'reminder'];
  const validSeverities = ['low', 'medium', 'high', 'critical'];
  
  return item && 
    typeof item.id === 'string' && 
    validTypes.includes(item.type) && 
    validSeverities.includes(item.severity) && 
    typeof item.title === 'string' && 
    typeof item.message === 'string' && 
    typeof item.timestamp === 'string' && 
    typeof item.isRead === 'boolean' && 
    typeof item.source === 'string' && 
    (item.location === undefined || typeof item.location === 'string') && 
    (item.actionRequired === undefined || typeof item.actionRequired === 'boolean');
};

class NotificationService {
  private notifications: Notification[] = [];
  private initialized: boolean = false;
  private readonly MAX_LISTENERS = 10;
  private readonly FETCH_TIMEOUT = 10000;
  private readonly MAX_RETRIES = 3;
  private initPromise: Promise<void> | null = null;

  // Initialize with data from JSON file
  private async initializeNotifications(): Promise<void> {
    if (this.initialized) return;
    
    // Prevent multiple simultaneous initialization
    if (this.initPromise) {
      return this.initPromise;
    }
    
    this.initPromise = this.doInitialization();
    return this.initPromise;
  }

  private async doInitialization(): Promise<void> {
    try {
      const response = await this.fetchWithRetry('/data/notifications.json');
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Notifications data is not an array');
      }

      const validNotifications = data.filter(isValidNotification);
      
      if (validNotifications.length !== data.length) {
        console.warn(`Filtered out ${data.length - validNotifications.length} invalid notification items`);
      }

      this.notifications = validNotifications;
      this.initialized = true;
    } catch (error) {
      console.error('Error loading notifications:', error);
      this.notifications = [];
      this.initialized = true;
    } finally {
      this.initPromise = null;
    }
  }

  private async fetchWithRetry(url: string, retries = 0): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.FETCH_TIMEOUT);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (retries < this.MAX_RETRIES && error instanceof Error) {
        console.warn(`Fetch failed for ${url}, retrying... (${retries + 1}/${this.MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
        return this.fetchWithRetry(url, retries + 1);
      }
      
      throw error;
    }
  }

  // Listeners for real-time updates
  private listeners: ((notifications: Notification[]) => void)[] = [];

  // Get all notifications
  async getAllNotifications(): Promise<Notification[]> {
    await this.initializeNotifications();
    return [...this.notifications];
  }

  // Get unread notifications only
  async getUnreadNotifications(): Promise<Notification[]> {
    await this.initializeNotifications();
    return this.notifications.filter(n => !n.isRead);
  }

  // Get recent notifications (for TopBar popup)
  async getRecentNotifications(limit: number = 5): Promise<Notification[]> {
    await this.initializeNotifications();
    return this.notifications
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  // Mark notification as read
  async markAsRead(id: string): Promise<void> {
    await this.initializeNotifications();
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.isRead = true;
      this.notifyListeners();
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    await this.initializeNotifications();
    this.notifications.forEach(n => n.isRead = true);
    this.notifyListeners();
  }

  // Delete notification
  async deleteNotification(id: string): Promise<void> {
    await this.initializeNotifications();
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  // Add new notification (implemented below with validation)

  // Get unread count
  async getUnreadCount(): Promise<number> {
    await this.initializeNotifications();
    return this.notifications.filter(n => !n.isRead).length;
  }

  // Subscribe to notification updates
  subscribe(listener: (notifications: Notification[]) => void): () => void {
    // Prevent memory leaks by limiting number of listeners
    if (this.listeners.length >= this.MAX_LISTENERS) {
      console.warn('Maximum number of notification listeners reached. Removing oldest listener.');
      this.listeners.shift();
    }

    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of changes
  private notifyListeners(): void {
    // Create a copy to prevent issues if listeners array is modified during iteration
    const listenersCopy = [...this.listeners];
    listenersCopy.forEach(listener => {
      try {
        listener([...this.notifications]);
      } catch (error) {
        console.error('Error in notification listener:', error);
      }
    });
  }

  // Add new notification with validation
  addNotification(notification: Omit<Notification, 'id'>): void {
    try {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };

      // Validate the new notification
      if (!isValidNotification(newNotification)) {
        console.error('Invalid notification data:', newNotification);
        return;
      }

      this.notifications.unshift(newNotification);
      
      // Limit the number of notifications to prevent memory issues
      const MAX_NOTIFICATIONS = 1000;
      if (this.notifications.length > MAX_NOTIFICATIONS) {
        this.notifications = this.notifications.slice(0, MAX_NOTIFICATIONS);
      }

      this.notifyListeners();
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  }

  // Clear all listeners (useful for cleanup)
  clearAllListeners(): void {
    this.listeners = [];
  }

  // Get notification statistics
  getNotificationStats(): { total: number; unread: number; byType: Record<string, number>; bySeverity: Record<string, number> } {
    const byType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};
    let unread = 0;

    this.notifications.forEach(notification => {
      if (!notification.isRead) unread++;
      byType[notification.type] = (byType[notification.type] || 0) + 1;
      bySeverity[notification.severity] = (bySeverity[notification.severity] || 0) + 1;
    });

    return {
      total: this.notifications.length,
      unread,
      byType,
      bySeverity
    };
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
