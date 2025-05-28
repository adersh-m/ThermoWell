import { Link } from 'react-router-dom';
import HealthScoreForm from "../components/HealthScoreForm";

const HealthScorePage = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
      <h1 className="text-5xl font-bold mb-4">Health Risk Assessment</h1>
      <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
        Assess your heat-related health risks and get personalized recommendations.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link to="/advisories" className="btn-primary text-lg font-semibold">View Advisories</Link>
        <Link to="/tips" className="btn-secondary text-lg font-semibold">View Tips</Link>
      </div>
    </section>
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Heat Health Risk Assessment</h2>
      <p className="max-w-2xl mx-auto text-gray-600">
        Use this comprehensive tool to assess your current heat-related health risks. The assessment takes into account various factors including age, activity level, hydration, and current symptoms to provide personalized recommendations.
      </p>
    </div>
    <HealthScoreForm />
  </div>
);

export default HealthScorePage;
