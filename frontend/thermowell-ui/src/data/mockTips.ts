export type Tip = {
  id: number;
  title: string;
  description: string;
};

export const mockTips: Tip[] = [
  {
    id: 1,
    title: "Stay Hydrated",
    description: "Drink water every 30–60 minutes, even if you’re not thirsty.",
  },
  {
    id: 2,
    title: "Wear Light Clothing",
    description: "Use light-colored, loose-fitting, breathable clothing.",
  },
  {
    id: 3,
    title: "Avoid Outdoor Activities",
    description: "Stay indoors between 11 AM and 4 PM when heat is at its peak.",
  },
];
