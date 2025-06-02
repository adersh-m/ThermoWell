import React, { useState, useEffect } from "react";
import TipsService from "../services/TipsService";

const TipsPage: React.FC = () => {
  const [generalTips, setGeneralTips] = useState<{ title: string; description: string; category?: string }[]>([]);

  useEffect(() => {
    TipsService.fetchTips().then((tips) => {
      // Add category to each tip for consistency
      const tipsWithCategory = tips.map(tip => ({ ...tip, category: "General" }));
      setGeneralTips(tipsWithCategory);
    });
  }, []);

  // Helper for tip actions (future: save/favorite, read more)
  const handleTipAction = (tip: typeof generalTips[0]) => {
    alert(`More info about: ${tip.title}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Safety Tips</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generalTips.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">Loading tips...</div>
        ) : (
          generalTips.map((tip, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
              <div className="text-gray-600 mb-4 flex-grow">{tip.description}</div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm mt-auto" onClick={() => handleTipAction(tip)}>Read More</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default TipsPage;
