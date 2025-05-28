import type { Advisory } from '../data/mockAdvisories';

// Use the same structure as mockAdvisories
const mockAdvisories: Advisory[] = [
  {
    id: 1,
    title: 'Heatwave Alert: Stay Hydrated',
    message: 'Temperatures are expected to rise above 40°C. Drink plenty of water.',
    severity: 'High',
  },
  {
    id: 2,
    title: 'UV Index High',
    message: 'Limit outdoor activities between 11am and 4pm.',
    severity: 'Moderate',
  },
];

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

export class AdvisoryService {
  static async fetchAdvisories(): Promise<Advisory[]> {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockAdvisories), 500);
    });
  }

  static async fetchGroupAdvisories(): Promise<GroupAdvisory[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        { group: 'Children', title: 'Hydration Alert', description: 'Encourage water breaks every 30 minutes.' },
        { group: 'Elderly', title: 'Stay Cool', description: 'Use fans and avoid direct sun.' },
        { group: 'Outdoor Workers', title: 'Rest Breaks', description: 'Take breaks in shaded areas.' },
      ]), 500);
    });
  }

  static async fetchUrgentAlerts(): Promise<UrgentAlert[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        { risk: 'Heatstroke risk: High', action: 'Limit outdoor activity', time: '09:45 AM', status: 'Active' },
        { risk: 'Medical advisory: Elderly', action: 'Check on neighbors', time: '09:30 AM', status: 'Active' },
      ]), 500);
    });
  }

  static async getAdvisoryById(id: number): Promise<Advisory | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const advisory = mockAdvisories.find((adv) => adv.id === id);
        resolve(advisory || null);
      }, 500);
    });
  }
}
