import BaseService from '../utils/baseService';

export interface User {
  name: string;
  email?: string;
  phone?: string;
  city?: string;
  bio?: string;
  id?: string;
  preferences?: UserPreferences;
  lastLogin?: string;
  isActive?: boolean;
}

export interface UserPreferences {
  notifications?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  timezone?: string;
  temperatureUnit?: 'celsius' | 'fahrenheit';
}

export default class UserService extends BaseService {
  // Get basic user info (name only)
  static async fetchUser(): Promise<{ name: string }> {
    return this.fetchObject<{ name: string }>('/api/user-profile');
  }

  // Get full user profile
  static async fetchUserProfile(): Promise<User> {
    return this.fetchObject<User>('/api/user-profile');
  }

  // Update user profile (simulated - in real app would send to server)
  static async updateUserProfile(updates: Partial<User>): Promise<boolean> {
    return this.put<Partial<User>, boolean>('/api/user/profile', updates);
  }

  // Get user preferences
  static async getUserPreferences(): Promise<UserPreferences> {
    const profile = await this.fetchUserProfile();
    return profile.preferences || {};
  }

  // Update user preferences
  static async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<boolean> {
    // Simulate update (no real backend)
    return true;
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone format (basic validation)
  static isValidPhone(phone: string): boolean {
    if (!phone || typeof phone !== 'string') return false;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.trim());
  }

  // Get user's display name (first name or full name)
  static async getUserDisplayName(): Promise<string> {
    const user = await this.fetchUser();
    const firstName = user.name.split(' ')[0];
    return firstName || user.name;
  }

  // Check if user is authenticated (simulated)
  static async isAuthenticated(): Promise<boolean> {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) return false;
    const user = await this.fetchUser();
    return user.name !== 'Guest User';
  }

  // Login user (simulated)
  static async login(email: string, password: string): Promise<boolean> {
    if (!email || !password) return false;
    localStorage.setItem('auth_token', 'simulated_jwt_token');
    await this.fetchUserProfile();
    return true;
  }

  // Logout user (clear cache and token)
  static logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Get user's last activity timestamp
  static async getLastActivity(): Promise<string | null> {
    const profile = await this.fetchUserProfile();
    return profile.lastLogin || null;
  }

  // Format user info for display
  static formatUserInfo(user: User): string {
    const parts = [user.name];
    if (user.city) parts.push(user.city);
    return parts.join(', ');
  }
}
