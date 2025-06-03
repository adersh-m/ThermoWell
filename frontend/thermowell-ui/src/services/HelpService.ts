import BaseService from '../utils/baseService';

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

class HelpService extends BaseService {
  static async fetchFAQs(): Promise<FAQ[]> {
    return this.fetchArray<FAQ>('/data/faqs.json');
  }

  static async fetchContactMethods(): Promise<ContactMethod[]> {
    return this.fetchArray<ContactMethod>('/data/contactMethods.json');
  }

  static async fetchHelpArticles(): Promise<HelpArticle[]> {
    return this.fetchArray<HelpArticle>('/data/helpArticles.json');
  }

  static async searchFAQs(query: string): Promise<FAQ[]> {
    if (!query || typeof query !== 'string' || query.trim().length === 0) return [];
    try {
      const faqs = await this.fetchFAQs();
      const searchTerm = query.toLowerCase().trim();
      return faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm) ||
        faq.category?.toLowerCase().includes(searchTerm) ||
        faq.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch {
      return [];
    }
  }

  static async getFAQsByCategory(category: string): Promise<FAQ[]> {
    if (!category || typeof category !== 'string') return [];
    try {
      const faqs = await this.fetchFAQs();
      return faqs.filter(faq => faq.category?.toLowerCase() === category.toLowerCase());
    } catch {
      return [];
    }
  }

  static async getHighPriorityFAQs(): Promise<FAQ[]> {
    try {
      const faqs = await this.fetchFAQs();
      return faqs.filter(faq => faq.priority === 'high');
    } catch {
      return [];
    }
  }

  static async getFAQById(id: string): Promise<FAQ | null> {
    if (!id || typeof id !== 'string') return null;
    try {
      const faqs = await this.fetchFAQs();
      return faqs.find(faq => faq.id === id) || null;
    } catch {
      return null;
    }
  }

  static async searchHelpArticles(query: string): Promise<HelpArticle[]> {
    if (!query || typeof query !== 'string' || query.trim().length === 0) return [];
    try {
      const articles = await this.fetchHelpArticles();
      const searchTerm = query.toLowerCase().trim();
      return articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    } catch {
      return [];
    }
  }

  static async getHelpArticleById(id: string): Promise<HelpArticle | null> {
    if (!id || typeof id !== 'string') return null;
    try {
      const articles = await this.fetchHelpArticles();
      return articles.find(article => article.id === id) || null;
    } catch {
      return null;
    }
  }

  static async getContactMethodsByPriority(): Promise<ContactMethod[]> {
    try {
      const methods = await this.fetchContactMethods();
      return methods.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    } catch {
      return [];
    }
  }

  static async getFAQCategories(): Promise<string[]> {
    try {
      const faqs = await this.fetchFAQs();
      const categories = new Set<string>();
      faqs.forEach(faq => { if (faq.category) categories.add(faq.category); });
      return Array.from(categories).sort();
    } catch {
      return [];
    }
  }

  static async getHelpArticleCategories(): Promise<string[]> {
    try {
      const articles = await this.fetchHelpArticles();
      const categories = new Set<string>();
      articles.forEach(article => { categories.add(article.category); });
      return Array.from(categories).sort();
    } catch {
      return [];
    }
  }
}

export default HelpService;
