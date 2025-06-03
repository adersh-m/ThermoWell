/**
 * Base service class providing common functionality for data fetching.
 */

import httpClient from './httpClient';

/**
 * Base service with shared functionality
 */
export class BaseService {
  /**
   * Fetch an array of items from a URL (no validation, no caching)
   * 
   * @param url - API endpoint URL
   * @returns Promise of items
   */
  protected static async fetchArray<T>(url: string): Promise<T[]> {
    return await httpClient.get<T[]>(url);
  }

  /**
   * Fetch a single object from a URL (no validation, no caching)
   * 
   * @param url - API endpoint URL
   * @returns Promise of the object
   */
  protected static async fetchObject<T>(url: string): Promise<T> {
    return await httpClient.get<T>(url);
  }
}

export default BaseService;
