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
      <section className="rounded-2xl overflow-hidden shadow-lg mb-12 relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-90"></div>
        <div className="relative z-10 text-center p-16">
          <h1 className="text-5xl font-bold mb-4 text-white">Your Heatwave Companion:<br />ThermoWell</h1>
          <p className="text-xl font-normal max-w-2xl mx-auto mb-8 text-white">
            Stay safe and informed during heatwaves with real-time advisories, actionable tips, and essential resources.
          </p>
          <Link to="/dashboard" className="inline-block bg-white hover:bg-gray-100 text-primary-500 font-medium px-8 py-3 text-lg rounded-lg shadow-md transition-colors duration-200">Get Started</Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card hover:translate-y-[-5px] transition-all bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-20 h-20 mb-4 rounded-full bg-heat-warning bg-opacity-20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-heat-warning" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.5 6c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm5.5 7.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-6c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v6z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-heading">Heat Advisories</h2>
          <p className="text-gray-600 text-center mb-4">Get real-time updates on heatwave conditions and safety measures.</p>
          <Link to="/advisories" className="btn btn-primary px-6 py-2 text-white">View Advisories</Link>
        </div>
        <div className="card hover:translate-y-[-5px] transition-all bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-20 h-20 mb-4 rounded-full bg-secondary-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-heading">Safety Tips</h2>
          <p className="text-gray-600 text-center mb-4">Discover actionable tips to protect yourself and your loved ones.</p>
          <Link to="/tips" className="btn btn-primary px-6 py-2 text-white">View Tips</Link>
        </div>
        <div className="card hover:translate-y-[-5px] transition-all bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-20 h-20 mb-4 rounded-full bg-primary-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 font-heading">Resources</h2>
          <p className="text-gray-600 text-center mb-4">Access guides, checklists, and external links for heatwave preparedness.</p>
          <Link to="/resources" className="btn btn-primary px-6 py-2 text-white">View Resources</Link>
        </div>
      </section>

      {/* Recent Advisories */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 font-heading">Latest Advisories</h2>
          <Link to="/advisories" className="text-primary-600 font-medium hover:underline inline-flex items-center gap-2 text-lg transition-colors">
            View All <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {latestAdvisories.map((adv: Advisory) => (
            <AdvisoryCard key={adv.id} advisoryId={adv.id} />
          ))}
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="mt-16 mb-16 bg-stay-hydrated bg-cover bg-center rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600/90 to-secondary-700/90 p-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4 font-heading">Stay Protected This Summer</h2>
            <p className="text-white text-lg mb-6">
              Heat-related illnesses are preventable. Create your personalized heat safety plan today and get alerts when you need them most.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/health-score" className="btn bg-white text-primary-600 font-medium text-lg px-6 py-3">
                Check Your Heat Risk
              </Link>
              <Link to="/login" className="btn bg-primary-500 text-white font-medium text-lg px-6 py-3">
                Create Your Account
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            TW
          </div>
          <div>
            <div className="font-semibold text-gray-900">Alex Morgan</div>
            <div className="text-gray-600 text-sm">Health Advisor</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
