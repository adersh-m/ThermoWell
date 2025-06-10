import BaseService from '../utils/baseService';

export type Advisory = {
  id: number;
  title: string;
  message: string;
  severity: 'Low' | 'Moderate' | 'High';
};

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

export class AdvisoryService extends BaseService {
  static async fetchAdvisories(): Promise<Advisory[]> {
    return this.get<Advisory[]>('/api/advisories');
  }

  static async fetchGroupAdvisories(): Promise<GroupAdvisory[]> {
    return this.get<GroupAdvisory[]>('/api/group-advisories');
  }

  static async fetchUrgentAlerts(): Promise<UrgentAlert[]> {
    return this.get<UrgentAlert[]>('/api/urgent-alerts');
  }

  static async getAdvisoryById(id: number): Promise<Advisory | null> {
    return this.get<Advisory>(`/api/advisories/${id}`);
  }

  static async fetchCurrentAdvisory(): Promise<CurrentAdvisory> {
    try {
      return await this.fetchObject<CurrentAdvisory>('/data/currentAdvisory.json');
    } catch {
      return {
        type: 'Error',
        title: 'Unable to load advisory',
        description: 'Please try again later.',
        time: new Date().toISOString(),
        validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };
    }
  }

  static async getAdvisoriesBySeverity(severity: 'Low' | 'Moderate' | 'High'): Promise<Advisory[]> {
    if (!severity || !['Low', 'Moderate', 'High'].includes(severity)) return [];
    try {
      const advisories = await this.fetchAdvisories();
      return advisories.filter(advisory => advisory.severity === severity);
    } catch {
      return [];
    }
  }

  static async getHighSeverityAdvisories(): Promise<Advisory[]> {
    try {
      const advisories = await this.fetchAdvisories();
      return advisories.filter(advisory => ['High', 'Moderate'].includes(advisory.severity));
    } catch {
      return [];
    }
  }
}
