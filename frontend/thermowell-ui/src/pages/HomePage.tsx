import { Link } from 'react-router-dom';
import AdvisoryCard from '../components/AdvisoryCard';
import { mockAdvisories } from '../data/mockAdvisories';

export default function HomePage() {
  const latestAdvisories = mockAdvisories.slice(0, 3); // Get top 3 advisories

  return (
    <div className="p-6 space-y-12">
      {/* 🌡️ Hero Section */}
      <section className="text-center py-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700">Stay Safe During Heatwaves</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          Get real-time advisories, health tips, and personalized risk assessments during extreme heat.
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <Link to="/advisories" className="btn-primary">View Advisories</Link>
          <Link to="/health-score" className="btn-secondary">Check Health Score</Link>
        </div>
      </section>

      {/* 📊 Feature Highlights */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="feature-card">
          <span className="text-3xl">🌡️</span>
          <h3 className="font-semibold text-lg mt-2">Real-Time Alerts</h3>
          <p className="text-sm text-gray-600">Stay informed with up-to-date heatwave advisories in your area.</p>
        </div>
        <div className="feature-card">
          <span className="text-3xl">🧮</span>
          <h3 className="font-semibold text-lg mt-2">Health Risk Calculator</h3>
          <p className="text-sm text-gray-600">Quickly assess how vulnerable you are based on age and medical history.</p>
        </div>
        <div className="feature-card">
          <span className="text-3xl">📘</span>
          <h3 className="font-semibold text-lg mt-2">Practical Tips</h3>
          <p className="text-sm text-gray-600">Simple, actionable safety measures for you and your family.</p>
        </div>
      </section>

      {/* 📣 Recent Advisories */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Advisories</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {latestAdvisories.map((adv) => (
            <AdvisoryCard key={adv.id} advisory={adv} />
          ))}
        </div>
        <div className="text-right mt-4">
          <Link to="/advisories" className="text-blue-600 hover:underline font-medium">
            View All Advisories →
          </Link>
        </div>
      </section>
    </div>
  );
}
