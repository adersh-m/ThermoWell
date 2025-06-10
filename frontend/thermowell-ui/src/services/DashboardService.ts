import BaseService from '../utils/baseService';

export type StatusCard = {
  title: string;
  value: string;
  subtitle: string;
  action: string;
  icon?: string;
  label?: string;
  buttonText?: string;
  gradient?: string;
};

export type VulnerableGroup = {
  name: string;
  description: string;
  regionalAdvice: Record<string, string>;
  icon?: string;
  label?: string;
  title?: string;
  getAdvice: (region: string) => string;
};

export type DashboardResource = {
  title: string;
  description: string;
  action: string;
};

export type DashboardData = {
  statusCards?: StatusCard[];
  vulnerableGroups?: Omit<VulnerableGroup, 'getAdvice'>[];
  resources?: DashboardResource[];
};

let dashboardCache: DashboardData | null = null;

export class DashboardService extends BaseService {
  static async fetchDashboardData(): Promise<DashboardData> {
    if (dashboardCache) return dashboardCache;
    const data = await this.get<DashboardData>('/api/dashboard');
    dashboardCache = data;
    return data;
  }

  static async fetchStatusCards(): Promise<StatusCard[]> {
    const data = await this.fetchDashboardData();
    return Array.isArray(data.statusCards) ? data.statusCards : [];
  }

  static async fetchVulnerableGroups(): Promise<VulnerableGroup[]> {
    const data = await this.fetchDashboardData();
    return Array.isArray(data.vulnerableGroups)
      ? data.vulnerableGroups.map((group: any): VulnerableGroup => ({
          ...group,
          getAdvice: (region: string) => {
            if (!group.regionalAdvice || typeof group.regionalAdvice !== 'object') {
              return 'No specific advice available for this region.';
            }
            return group.regionalAdvice[region] || group.regionalAdvice.default || 'No specific advice available for this region.';
          }
        }))
      : [];
  }

  static async fetchResources(): Promise<DashboardResource[]> {
    const data = await this.fetchDashboardData();
    return Array.isArray(data.resources) ? data.resources : [];
  }

  // Admin APIs
  static async createDashboardCard(card: StatusCard): Promise<StatusCard> {
    return this.httpClient.post<StatusCard>('/api/admin/dashboard', card);
  }

  static async updateDashboardCard(id: number, card: StatusCard): Promise<StatusCard> {
    return this.httpClient.put<StatusCard>(`/api/admin/dashboard/${id}`, card);
  }
}