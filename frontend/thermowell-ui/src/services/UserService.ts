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

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Validation functions
const isValidUser = (item: any): item is User => {
  return item &&
    typeof item.name === 'string' &&
    (item.email === undefined || typeof item.email === 'string') &&
    (item.phone === undefined || typeof item.phone === 'string') &&
    (item.city === undefined || typeof item.city === 'string') &&
    (item.bio === undefined || typeof item.bio === 'string') &&
    (item.id === undefined || typeof item.id === 'string') &&
    (item.lastLogin === undefined || typeof item.lastLogin === 'string') &&
    (item.isActive === undefined || typeof item.isActive === 'boolean');
};

const isValidUserPreferences = (item: any): item is UserPreferences => {
  return item &&
    (item.notifications === undefined || typeof item.notifications === 'boolean') &&
    (item.theme === undefined || ['light', 'dark', 'auto'].includes(item.theme)) &&
    (item.language === undefined || typeof item.language === 'string') &&
    (item.timezone === undefined || typeof item.timezone === 'string') &&
    (item.temperatureUnit === undefined || ['celsius', 'fahrenheit'].includes(item.temperatureUnit));
};

export default class UserService {
  private static readonly FETCH_TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for user data
  private static cache = new Map<string, CacheEntry<any>>();

  // Enhanced fetch with timeout and retry logic
  private static async fetchWithRetry(url: string, retries = 0): Promise<Response> {
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

  // Cache management
  private static getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (entry && Date.now() < entry.expiry) {
      return entry.data;
    }
    if (entry) {
      this.cache.delete(key);
    }
    return null;
  }

  private static setCached<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + this.CACHE_DURATION
    });
  }

  // Get basic user info (name only)
  static async fetchUser(): Promise<{ name: string }> {
    const cacheKey = 'userBasic';
    const cached = this.getCached<{ name: string }>(cacheKey);
    if (cached) {
      return cached;
    }

    const fallbackUser = { name: 'Guest User' };

    try {
      const response = await this.fetchWithRetry('/data/userProfile.json');
      const data = await response.json();

      if (!data || typeof data.name !== 'string') {
        console.error('Invalid user data structure:', data);
        return fallbackUser;
      }

      const result = { name: data.name };
      this.setCached(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Error loading user data:', error);
      
      // Try to return stale cache data
      const staleEntry = this.cache.get(cacheKey);
      if (staleEntry) {
        console.warn('Returning stale user data due to fetch error');
        return staleEntry.data;
      }
      
      return fallbackUser;
    }
  }

  // Get full user profile
  static async fetchUserProfile(): Promise<User> {
    const cacheKey = 'userProfile';
    const cached = this.getCached<User>(cacheKey);
    if (cached) {
      return cached;
    }

    const fallbackProfile: User = {
      name: 'Guest User',
      email: '',
      phone: '',
      city: '',
      bio: ''
    };

    try {
      const response = await this.fetchWithRetry('/data/userProfile.json');
      const data = await response.json();

      if (!isValidUser(data)) {
        console.error('Invalid user profile data:', data);
        return fallbackProfile;
      }

      this.setCached(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error loading user profile:', error);
      
      // Try to return stale cache data
      const staleEntry = this.cache.get(cacheKey);
      if (staleEntry) {
        console.warn('Returning stale user profile data due to fetch error');
        return staleEntry.data;
      }
      
      return fallbackProfile;
    }
  }

  // Update user profile (simulated - in real app would send to server)
  static async updateUserProfile(updates: Partial<User>): Promise<boolean> {
    try {
      // Validate the updates
      const currentProfile = await this.fetchUserProfile();
      const updatedProfile = { ...currentProfile, ...updates };

      if (!isValidUser(updatedProfile)) {
        console.error('Invalid user profile updates:', updates);
        return false;
      }

      // In a real application, this would be a PUT/PATCH request to the server
      // For now, we'll just update the cache
      this.setCached('userProfile', updatedProfile);
      this.setCached('userBasic', { name: updatedProfile.name });
      
      console.log('User profile updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  // Get user preferences
  static async getUserPreferences(): Promise<UserPreferences> {
    try {
      const profile = await this.fetchUserProfile();
      return profile.preferences || {};
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return {};
    }
  }

  // Update user preferences
  static async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<boolean> {
    try {
      if (!isValidUserPreferences(preferences)) {
        console.error('Invalid user preferences:', preferences);
        return false;
      }

      const currentProfile = await this.fetchUserProfile();
      const updatedPreferences = { ...currentProfile.preferences, ...preferences };
      
      return await this.updateUserProfile({ 
        preferences: updatedPreferences 
      });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return false;
    }
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
    try {
      const user = await this.fetchUser();
      const firstName = user.name.split(' ')[0];
      return firstName || user.name;
    } catch (error) {
      console.error('Error getting user display name:', error);
      return 'Guest';
    }
  }

  // Check if user is authenticated (simulated)
  static async isAuthenticated(): Promise<boolean> {
    try {
      // Check for authentication token in localStorage
      const authToken = localStorage.getItem('auth_token');
      if (!authToken) return false;
      
      const user = await this.fetchUser();
      return user.name !== 'Guest User';
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Login user (simulated)
  static async login(email: string, password: string): Promise<boolean> {
    try {
      // In a real app, this would make an API call to validate credentials
      // For this simulation, we'll accept any non-empty email and password
      if (!email || !password) return false;
      
      // Simulate successful login
      // Typically this would store a JWT token received from the backend
      localStorage.setItem('auth_token', 'simulated_jwt_token');
      
      // Fetch user profile to update cache
      await this.fetchUserProfile();
      
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }

  // Logout user (clear cache and token)
  static logout(): void {
    this.cache.clear();
    localStorage.removeItem('auth_token');
    console.log('User logged out and cache cleared');
  }

  // Utility methods
  static clearCache(): void {
    this.cache.clear();
    console.log('User service cache cleared');
  }

  static getCacheStats(): { entries: number; totalSize: number } {
    return {
      entries: this.cache.size,
      totalSize: Array.from(this.cache.values()).reduce((size, entry) => 
        size + JSON.stringify(entry).length, 0)
    };
  }

  // Get user's last activity timestamp
  static async getLastActivity(): Promise<string | null> {
    try {
      const profile = await this.fetchUserProfile();
      return profile.lastLogin || null;
    } catch (error) {
      console.error('Error getting last activity:', error);
      return null;
    }
  }

  // Format user info for display
  static formatUserInfo(user: User): string {
    const parts = [user.name];
    if (user.city) parts.push(user.city);
    return parts.join(', ');
  }
}
