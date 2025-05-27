export type Advisory = {
  id: number;
  title: string;
  message: string;
  severity: "Low" | "Moderate" | "High";
};

export const mockAdvisories: Advisory[] = [
  {
    id: 1,
    title: "Extreme Heat Warning",
    message: "Temperatures expected to exceed 45°C. Avoid going outdoors.",
    severity: "High",
  },
  {
    id: 2,
    title: "Hydration Alert",
    message: "High risk of dehydration. Drink water every hour.",
    severity: "Moderate",
  },
  {
    id: 3,
    title: "Early Morning Activity Recommended",
    message: "Avoid physical exertion after 11am.",
    severity: "Low",
  },
];
