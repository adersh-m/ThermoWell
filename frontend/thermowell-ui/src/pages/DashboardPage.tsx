import React, { useEffect, useState } from "react";
import { type Advisory, mockAdvisories } from "../data/mockAdvisories";
import AdvisoryCard from "../components/AdvisoryCard";

const DashboardPage: React.FC = () => {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setAdvisories(mockAdvisories);
    }, 500);
  }, []);

  const statusCards = [
    {
      icon: "i",
      label: "Heat Level",
      title: "Extreme",
      subtitle: "Temperature: 41°C\nFeels like: 44°C",
      buttonText: "Learn More",
      iconClass: "info",
    },
    {
      icon: "⚠",
      label: "Advisory",
      title: "Stay Indoors",
      subtitle: "High risk of heatstroke. Limit outdoor activity.",
      buttonText: "View Details",
      iconClass: "warning",
    },
    {
      icon: "🔔",
      label: "Alerts",
      title: "2 New Alerts",
      subtitle: "Urgent health advisories issued for your area.",
      buttonText: "See Alerts",
      iconClass: "alert",
    },
  ];

  const vulnerableGroups = [
    {
      icon: "👶",
      label: "Children",
      title: "Hydration First",
      description: "Encourage frequent water breaks and avoid midday sun.",
    },
    {
      icon: "👴",
      label: "Elderly",
      title: "Stay Cool",
      description: "Use fans, stay in shaded areas, and check on neighbors.",
    },
    {
      icon: "👷",
      label: "Outdoor Workers",
      title: "Take Breaks",
      description: "Rest in cool areas and wear light clothing.",
    },
  ];

  const resources = [
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
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
        Current Heatwave Status
      </h1>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statusCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
          >
            <div className="text-3xl mb-2">{card.icon}</div>
            <div className="font-semibold text-lg mb-1">{card.title}</div>
            <div className="text-gray-600 text-sm whitespace-pre-line mb-2 text-center">
              {card.subtitle}
            </div>
            <button className="btn-primary mt-2">{card.buttonText}</button>
          </div>
        ))}
      </div>

      {/* Vulnerable Groups */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Vulnerable Groups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vulnerableGroups.map((group, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
            >
              <div className="text-3xl mb-2">{group.icon}</div>
              <div className="font-semibold text-lg mb-1">{group.title}</div>
              <div className="text-gray-600 text-sm text-center mb-2">
                {group.description}
              </div>
              <button className="btn-primary mt-2">Advice</button>
            </div>
          ))}
        </div>
      </section>

      {/* Heatwave Map */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Heatwave Map</h2>
        <div className="bg-white rounded-xl shadow flex items-center justify-center h-64 text-gray-400 text-lg">
          Interactive Heatwave Map will be displayed here
        </div>
      </section>

      {/* Educational Resources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Educational Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
            >
              <div className="text-2xl mb-2">{resource.icon}</div>
              <div className="font-semibold text-lg mb-1">{resource.title}</div>
              <div className="text-gray-600 text-sm text-center mb-2">
                {resource.description}
              </div>
              <button className="btn-primary mt-2">{resource.buttonText}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Advisories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Latest Advisories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {advisories.slice(0, 3).map((adv) => (
            <AdvisoryCard key={adv.id} advisory={adv} />
          ))}
        </div>
        <div className="text-right">
          <a
            href="/advisories"
            className="text-heat font-medium hover:underline inline-flex items-center gap-2"
          >
            View All Advisories <span>→</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
