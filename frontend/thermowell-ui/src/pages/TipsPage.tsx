import React, { useState, useEffect } from "react";
import TipsService from "../services/TipsService";
import TipCard from "../components/TipCard";

const tipImages = [
  '/images/hydration-tips.jpg',
  '/images/heat-protection-tips.jpg',
  '/images/heatwave-alert.jpg',
  '/images/community-support.jpg',
];

const TipsPage: React.FC = () => {
  const [generalTips, setGeneralTips] = useState<{ title: string; description: string; category?: string }[]>([]);

  useEffect(() => {
    TipsService.fetchTips().then((tips) => {
      // Remove duplicate tips by title
      const uniqueTips = tips.filter((tip, idx, arr) => arr.findIndex(t => t.title === tip.title) === idx);
      const tipsWithCategory = uniqueTips.map(tip => ({ ...tip, category: "General" }));
      setGeneralTips(tipsWithCategory);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
        <img 
          src="/images/hydration-tips.jpg" 
          alt="ThermoWell Tips Banner" 
          className="w-full h-40 object-cover object-center" 
        />
      </div>
      {/* Accent Bar and Intro */}
      <div className="h-2 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4 mx-auto" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 font-heading">Heat Safety Tips</h1>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">Practical, expert-backed tips to help you stay safe and healthy during extreme heat events.</p>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generalTips.length === 0 ? (
          <div className="col-span-full text-center text-secondary py-8">Loading tips...</div>
        ) : (
          generalTips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md flex flex-col items-start border border-gray-100 transition-shadow duration-200 hover:shadow-lg">
              <img src={tipImages[index % tipImages.length]} alt="Tip illustration" className="w-full h-24 object-contain mb-4 bg-gray-50 rounded" loading="lazy" />
              <div className="flex items-center gap-2 mb-2">
                {tip.category && <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-gray-900">{tip.category}</span>}
              </div>
              <TipCard tip={tip} />
              <button className="btn btn-primary text-sm mt-2 self-start" disabled title="Coming soon: More details for this tip">Read More</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default TipsPage;
