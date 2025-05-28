import React from 'react';
import { Link } from 'react-router-dom';
import AdvisoryCard from '../components/AdvisoryCard';
import { mockAdvisories } from '../data/mockAdvisories';

const HomePage: React.FC = () => {
  const latestAdvisories = mockAdvisories.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-gradient-to-r from-heat to-orange-400 text-white text-center p-10 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Stay Safe During Heatwaves</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Get real-time advisories, health tips, and personalized risk assessments during extreme heat.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/advisories" className="btn-primary">View Advisories</Link>
          <Link to="/health-score" className="btn-primary bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md">
            Check Health Score
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">🌡️</div>
            <div className="font-semibold text-lg mb-1">Real-Time Alerts</div>
            <div className="text-gray-600 text-sm text-center">Stay informed with up-to-date heatwave advisories in your area.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">🧮</div>
            <div className="font-semibold text-lg mb-1">Health Risk Calculator</div>
            <div className="text-gray-600 text-sm text-center">Quickly assess how vulnerable you are based on age and medical history.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">📘</div>
            <div className="font-semibold text-lg mb-1">Practical Tips</div>
            <div className="text-gray-600 text-sm text-center">Simple, actionable safety measures for you and your family.</div>
          </div>
        </div>
      </section>

      {/* Recent Advisories */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Advisories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {latestAdvisories.map((adv) => (
            <AdvisoryCard key={adv.id} advisory={adv} />
          ))}
        </div>
        <div className="text-right">
          <Link to="/advisories" className="text-heat font-medium hover:underline inline-flex items-center gap-2">
            View All Advisories <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
