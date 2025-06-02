export type Resource = {
  type: string;
  title: string;
  description: string;
  action: string;
  category: string;
};

export type ExternalLink = {
  title: string;
  description: string;
  icon: string;
  url?: string;
};

// Validation functions
const isValidResource = (item: any): item is Resource => {
  return item && 
    typeof item.type === 'string' && 
    typeof item.title === 'string' && 
    typeof item.description === 'string' && 
    typeof item.action === 'string' && 
    typeof item.category === 'string';
};

const isValidExternalLink = (item: any): item is ExternalLink => {
  return item && 
    typeof item.title === 'string' && 
    typeof item.description === 'string' && 
    typeof item.icon === 'string' && 
    (item.url === undefined || typeof item.url === 'string');
};

export default class ResourcesService {
  private static readonly FETCH_TIMEOUT = 10000; // 10 seconds
  private static readonly MAX_RETRIES = 3;
  private static resourcesCache: Resource[] | null = null;
  private static externalLinksCache: ExternalLink[] | null = null;
  private static lastFetchTime = 0;
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private static async fetchWithTimeout(url: string, retries = 0): Promise<Response> {
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
        return this.fetchWithTimeout(url, retries + 1);
      }
      
      throw error;
    }
  }

  private static isCacheValid(): boolean {
    return Date.now() - this.lastFetchTime < this.CACHE_DURATION;
  }

  static async fetchResources(forceRefresh = false): Promise<Resource[]> {
    if (!forceRefresh && this.resourcesCache && this.isCacheValid()) {
      return this.resourcesCache;
    }

    try {
      const response = await this.fetchWithTimeout('/data/resources.json');
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Resources data is not an array');
      }

      const validResources = data.filter(isValidResource);
      
      if (validResources.length !== data.length) {
        console.warn(`Filtered out ${data.length - validResources.length} invalid resource items`);
      }

      this.resourcesCache = validResources;
      this.lastFetchTime = Date.now();
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(validResources), 500);
      });
    } catch (error) {
      console.error('Error loading resources:', error);
      // Return cached data if available, otherwise empty array
      return this.resourcesCache || [];
    }
  }

  static async fetchExternalLinks(forceRefresh = false): Promise<ExternalLink[]> {
    if (!forceRefresh && this.externalLinksCache && this.isCacheValid()) {
      return this.externalLinksCache;
    }

    try {
      const response = await this.fetchWithTimeout('/data/externalLinks.json');
      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('External links data is not an array');
      }

      const validLinks = data.filter(isValidExternalLink);
      
      if (validLinks.length !== data.length) {
        console.warn(`Filtered out ${data.length - validLinks.length} invalid external link items`);
      }

      this.externalLinksCache = validLinks;
      this.lastFetchTime = Date.now();
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(validLinks), 500);
      });
    } catch (error) {
      console.error('Error loading external links:', error);
      // Return cached data if available, otherwise empty array
      return this.externalLinksCache || [];
    }
  }

  // Clear cache manually if needed
  static clearCache(): void {
    this.resourcesCache = null;
    this.externalLinksCache = null;
    this.lastFetchTime = 0;
  }
}
