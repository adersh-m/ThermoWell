export default class UserService {
  static async fetchUser(): Promise<{ name: string }> {
    // Simulate network delay and return mock user data
    return new Promise((resolve) => {
      setTimeout(() => resolve({ name: 'Alex Morgan' }), 500);
    });
  }
}
