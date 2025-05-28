import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdvisoryCard from '../components/AdvisoryCard';
import OnboardingModal from '../components/OnboardingModal';
import UserService from '../services/UserService';
import { AdvisoryService } from '../services/AdvisoryService';
import type { Advisory } from '../data/mockAdvisories';

const HomePage: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const showOnboarding = !localStorage.getItem('onboardingComplete');

  useEffect(() => {
    UserService.fetchUser().then((data) => setUser(data));
    AdvisoryService.fetchAdvisories().then((data) => setAdvisories(data));
  }, []);

  const handleCloseOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
  };

  const latestAdvisories = advisories.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}
      <h1 className="heading mb-2">Welcome back, {user?.name || 'Guest'}!</h1>

      {/* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Stay Safe During Heatwaves</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Get real-time advisories, health tips, and personalized risk assessments during extreme heat.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/advisories" className="btn-primary text-lg font-semibold">View Advisories</Link>
          <Link to="/health-score" className="btn-secondary text-lg font-semibold">Check Health Score</Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">🌡️</div>
            <div className="text-xl font-semibold mb-1">Real-Time Alerts</div>
            <div className="text-base text-gray-600 text-center">Stay informed with up-to-date heatwave advisories in your area.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">🧮</div>
            <div className="text-xl font-semibold mb-1">Health Risk Calculator</div>
            <div className="text-base text-gray-600 text-center">Quickly assess how vulnerable you are based on age and medical history.</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <div className="text-3xl mb-2">📘</div>
            <div className="text-xl font-semibold mb-1">Practical Tips</div>
            <div className="text-base text-gray-600 text-center">Simple, actionable safety measures for you and your family.</div>
          </div>
        </div>
      </section>

      {/* Recent Advisories */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Latest Advisories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {latestAdvisories.map((adv: Advisory) => (
            <AdvisoryCard key={adv.id} advisoryId={adv.id} />
          ))}
        </div>
        <div className="text-right">
          <Link to="/advisories" className="text-red-500 font-medium hover:underline inline-flex items-center gap-2 text-lg">
            View All Advisories <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
