/**
 * A shared HTTP client for making API requests with consistent error handling,
 * timeout management, and retry logic.
 */

/**
 * Configuration options for HTTP requests
 */
export interface RequestConfig extends RequestInit {
  /**
   * Request timeout in milliseconds
   */
  timeout?: number;
  
  /**
   * Maximum number of retry attempts
   */
  maxRetries?: number;
  
  /**
   * Whether to serialize request body as JSON
   */
  json?: boolean;
}

/**
 * Default configuration for HTTP requests
 */
const DEFAULT_CONFIG: Required<Pick<RequestConfig, 'timeout' | 'maxRetries'>> = {
  timeout: 10000, // 10 seconds
  maxRetries: 3
};

/**
 * Makes an HTTP request with timeout and retry logic
 * 
 * @param url - The URL to request
 * @param config - Configuration options
 * @returns A promise that resolves to the response
 */
export async function fetchWithRetry(
  url: string,
  config: RequestConfig = {}
): Promise<Response> {
  const { timeout = DEFAULT_CONFIG.timeout, maxRetries = DEFAULT_CONFIG.maxRetries, ...fetchConfig } = config;
  
  // If json option is true, set appropriate headers and serialize body
  if (config.json && config.body && typeof config.body === 'object') {
    fetchConfig.headers = {
      'Content-Type': 'application/json',
      ...fetchConfig.headers
    };
    fetchConfig.body = JSON.stringify(config.body);
  }

  // Try the request with retries
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      fetchConfig.signal = controller.signal;
      
      const response = await fetch(url, fetchConfig);
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      
      if (isLastAttempt) {
        throw error;
      }
      
      // Wait using exponential backoff before retrying
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
      
      console.warn(`Fetch attempt ${attempt + 1} failed for ${url}, retrying...`);
    }
  }
  
  // This should never happen due to the throw in the last iteration
  throw new Error('All fetch attempts failed');
}

/**
 * Fetch JSON data with appropriate error handling
 * 
 * @param url - The URL to fetch
 * @param config - Configuration options
 * @returns Parsed JSON data
 */
export async function fetchJson<T>(url: string, config?: RequestConfig): Promise<T> {
  const response = await fetchWithRetry(url, config);
  return await response.json() as T;
}

/**
 * A utility class for making HTTP requests with consistent error handling,
 * timeout management, and retry logic.
 */
export default {
  /**
   * Make a GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await fetchWithRetry(url, { 
      ...config, 
      method: 'GET' 
    });
    return await response.json() as T;
  },

  /**
   * Make a POST request
   */
  async post<T>(url: string, body?: any, config?: RequestConfig): Promise<T> {
    const response = await fetchWithRetry(url, { 
      ...config, 
      method: 'POST',
      body,
      json: true
    });
    return await response.json() as T;
  },

  /**
   * Make a PUT request
   */
  async put<T>(url: string, body?: any, config?: RequestConfig): Promise<T> {
    const response = await fetchWithRetry(url, { 
      ...config, 
      method: 'PUT',
      body,
      json: true
    });
    return await response.json() as T;
  },

  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await fetchWithRetry(url, { 
      ...config, 
      method: 'DELETE' 
    });
    return await response.json() as T;
  },
  
  // Export the raw functions for more flexibility
  fetchWithRetry,
  fetchJson
};
