/**
 * A centralized cache management utility for storing and retrieving data
 * with expiration support.
 */

/**
 * Configuration for cache entries
 */
export interface CacheOptions {
  /**
   * Time in milliseconds before the cache entry expires
   * @default 5 * 60 * 1000 (5 minutes)
   */
  expiresIn?: number;
}

/**
 * A cache entry with metadata
 */
interface CacheEntry<T> {
  /**
   * The cached data
   */
  data: T;
  
  /**
   * When the entry was created (timestamp)
   */
  timestamp: number;
  
  /**
   * When the entry expires (timestamp)
   */
  expiry: number;
}

/**
 * Default cache options
 */
const DEFAULT_CACHE_OPTIONS: Required<CacheOptions> = {
  expiresIn: 5 * 60 * 1000 // 5 minutes
};

/**
 * A cache manager for storing and retrieving data with expiration support
 */
export class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();

  /**
   * Get an item from the cache
   * 
   * @param key - The cache key
   * @returns The cached data or null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (entry && Date.now() < entry.expiry) {
      return entry.data;
    }
    
    if (entry) {
      this.cache.delete(key);
    }
    
    return null;
  }

  /**
   * Set an item in the cache
   * 
   * @param key - The cache key
   * @param data - The data to cache
   * @param options - Cache options
   */
  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const { expiresIn = DEFAULT_CACHE_OPTIONS.expiresIn } = options;
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + expiresIn
    });
  }

  /**
   * Delete an item from the cache
   * 
   * @param key - The cache key
   * @returns True if the item was found and deleted, false otherwise
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all items from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Check if the cache contains a non-expired entry for the given key
   * 
   * @param key - The cache key
   * @returns True if the cache contains a valid entry for the key
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    return !!entry && Date.now() < entry.expiry;
  }

  /**
   * Get or set a value in the cache using a factory function
   * 
   * @param key - The cache key
   * @param factory - Function to create the value if not in cache
   * @param options - Cache options
   * @returns The cached or newly created value
   */
  async getOrSet<T>(
    key: string, 
    factory: () => Promise<T>, 
    options: CacheOptions = {}
  ): Promise<T> {
    // Try to get from cache first
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    // If not in cache, call factory function
    const data = await factory();
    this.set(key, data, options);
    return data;
  }

  /**
   * Get cache statistics
   * 
   * @returns Cache statistics including entry count and size estimate
   */
  getStats(): { entries: number; totalSize: number } {
    return {
      entries: this.cache.size,
      totalSize: Array.from(this.cache.values()).reduce(
        (size, entry) => size + JSON.stringify(entry).length, 
        0
      )
    };
  }

  /**
   * Attempt to get a stale entry (one that has expired but hasn't been garbage collected)
   * Useful for fallbacks when fetching fresh data fails
   * 
   * @param key - The cache key
   * @returns The stale data or null if not found
   */
  getStale<T>(key: string): T | null {
    const entry = this.cache.get(key);
    return entry ? entry.data : null;
  }
}

/**
 * The shared instance of the cache manager
 */
export const sharedCache = new CacheManager();

export default sharedCache;
