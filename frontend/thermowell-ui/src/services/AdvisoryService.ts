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
    return this.fetchArray<Advisory>('/data/advisories.json');
  }

  static async fetchGroupAdvisories(): Promise<GroupAdvisory[]> {
    return this.fetchArray<GroupAdvisory>('/data/groupAdvisories.json');
  }

  static async fetchUrgentAlerts(): Promise<UrgentAlert[]> {
    return this.fetchArray<UrgentAlert>('/data/urgentAlerts.json');
  }

  static async getAdvisoryById(id: number): Promise<Advisory | null> {
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) return null;
    try {
      const advisories = await this.fetchAdvisories();
      return advisories.find((adv) => adv.id === id) || null;
    } catch {
      return null;
    }
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
