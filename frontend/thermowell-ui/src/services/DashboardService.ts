export const DashboardService = {
  fetchStatusCards: () => [
    {
      icon: "🌡️",
      label: "Heat Level",
      title: "Extreme",
      subtitle: "Temperature: 41°C\nFeels like: 44°C",
      buttonText: "Learn More",
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      icon: "⚠️",
      label: "Advisory",
      title: "Stay Indoors",
      subtitle: "High risk of heatstroke. Limit outdoor activity.",
      buttonText: "View Details",
      gradient: "bg-gradient-to-r from-yellow-400 to-orange-400",
    },
    {
      icon: "🔔",
      label: "Alerts",
      title: "2 New Alerts",
      subtitle: "Urgent health advisories issued for your area.",
      buttonText: "See Alerts",
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
  ],

  fetchVulnerableGroups: () => [
    {
      icon: "👶",
      label: "Children",
      title: "Hydration First",
      description: "Encourage water breaks every 30 minutes.",
      gradient: "bg-gradient-to-r from-green-400 to-teal-400",
    },
    {
      icon: "👴",
      label: "Elderly",
      title: "Stay Cool",
      description: "Use fans and avoid direct sun.",
      gradient: "bg-gradient-to-r from-purple-400 to-pink-400",
    },
    {
      icon: "👷",
      label: "Outdoor Workers",
      title: "Rest Breaks",
      description: "Take breaks in shaded areas.",
      gradient: "bg-gradient-to-r from-orange-400 to-red-400",
    },
  ],

  fetchResources: () => [
    {
      icon: "?",
      label: "What is a Heatwave?",
      title: "Understanding Risks",
      description: "Learn how heatwaves impact health and safety.",
      buttonText: "Read More",
    },
    {
      icon: "🛡️",
      label: "Prevention",
      title: "Stay Safe Tips",
      description: "Simple steps to reduce heat-related risks.",
      buttonText: "View Tips",
    },
  ],
};
