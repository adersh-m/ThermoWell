import React from "react";

const TipsPage: React.FC = () => {
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

  // Helper for tip actions (future: save/favorite, read more)
  const handleTipAction = (tip: typeof generalTips[0]) => {
    alert(`More info about: ${tip.title}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Safety Tips</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Discover actionable tips to stay safe and healthy during heatwaves.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generalTips.map((tip, index) => (
          <div key={index} className="card bg-white shadow p-6 flex flex-col items-start">
            <div className="subheading mb-1">{tip.title}</div>
            <div className="text-gray-600 mb-4">{tip.description}</div>
            <button className="btn-primary text-sm" onClick={() => handleTipAction(tip)}>Read More</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TipsPage;
