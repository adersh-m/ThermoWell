import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdvisoryCard from '../components/AdvisoryCard';
import OnboardingModal from '../components/OnboardingModal';
import { AdvisoryService } from '../services/AdvisoryService';
import type { Advisory } from '../data/mockAdvisories';
import { useAuth } from '../contexts/AuthContext';

const featureImages = [
  {
    src: '/images/heatwave-alert.jpg',
    alt: 'Heatwave Alert',
    title: 'Heat Advisories',
    desc: 'Get real-time updates on heatwave conditions and safety measures.',
    link: '/advisories',
    linkText: 'View Advisories',
  },
  {
    src: '/images/hydration-tips.jpg',
    alt: 'Hydration Tips',
    title: 'Safety Tips',
    desc: 'Discover actionable tips to protect yourself and your loved ones.',
    link: '/tips',
    linkText: 'View Tips',
  },
  {
    src: '/images/heat-protection-tips.jpg',
    alt: 'Heat Protection Resources',
    title: 'Resources',
    desc: 'Access guides, checklists, and external links for heatwave preparedness.',
    link: '/resources',
    linkText: 'View Resources',
  },
];

const HomePage: React.FC = () => {
  const { isAuthenticated, user: authUser } = useAuth();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(!localStorage.getItem('onboardingComplete'));

  useEffect(() => {
    if (isAuthenticated) {
      // Use user from AuthContext if available
      setUser(authUser ? { name: authUser.name } : null);
    } else {
      setUser(null);
    }
    AdvisoryService.fetchAdvisories().then((data) => setAdvisories(data));
  }, [isAuthenticated, authUser]);

  const handleCloseOnboarding = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  const latestAdvisories = advisories.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {showOnboarding && <OnboardingModal onClose={handleCloseOnboarding} />}

      {/* Hero Section */}
      <section className="rounded-2xl overflow-hidden shadow-lg mb-12 relative">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-90"></div>
        <div className="relative z-10 text-center p-16">
          <h1 className="text-5xl font-extrabold mb-4 text-white font-heading">ThermoWell: Personalized Heatwave Safety</h1>
          <p className="text-xl font-normal max-w-2xl mx-auto mb-8 text-white">
            Stay safe and healthy during extreme heat. Get real-time alerts, tailored health risk assessments, and expert tips—designed just for you.
          </p>
          <Link to="/dashboard" className="inline-block bg-white hover:bg-gray-100 text-primary-500 font-medium px-8 py-3 text-lg rounded-lg shadow-md transition-colors duration-200">Get Started</Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {featureImages.map((img) => (
          <div key={img.title} className="card hover:translate-y-[-5px] transition-all bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src={img.src} alt={img.alt} className="w-full h-40 object-cover rounded-lg mb-4" loading="lazy" />
            <h2 className="text-xl font-semibold mb-2 font-heading">{img.title}</h2>
            <p className="text-gray-600 text-center mb-4">{img.desc}</p>
            <Link to={img.link} className="btn btn-primary px-6 py-2 text-white">{img.linkText}</Link>
          </div>
        ))}
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
        {isAuthenticated && user ? (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
              TW
            </div>
            <div>
              <div className="font-semibold text-gray-900">Alex Morgan</div>
              <div className="text-gray-600 text-sm">Health Advisor</div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} ThermoWell. Stay safe in the heat.</div>
        )}
      </footer>
    </div>
  );
};

export default HomePage;
