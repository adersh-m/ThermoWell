export interface Tip {
  title: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Validation function
const isValidTip = (item: any): item is Tip => {
  return item &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    (item.category === undefined || typeof item.category === 'string') &&
    (item.priority === undefined || ['low', 'medium', 'high'].includes(item.priority)) &&
    (item.tags === undefined || (Array.isArray(item.tags) && item.tags.every((tag: any) => typeof tag === 'string')));
};

export default class TipsService {
  private static readonly FETCH_TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;
  private static readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for tips
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

  static async fetchTips(): Promise<Tip[]> {
    const cacheKey = 'tips';
    const cached = this.getCached<Tip[]>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await this.fetchWithRetry('/data/tips.json');
      const rawData = await response.json();
      
      if (!Array.isArray(rawData)) {
        throw new Error(`Expected array but got ${typeof rawData}`);
      }

      const validTips = rawData.filter(isValidTip);
      
      if (validTips.length !== rawData.length) {
        console.warn(`Filtered out ${rawData.length - validTips.length} invalid tip items`);
      }

      // Cache the valid data
      this.setCached(cacheKey, validTips);
      
      return validTips;
    } catch (error) {
      console.error('Error loading tips:', error);
      
      // Try to return stale cache data as fallback
      const staleEntry = this.cache.get(cacheKey);
      if (staleEntry) {
        console.warn('Returning stale tips data due to fetch error');
        return staleEntry.data;
      }
      
      return [];
    }
  }

  // Get tips by category
  static async getTipsByCategory(category: string): Promise<Tip[]> {
    if (!category || typeof category !== 'string') {
      console.error('Invalid category:', category);
      return [];
    }

    try {
      const tips = await this.fetchTips();
      return tips.filter(tip => tip.category?.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error('Error filtering tips by category:', error);
      return [];
    }
  }

  // Get tips by priority
  static async getTipsByPriority(priority: 'low' | 'medium' | 'high'): Promise<Tip[]> {
    if (!['low', 'medium', 'high'].includes(priority)) {
      console.error('Invalid priority:', priority);
      return [];
    }

    try {
      const tips = await this.fetchTips();
      return tips.filter(tip => tip.priority === priority);
    } catch (error) {
      console.error('Error filtering tips by priority:', error);
      return [];
    }
  }

  // Search tips by keyword
  static async searchTips(keyword: string): Promise<Tip[]> {
    if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) {
      console.error('Invalid search keyword:', keyword);
      return [];
    }

    try {
      const tips = await this.fetchTips();
      const searchTerm = keyword.toLowerCase().trim();
      
      return tips.filter(tip => 
        tip.title.toLowerCase().includes(searchTerm) ||
        tip.description.toLowerCase().includes(searchTerm) ||
        tip.category?.toLowerCase().includes(searchTerm) ||
        tip.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching tips:', error);
      return [];
    }
  }

  // Get random tip
  static async getRandomTip(): Promise<Tip | null> {
    try {
      const tips = await this.fetchTips();
      if (tips.length === 0) return null;
      
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    } catch (error) {
      console.error('Error getting random tip:', error);
      return null;
    }
  }

  // Get top priority tips
  static async getHighPriorityTips(limit = 5): Promise<Tip[]> {
    try {
      const tips = await this.fetchTips();
      const highPriorityTips = tips.filter(tip => tip.priority === 'high');
      return highPriorityTips.slice(0, limit);
    } catch (error) {
      console.error('Error getting high priority tips:', error);
      return [];
    }
  }

  // Utility methods
  static clearCache(): void {
    this.cache.clear();
    console.log('Tips service cache cleared');
  }

  static getCacheStats(): { entries: number; totalSize: number } {
    return {
      entries: this.cache.size,
      totalSize: Array.from(this.cache.values()).reduce((size, entry) => 
        size + JSON.stringify(entry).length, 0)
    };
  }

  // Get all available categories
  static async getCategories(): Promise<string[]> {
    try {
      const tips = await this.fetchTips();
      const categories = new Set<string>();
      
      tips.forEach(tip => {
        if (tip.category) {
          categories.add(tip.category);
        }
      });
      
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }

  // Get all available tags
  static async getTags(): Promise<string[]> {
    try {
      const tips = await this.fetchTips();
      const tags = new Set<string>();
      
      tips.forEach(tip => {
        tip.tags?.forEach(tag => tags.add(tag));
      });
      
      return Array.from(tags).sort();
    } catch (error) {
      console.error('Error getting tags:', error);
      return [];
    }
  }
}
