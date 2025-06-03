import BaseService from '../utils/baseService';

export interface Tip {
  title: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
}

export default class TipsService extends BaseService {
  static async fetchTips(): Promise<Tip[]> {
    return this.fetchArray<Tip>('/data/tips.json');
  }

  static async getTipsByCategory(category: string): Promise<Tip[]> {
    if (!category || typeof category !== 'string') return [];
    try {
      const tips = await this.fetchTips();
      return tips.filter(tip => tip.category?.toLowerCase() === category.toLowerCase());
    } catch {
      return [];
    }
  }

  static async getTipsByPriority(priority: 'low' | 'medium' | 'high'): Promise<Tip[]> {
    if (!['low', 'medium', 'high'].includes(priority)) return [];
    try {
      const tips = await this.fetchTips();
      return tips.filter(tip => tip.priority === priority);
    } catch {
      return [];
    }
  }

  static async searchTips(keyword: string): Promise<Tip[]> {
    if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) return [];
    try {
      const tips = await this.fetchTips();
      const searchTerm = keyword.toLowerCase().trim();
      return tips.filter(tip =>
        tip.title.toLowerCase().includes(searchTerm) ||
        tip.description.toLowerCase().includes(searchTerm) ||
        tip.category?.toLowerCase().includes(searchTerm) ||
        tip.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch {
      return [];
    }
  }

  static async getRandomTip(): Promise<Tip | null> {
    try {
      const tips = await this.fetchTips();
      if (tips.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * tips.length);
      return tips[randomIndex];
    } catch {
      return null;
    }
  }

  static async getHighPriorityTips(limit = 5): Promise<Tip[]> {
    try {
      const tips = await this.fetchTips();
      const highPriorityTips = tips.filter(tip => tip.priority === 'high');
      return highPriorityTips.slice(0, limit);
    } catch {
      return [];
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const tips = await this.fetchTips();
      const categories = new Set<string>();
      tips.forEach(tip => { if (tip.category) categories.add(tip.category); });
      return Array.from(categories).sort();
    } catch {
      return [];
    }
  }

  static async getTags(): Promise<string[]> {
    try {
      const tips = await this.fetchTips();
      const tags = new Set<string>();
      tips.forEach(tip => { tip.tags?.forEach(tag => tags.add(tag)); });
      return Array.from(tags).sort();
    } catch {
      return [];
    }
  }
}
