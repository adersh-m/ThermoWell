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

  /**
   * Fetch an array of items from a URL with validation
   * 
   * @param url - API endpoint URL
   * @returns Promise of items or empty array on error
   */
  protected static get httpClient() {
    return httpClient;
  }

  /**
   * Perform a GET request
   * @param url - API endpoint URL
   * @returns Promise of the response data
   */
  protected static async get<T>(url: string): Promise<T> {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Perform a POST request
   * @param url - API endpoint URL
   * @param body - Request body
   * @returns Promise of the response data
   */
  protected static async post<T, R>(url: string, body: T): Promise<R> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Perform a PUT request
   * @param url - API endpoint URL
   * @param body - Request body
   * @returns Promise of the response data
   */
  protected static async put<T, R>(url: string, body: T): Promise<R> {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`PUT request failed: ${response.statusText}`);
    }
    return response.json();
  }

  /**
   * Perform a DELETE request
   * @param url - API endpoint URL
   * @returns Promise of the response data
   */
  protected static async delete<T>(url: string): Promise<T> {
    const response = await fetch(url, { method: 'DELETE' });
    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`);
    }
    return response.json();
  }
}

export default BaseService;
