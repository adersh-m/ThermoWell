import { BaseService } from '../utils/baseService';

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

/**
 * Service for managing resources and external links
 */
export default class ResourcesService extends BaseService {
  /**
   * Fetch resources
   * @returns A promise that resolves to an array of resources
   */
  static async fetchResources(): Promise<Resource[]> {
    return this.fetchArray<Resource>('/data/resources.json');
  }

  /**
   * Fetch external links
   * @returns A promise that resolves to an array of external links
   */
  static async fetchExternalLinks(): Promise<ExternalLink[]> {
    return this.fetchArray<ExternalLink>('/data/externalLinks.json');
  }
}
