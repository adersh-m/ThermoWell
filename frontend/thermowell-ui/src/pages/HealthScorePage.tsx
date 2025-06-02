import HealthScoreForm from "../components/HealthScoreForm";

const HealthScorePage = () => (
  <div className="max-w-4xl mx-auto px-2 py-8 md:px-0">
    <h2 className="text-2xl font-bold mb-6">Health Risk Assessment</h2>
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-xl font-semibold mb-4">Heat Health Risk Assessment</h3>
      <p className="text-gray-600 mb-6">
        Use this comprehensive tool to assess your current heat-related health risks. The assessment takes into account various factors including age, activity level, hydration, and current symptoms to provide personalized recommendations.
      </p>
      <HealthScoreForm />
    </div>
  </div>
);

export default HealthScorePage;
