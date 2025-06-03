import HealthScoreForm from "../components/HealthScoreForm";

const HealthScorePage = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    {/* Hero Banner */}
    <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
      <img 
        src="/images/health-score-banner.jpg" 
        alt="Health Score Assessment Banner" 
        className="w-full h-40 object-cover object-center" 
      />
    </div>
    {/* Accent Bar */}
    <div className="h-2 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4 mx-auto" />
    <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 font-heading">Personal Heat Health Score</h1>
    <h2 className="text-xl text-center text-gray-500 font-normal mb-6 font-heading">Personalized risk assessment for extreme heat</h2>
    <div className="bg-white rounded-xl p-6 shadow-md items-start mb-8">
      <HealthScoreForm />
    </div>
  </div>
);

export default HealthScorePage;
