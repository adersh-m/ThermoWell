import HealthScoreForm from "../components/HealthScoreForm";

const HealthScorePage = () => (
  <div className="max-w-4xl mx-auto px-2 py-8 md:px-0">
  <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-8 md:p-10 mb-8 md:mb-12">
    <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-4">Health Risk Assessment</h1>
    <p className="text-base md:text-lg font-normal max-w-2xl mx-auto mb-6 md:mb-8">
      Assess your heat-related health risks and get personalized recommendations.
    </p>
  </section>
  <div className="text-center mb-6 md:mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Heat Health Risk Assessment</h2>
    <p className="max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
      Use this comprehensive tool to assess your current heat-related health risks. The assessment takes into account various factors including age, activity level, hydration, and current symptoms to provide personalized recommendations.
    </p>
  </div>
  <HealthScoreForm />
</div>
);

export default HealthScorePage;
