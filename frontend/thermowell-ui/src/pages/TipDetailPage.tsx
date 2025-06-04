import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TipsService, { type Tip } from "../services/TipsService";
import Button from '../components/Button';

const tipImages = [
  '/images/hydration-tips.jpg',
  '/images/heat-protection-tips.jpg',
  '/images/heatwave-alert.jpg',
  '/images/community-support.jpg',
];

const TipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tip, setTip] = useState<Tip | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      TipsService.fetchTips().then((tips) => {
        const found = tips[Number(id)];
        setTip(found || null);
      });
    }
  }, [id]);

  if (!tip) {
    return <div className="max-w-2xl mx-auto py-16 text-center text-gray-500">Loading tip...</div>;
  }

  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      <Button variant="secondary" className="mb-6" onClick={() => navigate(-1)}>&larr; Back to Tips</Button>
      <header className="mb-8 flex flex-col items-center">
        <img src={tipImages[Number(id) % tipImages.length]} alt="Tip illustration" className="w-44 h-44 object-contain mb-4 bg-gray-50 rounded-xl shadow" />
        <h1 className="text-4xl font-extrabold font-heading text-center mb-2 text-neutral-900">{tip.title}</h1>
        {tip.group && <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-gray-900 mb-2">{tip.group}</span>}
      </header>
      <section className="prose prose-lg max-w-none text-primary text-center mb-8">
        <p>{tip.description}</p>
      </section>
      {/* Additional info section (expand as needed) */}
      <section className="mt-8 bg-neutral-50 rounded-xl p-6 text-left">
        <h2 className="text-xl font-bold mb-2 text-neutral-800">Why this matters</h2>
        <p className="text-neutral-700">Following this tip can help reduce your risk of heat-related illness and keep you and your community safe during extreme heat events.</p>
        {/* You can add more fields from the tip object here if available, e.g. tip.details, tip.sources, etc. */}
      </section>
    </article>
  );
};

export default TipDetailPage;
