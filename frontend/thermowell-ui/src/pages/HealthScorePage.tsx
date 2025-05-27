import HealthScoreForm from "../components/HealthScoreForm";

const HealthScorePage = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Heatwave Health Score</h2>
    <p className="mb-4 text-gray-600">Complete the form below to assess your current risk level during a heatwave.</p>
    <HealthScoreForm />
  </div>
);

export default HealthScorePage;
