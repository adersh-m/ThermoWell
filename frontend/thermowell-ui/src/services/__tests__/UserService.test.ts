import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserService from '../UserService';

// Mock data
const mockUser = { name: 'Test User' };

// Reset mocks before each test
beforeEach(() => {
  vi.resetAllMocks();

  // Mock fetch API
  window.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockUser),
    } as Response)
  );
});

describe('UserService', () => {
  it('fetches user data correctly', async () => {
    const user = await UserService.fetchUser();
    expect(user).toEqual(mockUser);
  }, 10000); // Increase timeout to 10 seconds
});
