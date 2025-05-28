import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';



const TipsPage: React.FC = () => {
  
  const [selectedGroup, setSelectedGroup] = useState("All");

  useEffect(() => {
    // Simulated API fetch
    setTimeout(() => {
      
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
  <h1 className="text-5xl font-bold mb-4">Safety Tips</h1>
  <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
    Discover actionable tips to stay safe and healthy during heatwaves.
  </p>
  <div className="flex flex-col md:flex-row gap-4 justify-center">
    <Link to="/advisories" className="btn-primary text-lg font-semibold">View Advisories</Link>
  </div>
</section>

      {/* Group Selector */}
      <div className="flex gap-4 mb-6">
        {groups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedGroup(group)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-150 ${
              selectedGroup === group
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-green-500'
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(selectedGroup === "All" ? [...generalTips, ...groupTips] : groupTips.filter((tip) => tip.group === selectedGroup)).map((tip, index) => (
          <div key={index} className="card bg-white shadow p-6">
            <div className="subheading mb-1">{tip.title}</div>
            <div className="text-gray-600">{tip.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsPage;
