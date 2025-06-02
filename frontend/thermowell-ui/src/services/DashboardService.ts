// Type definitions
export type StatusCard = {
  title: string;
  value: string;
  subtitle: string;
  action: string;
};

export type VulnerableGroup = {
  name: string;
  description: string;
  regionalAdvice: Record<string, string>;
  getAdvice: (region: string) => string;
};

export type DashboardResource = {
  title: string;
  description: string;
  action: string;
};

// Validation functions
const isValidStatusCard = (item: any): item is StatusCard => {
  return item && 
    typeof item.title === 'string' && 
    typeof item.value === 'string' && 
    typeof item.subtitle === 'string' && 
    typeof item.action === 'string';
};

const isValidVulnerableGroup = (item: any): boolean => {
  return item && 
    typeof item.name === 'string' && 
    typeof item.description === 'string' && 
    typeof item.regionalAdvice === 'object' && 
    item.regionalAdvice !== null;
};

const isValidResource = (item: any): item is DashboardResource => {
  return item && 
    typeof item.title === 'string' && 
    typeof item.description === 'string' && 
    typeof item.action === 'string';
};

export const DashboardService = {
  cache: {
    data: null as any,
    timestamp: 0,
    duration: 5 * 60 * 1000 // 5 minutes
  },

  async fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        console.warn(`Fetch attempt ${i + 1} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
    throw new Error('All retry attempts failed');
  },

  async getDashboardData() {
    const now = Date.now();
    if (this.cache.data && (now - this.cache.timestamp) < this.cache.duration) {
      return this.cache.data;
    }

    try {
      const response = await this.fetchWithRetry('/data/dashboard.json');
      const data = await response.json();
      
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid dashboard data format');
      }
      
      this.cache.data = data;
      this.cache.timestamp = now;
      return data;
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Return cached data if available
      return this.cache.data || { statusCards: [], vulnerableGroups: [], resources: [] };
    }
  },

  fetchStatusCards: async (): Promise<StatusCard[]> => {
    try {
      const data = await DashboardService.getDashboardData();
      
      if (!Array.isArray(data.statusCards)) {
        console.warn('Status cards data is not an array');
        return [];
      }

      const validCards = data.statusCards.filter(isValidStatusCard);
      
      if (validCards.length !== data.statusCards.length) {
        console.warn(`Filtered out ${data.statusCards.length - validCards.length} invalid status cards`);
      }

      return validCards;
    } catch (error) {
      console.error('Error loading dashboard status cards:', error);
      return [];
    }
  },

  fetchVulnerableGroups: async (): Promise<VulnerableGroup[]> => {
    try {
      const data = await DashboardService.getDashboardData();
      
      if (!Array.isArray(data.vulnerableGroups)) {
        console.warn('Vulnerable groups data is not an array');
        return [];
      }

      const validGroups = data.vulnerableGroups
        .filter(isValidVulnerableGroup)
        .map((group: any): VulnerableGroup => ({
          ...group,
          getAdvice: (region: string) => {
            if (!group.regionalAdvice || typeof group.regionalAdvice !== 'object') {
              return 'No specific advice available for this region.';
            }
            return group.regionalAdvice[region] || 
                   group.regionalAdvice.default || 
                   'No specific advice available for this region.';
          }
        }));
      
      if (validGroups.length !== data.vulnerableGroups.length) {
        console.warn(`Filtered out ${data.vulnerableGroups.length - validGroups.length} invalid vulnerable groups`);
      }

      return validGroups;
    } catch (error) {
      console.error('Error loading vulnerable groups:', error);
      return [];
    }
  },

  fetchResources: async (): Promise<DashboardResource[]> => {
    try {
      const data = await DashboardService.getDashboardData();
      
      if (!Array.isArray(data.resources)) {
        console.warn('Dashboard resources data is not an array');
        return [];
      }

      const validResources = data.resources.filter(isValidResource);
      
      if (validResources.length !== data.resources.length) {
        console.warn(`Filtered out ${data.resources.length - validResources.length} invalid dashboard resources`);
      }

      return validResources;
    } catch (error) {
      console.error('Error loading dashboard resources:', error);
      return [];
    }
  },

  // Clear cache manually if needed
  clearCache: () => {
    DashboardService.cache.data = null;
    DashboardService.cache.timestamp = 0;
  }
};
