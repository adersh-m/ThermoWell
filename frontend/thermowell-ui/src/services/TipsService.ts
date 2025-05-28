export default class TipsService {
  static async fetchTips(): Promise<{ title: string; description: string }[]> {
    // Simulate network delay and return mock tips data
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        { title: 'Stay Hydrated', description: 'Drink water regularly, even if you are not thirsty.' },
        { title: 'Keep Cool', description: 'Wear light clothing and stay in air-conditioned places.' },
      ]), 500);
    });
  }
}
