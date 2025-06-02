export type FAQ = {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  lastUpdated?: string;
};

export type ContactMethod = {
  id?: string;
  method: string;
  details: string;
  icon: string;
  availability?: string;
  responseTime?: string;
  priority?: number;
};

export type HelpArticle = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: string;
};

// Cache interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

// Validation functions
const isValidFAQ = (item: any): item is FAQ => {
  return item &&
    typeof item.question === 'string' &&
    typeof item.answer === 'string' &&
    (item.id === undefined || typeof item.id === 'string') &&
    (item.category === undefined || typeof item.category === 'string') &&
    (item.priority === undefined || ['low', 'medium', 'high'].includes(item.priority)) &&
    (item.tags === undefined || (Array.isArray(item.tags) && item.tags.every((tag: any) => typeof tag === 'string'))) &&
    (item.lastUpdated === undefined || typeof item.lastUpdated === 'string');
};

const isValidContactMethod = (item: any): item is ContactMethod => {
  return item &&
    typeof item.method === 'string' &&
    typeof item.details === 'string' &&
    typeof item.icon === 'string' &&
    (item.id === undefined || typeof item.id === 'string') &&
    (item.availability === undefined || typeof item.availability === 'string') &&
    (item.responseTime === undefined || typeof item.responseTime === 'string') &&
    (item.priority === undefined || typeof item.priority === 'number');
};

const isValidHelpArticle = (item: any): item is HelpArticle => {
  return item &&
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.content === 'string' &&
    typeof item.category === 'string' &&
    Array.isArray(item.tags) &&
    item.tags.every((tag: any) => typeof tag === 'string') &&
    typeof item.lastUpdated === 'string';
};

class HelpService {
  private static readonly FETCH_TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;
  private static readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes for help content
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

  // Generic fetch with caching and validation
  private static async fetchWithCache<T>(
    url: string,
    cacheKey: string,
    validator: (item: any) => item is T
  ): Promise<T[]> {
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

  static async fetchFAQs(): Promise<FAQ[]> {
    return this.fetchWithCache('/data/faqs.json', 'faqs', isValidFAQ);
  }

  static async fetchContactMethods(): Promise<ContactMethod[]> {
    return this.fetchWithCache('/data/contactMethods.json', 'contactMethods', isValidContactMethod);
  }

  static async fetchHelpArticles(): Promise<HelpArticle[]> {
    return this.fetchWithCache('/data/helpArticles.json', 'helpArticles', isValidHelpArticle);
  }

  // Search FAQs
  static async searchFAQs(query: string): Promise<FAQ[]> {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      console.error('Invalid search query:', query);
      return [];
    }

    try {
      const faqs = await this.fetchFAQs();
      const searchTerm = query.toLowerCase().trim();
      
      return faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm) ||
        faq.category?.toLowerCase().includes(searchTerm) ||
        faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching FAQs:', error);
      return [];
    }
  }

  // Get FAQs by category
  static async getFAQsByCategory(category: string): Promise<FAQ[]> {
    if (!category || typeof category !== 'string') {
      console.error('Invalid category:', category);
      return [];
    }

    try {
      const faqs = await this.fetchFAQs();
      return faqs.filter(faq => faq.category?.toLowerCase() === category.toLowerCase());
    } catch (error) {
      console.error('Error filtering FAQs by category:', error);
      return [];
    }
  }

  // Get high priority FAQs
  static async getHighPriorityFAQs(): Promise<FAQ[]> {
    try {
      const faqs = await this.fetchFAQs();
      return faqs.filter(faq => faq.priority === 'high');
    } catch (error) {
      console.error('Error getting high priority FAQs:', error);
      return [];
    }
  }

  // Get FAQ by ID
  static async getFAQById(id: string): Promise<FAQ | null> {
    if (!id || typeof id !== 'string') {
      console.error('Invalid FAQ ID:', id);
      return null;
    }

    try {
      const faqs = await this.fetchFAQs();
      return faqs.find(faq => faq.id === id) || null;
    } catch (error) {
      console.error('Error getting FAQ by ID:', error);
      return null;
    }
  }

  // Search help articles
  static async searchHelpArticles(query: string): Promise<HelpArticle[]> {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      console.error('Invalid search query:', query);
      return [];
    }

    try {
      const articles = await this.fetchHelpArticles();
      const searchTerm = query.toLowerCase().trim();
      
      return articles.filter(article => 
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch (error) {
      console.error('Error searching help articles:', error);
      return [];
    }
  }

  // Get help article by ID
  static async getHelpArticleById(id: string): Promise<HelpArticle | null> {
    if (!id || typeof id !== 'string') {
      console.error('Invalid article ID:', id);
      return null;
    }

    try {
      const articles = await this.fetchHelpArticles();
      return articles.find(article => article.id === id) || null;
    } catch (error) {
      console.error('Error getting help article by ID:', error);
      return null;
    }
  }

  // Get contact methods sorted by priority
  static async getContactMethodsByPriority(): Promise<ContactMethod[]> {
    try {
      const methods = await this.fetchContactMethods();
      return methods.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    } catch (error) {
      console.error('Error getting contact methods by priority:', error);
      return [];
    }
  }

  // Utility methods
  static clearCache(): void {
    this.cache.clear();
    console.log('Help service cache cleared');
  }

  static getCacheStats(): { entries: number; totalSize: number } {
    return {
      entries: this.cache.size,
      totalSize: Array.from(this.cache.values()).reduce((size, entry) => 
        size + JSON.stringify(entry).length, 0)
    };
  }

  // Get all FAQ categories
  static async getFAQCategories(): Promise<string[]> {
    try {
      const faqs = await this.fetchFAQs();
      const categories = new Set<string>();
      
      faqs.forEach(faq => {
        if (faq.category) {
          categories.add(faq.category);
        }
      });
      
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error getting FAQ categories:', error);
      return [];
    }
  }

  // Get all help article categories
  static async getHelpArticleCategories(): Promise<string[]> {
    try {
      const articles = await this.fetchHelpArticles();
      const categories = new Set<string>();
      
      articles.forEach(article => {
        categories.add(article.category);
      });
      
      return Array.from(categories).sort();
    } catch (error) {
      console.error('Error getting help article categories:', error);
      return [];
    }
  }
}

export default HelpService;
