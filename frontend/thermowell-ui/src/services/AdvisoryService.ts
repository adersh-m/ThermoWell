import type { Advisory } from '../data/mockAdvisories';

export type GroupAdvisory = {
  group: string;
  title: string;
  description: string;
};

export type UrgentAlert = {
  risk: string;
  action: string;
  time: string;
  status: string;
};

export type CurrentAdvisory = {
  type: string;
  title: string;
  description: string;
  time: string;
  validUntil: string;
};

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Validation functions
const isValidAdvisory = (item: any): item is Advisory => {
  return item &&
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.message === 'string' &&
    typeof item.severity === 'string' &&
    ['Low', 'Moderate', 'High'].includes(item.severity);
};

const isValidGroupAdvisory = (item: any): item is GroupAdvisory => {
  return item &&
    typeof item.group === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string';
};

const isValidUrgentAlert = (item: any): item is UrgentAlert => {
  return item &&
    typeof item.risk === 'string' &&
    typeof item.action === 'string' &&
    typeof item.time === 'string' &&
    typeof item.status === 'string';
};

const isValidCurrentAdvisory = (item: any): item is CurrentAdvisory => {
  return item &&
    typeof item.type === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    typeof item.time === 'string' &&
    typeof item.validUntil === 'string';
};

export class AdvisoryService {
  private static readonly FETCH_TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
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

  // Generic cache management
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

  // Generic fetch with caching
  private static async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    validator: (item: any) => item is T
  ): Promise<T[]> {
    // Check cache first
    const cached = this.getCached<T[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.fetchWithRetry(url);
      const rawData = await response.json();
      
      if (!Array.isArray(rawData)) {
        throw new Error(`Expected array but got ${typeof rawData}`);
      }

      const validData = rawData.filter(validator);
      
      if (validData.length !== rawData.length) {
        console.warn(`Filtered out ${rawData.length - validData.length} invalid items from ${url}`);
      }

      // Cache the valid data
      this.setCached(cacheKey, validData);
      
      return validData;
    } catch (error) {
      console.error(`Error loading data from ${url}:`, error);
      
      // Try to return stale cache data as fallback
      const staleEntry = this.cache.get(cacheKey);
      if (staleEntry) {
        console.warn(`Returning stale data for ${cacheKey} due to fetch error`);
        return staleEntry.data;
      }
      
      return [];
    }
  }

  static async fetchAdvisories(): Promise<Advisory[]> {
    return this.fetchWithCache('/data/advisories.json', 'advisories', isValidAdvisory);
  }

  static async fetchGroupAdvisories(): Promise<GroupAdvisory[]> {
    return this.fetchWithCache('/data/groupAdvisories.json', 'groupAdvisories', isValidGroupAdvisory);
  }

  static async fetchUrgentAlerts(): Promise<UrgentAlert[]> {
    return this.fetchWithCache('/data/urgentAlerts.json', 'urgentAlerts', isValidUrgentAlert);
  }

  static async getAdvisoryById(id: number): Promise<Advisory | null> {
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
      console.error('Invalid advisory ID:', id);
      return null;
    }

    try {
      const advisories = await this.fetchAdvisories();
      return advisories.find((adv) => adv.id === id) || null;
    } catch (error) {
      console.error('Error loading advisory by ID:', error);
      return null;
    }
  }

  static async fetchCurrentAdvisory(): Promise<CurrentAdvisory> {
    const cacheKey = 'currentAdvisory';
    const cached = this.getCached<CurrentAdvisory>(cacheKey);
    if (cached) {
      return cached;
    }

    const fallbackAdvisory: CurrentAdvisory = {
      type: 'Error',
      title: 'Unable to load advisory',
      description: 'Please try again later.',
      time: new Date().toISOString(),
      validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    try {
      const response = await this.fetchWithRetry('/data/currentAdvisory.json');
      const data = await response.json();
      
      if (!isValidCurrentAdvisory(data)) {
        console.error('Invalid current advisory data:', data);
        return fallbackAdvisory;
      }

      this.setCached(cacheKey, data);
      return data;
    } catch (error) {
      console.error('Error loading current advisory:', error);
      
      // Try to return stale cache data
      const staleEntry = this.cache.get(cacheKey);
      if (staleEntry) {
        console.warn('Returning stale current advisory data due to fetch error');
        return staleEntry.data;
      }
      
      return fallbackAdvisory;
    }
  }

  // Utility methods
  static clearCache(): void {
    this.cache.clear();
    console.log('Advisory service cache cleared');
  }

  static getCacheStats(): { entries: number; totalSize: number } {
    return {
      entries: this.cache.size,
      totalSize: Array.from(this.cache.values()).reduce((size, entry) => 
        size + JSON.stringify(entry).length, 0)
    };
  }

  // Get advisories by severity
  static async getAdvisoriesBySeverity(severity: 'Low' | 'Moderate' | 'High'): Promise<Advisory[]> {
    if (!severity || !['Low', 'Moderate', 'High'].includes(severity)) {
      console.error('Invalid advisory severity:', severity);
      return [];
    }

    try {
      const advisories = await this.fetchAdvisories();
      return advisories.filter(advisory => advisory.severity === severity);
    } catch (error) {
      console.error('Error filtering advisories by severity:', error);
      return [];
    }
  }

  // Get high severity advisories (High and Moderate)
  static async getHighSeverityAdvisories(): Promise<Advisory[]> {
    try {
      const advisories = await this.fetchAdvisories();
      return advisories.filter(advisory => ['High', 'Moderate'].includes(advisory.severity));
    } catch (error) {
      console.error('Error getting high severity advisories:', error);
      return [];
    }
  }
}
