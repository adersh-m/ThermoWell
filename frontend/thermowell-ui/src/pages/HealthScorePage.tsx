import HealthScoreForm from "../components/HealthScoreForm";

const HealthScorePage = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
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
