import React, { useEffect, useState } from "react";
import { mockTips, type Tip } from "../data/mockTips";
import TipCard from "../components/TipCard";

const TipsPage: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("All");

  useEffect(() => {
    // Simulated API fetch
    setTimeout(() => {
      setTips(mockTips);
    }, 300);
  }, []);

  const generalTips = [
    {
      category: "General",
      title: "Stay Hydrated",
      description:
        "Drink water regularly, even if you're not thirsty. Avoid sugary and alcoholic drinks.",
    },
    {
      category: "General",
      title: "Keep Cool",
      description:
        "Wear light clothing and stay in air-conditioned places when possible.",
    },
  ];

  const groupTips = [
    {
      group: "Children",
      title: "Play Indoors",
      description: "Encourage indoor activities during peak heat.",
    },
    {
      group: "Elderly",
      title: "Check Medications",
      description: "Some medicines increase heat sensitivity.",
    },
    {
      group: "Outdoor Workers",
      title: "Schedule Breaks",
      description: "Take frequent breaks in shaded or cool areas.",
    },
  ];

  const groups = ["All", "Children", "Elderly", "Outdoor Workers"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Heat Safety Tips
      </h1>

      {/* General Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {generalTips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
          >
            <div className="text-heat text-xs font-semibold mb-1">
              {tip.category}
            </div>
            <div className="font-semibold text-lg mb-1">{tip.title}</div>
            <div className="text-gray-700 text-sm">{tip.description}</div>
          </div>
        ))}
      </div>

      {/* Tips by Group */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tips by Group
        </h2>
        <div className="flex gap-4 mb-6">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
                selectedGroup === group
                  ? "bg-heat text-white border-heat"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {groupTips
            .filter(
              (tip) => selectedGroup === "All" || tip.group === selectedGroup
            )
            .map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-2"
              >
                <div className="font-semibold text-lg mb-1">{tip.title}</div>
                <div className="text-gray-700 text-sm">{tip.description}</div>
                <div className="text-xs text-gray-400">Group: {tip.group}</div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default TipsPage;
