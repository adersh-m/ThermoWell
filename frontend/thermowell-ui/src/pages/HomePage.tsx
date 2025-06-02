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
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboardingComplete'));

  useEffect(() => {
    UserService.fetchUser().then((data) => setUser(data));
    AdvisoryService.fetchAdvisories().then((data) => setAdvisories(data));
  }, []);

  const handleCloseOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  const latestAdvisories = advisories.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}
      <h1 className="heading mb-2">Welcome back, {user?.name || 'Guest'}!</h1>

      {/* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">ThermoWell: Your Heatwave Companion</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Stay safe and informed during heatwaves with real-time advisories, actionable tips, and essential resources.
        </p>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Advisories</h2>
          <p className="text-gray-600 text-center mb-4">Get real-time updates on heatwave conditions and safety measures.</p>
          <Link to="/advisories" className="btn-primary text-lg font-semibold">View Advisories</Link>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Safety Tips</h2>
          <p className="text-gray-600 text-center mb-4">Discover actionable tips to protect yourself and your loved ones.</p>
          <Link to="/tips" className="btn-primary text-lg font-semibold">View Tips</Link>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Resources</h2>
          <p className="text-gray-600 text-center mb-4">Access guides, checklists, and external links for heatwave preparedness.</p>
          <Link to="/resources" className="btn-primary text-lg font-semibold">View Resources</Link>
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
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 flex items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
          AM
        </div>
        <div>
          <div className="font-semibold text-gray-900">Alex Morgan</div>
          <div className="text-gray-600 text-sm">Health Advisor</div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
