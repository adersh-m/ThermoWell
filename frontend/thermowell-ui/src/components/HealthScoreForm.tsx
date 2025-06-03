import { useState } from "react";

interface Symptoms {
  headache: boolean;
  dizziness: boolean;
  nausea: boolean;
  fatigue: boolean;
  musclecramps: boolean;
  heavysweating: boolean;
}

interface HealthScoreResult {
  score: number;
  recommendations: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
}

const HealthScoreForm = () => {
  const [age, setAge] = useState<number>(0);
  const [outdoorHours, setOutdoorHours] = useState<number>(0);
  const [hydration, setHydration] = useState<number>(0);
  const [preExistingConditions, setPreExistingConditions] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState<string>('low');
  const [symptoms, setSymptoms] = useState<Symptoms>({
    headache: false,
    dizziness: false,
    nausea: false,
    fatigue: false,
    musclecramps: false,
    heavysweating: false
  });
  const [result, setResult] = useState<HealthScoreResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const calculateScore = () => {
    let baseScore = 100;
    let recommendations: string[] = [];

    // Age-based risk
    if (age > 75) {
      baseScore -= 30;
      recommendations.push("Elderly individuals are at higher risk. Take frequent breaks in cool areas.");
    } else if (age > 60) {
      baseScore -= 20;
      recommendations.push("Older adults should monitor their condition closely during heat waves.");
    }

    // Outdoor exposure
    if (outdoorHours > 4) {
      baseScore -= 35;
      recommendations.push("Limit outdoor activities to early morning or evening hours.");
    } else if (outdoorHours > 2) {
      baseScore -= 20;
      recommendations.push("Consider reducing time spent outdoors during peak heat hours.");
    }

    // Hydration
    if (hydration < 3) {
      baseScore -= 30;
      recommendations.push("Increase water intake immediately. Aim for at least 8 cups per day.");
    } else if (hydration < 6) {
      baseScore -= 15;
      recommendations.push("Consider increasing fluid intake, especially during outdoor activities.");
    }

    // Pre-existing conditions
    if (preExistingConditions.length > 0) {
      baseScore -= 10 * preExistingConditions.length;
      recommendations.push("Your health conditions may increase heat sensitivity. Consult your healthcare provider.");
    }

    // Activity level
    if (activityLevel === 'high' && outdoorHours > 2) {
      baseScore -= 25;
      recommendations.push("High physical activity in heat is risky. Consider indoor exercises or reducing intensity.");
    }

    // Symptoms
    const symptomCount = Object.values(symptoms).filter(Boolean).length;
    if (symptomCount >= 3) {
      baseScore -= 40;
      recommendations.push("Multiple heat-related symptoms detected. Seek immediate cooling and rest.");
    } else if (symptomCount > 0) {
      baseScore -= 15 * symptomCount;
      recommendations.push("Monitor your symptoms closely and stay in a cool environment.");
    }

    const finalScore = Math.max(0, baseScore);
    const riskLevel = finalScore >= 80 ? 'low' : finalScore >= 60 ? 'moderate' : finalScore >= 40 ? 'high' : 'severe';

    setResult({
      score: finalScore,
      recommendations,
      riskLevel
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (age < 0 || age > 120) newErrors.age = "Please enter a valid age (0-120).";
    if (outdoorHours < 0 || outdoorHours > 24) newErrors.outdoorHours = "Hours must be between 0 and 24.";
    if (hydration < 0 || hydration > 24) newErrors.hydration = "Cups must be between 0 and 24.";
    return newErrors;
  };

  const handleCalculate = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setIsLoading(true);
    setTimeout(() => {
      calculateScore();
      setIsLoading(false);
    }, 500);
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 border border-blue-200">
      {/* Accent bar with icon */}
      <div className="absolute -top-6 left-8 flex items-center gap-2">
        <div className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 drop-shadow-sm">Personal Heat Health Assessment</h2>
      </div>
      <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info Section */}
        <div className="space-y-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-600">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Personal Info
          </h3>
          <div>
            <label className="block font-medium">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 shadow-sm p-2"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Enter your age"
              min={0}
              max={120}
            />
            <p className="text-xs text-gray-500 mt-1">Enter your age in years.</p>
            {errors.age && <div className="text-red-500 caption mt-1">{errors.age}</div>}
          </div>
          <div>
            <label className="block font-medium">Hours spent outdoors today</label>
            <input
              id="outdoorHours"
              name="outdoorHours"
              type="number"
              min="0"
              max="24"
              step="0.5"
              className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 shadow-sm p-2"
              value={outdoorHours}
              onChange={(e) => setOutdoorHours(Number(e.target.value))}
              placeholder="Hours outside"
            />
            <p className="text-xs text-gray-500 mt-1">0–24 hours</p>
            {errors.outdoorHours && <div className="text-red-500 caption mt-1">{errors.outdoorHours}</div>}
          </div>
          <div>
            <label className="block font-medium">Cups of water consumed</label>
            <input
              id="hydration"
              name="hydration"
              type="number"
              min="0"
              max="24"
              step="0.5"
              className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 shadow-sm p-2"
              value={hydration}
              onChange={(e) => setHydration(Number(e.target.value))}
              placeholder="Cups of water"
            />
            <p className="text-xs text-gray-500 mt-1">1 cup = 250ml. Aim for 8+ cups/day.</p>
            {errors.hydration && <div className="text-red-500 caption mt-1">{errors.hydration}</div>}
          </div>
          <div>
            <label className="block font-medium">Activity Level</label>
            <select
              id="activity"
              name="activity"
              className="mt-1 w-full rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 shadow-sm p-2"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
            >
              <option value="low">Low - Mostly Resting</option>
              <option value="moderate">Moderate - Light Activities</option>
              <option value="high">High - Intense Activities</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Select your main activity level today.</p>
          </div>
        </div>
        {/* Health Conditions & Symptoms Section */}
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-red-500">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              Pre-existing Conditions
            </h3>
            <div className="grid grid-cols-1 gap-2 bg-red-50 rounded-xl p-4 border border-red-200 mt-2">
              {['Heart Disease', 'Diabetes', 'Respiratory Issues', 'High Blood Pressure'].map((condition) => (
                <label key={condition} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-opacity-50"
                    checked={preExistingConditions.includes(condition)}
                    onChange={(e) => {
                      setPreExistingConditions(prev =>
                        e.target.checked
                          ? [...prev, condition]
                          : prev.filter(c => c !== condition)
                      );
                    }}
                  />
                  <span className="ml-1 text-sm text-primary">{condition}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-orange-500">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              Current Symptoms
            </h3>
            <div className="grid grid-cols-2 gap-2 bg-orange-50 rounded-xl p-4 border border-orange-200 mt-2">
              {Object.entries(symptoms).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-opacity-50"
                    checked={value}
                    onChange={() => setSymptoms(s => ({ ...s, [key]: !s[key as keyof Symptoms] }))}
                  />
                  <span className="ml-1 text-sm text-primary">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* Calculate Button */}
        <div className="col-span-full flex justify-center mt-8">
          <button
            onClick={handleCalculate}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full inline-block align-middle"></span> : null}
            Calculate Health Score
          </button>
        </div>
      </form>
        {/* Results Section */}
        {result && (
          <div className={`p-6 rounded-lg border-l-8 mt-6 shadow-sm bg-white ${
              result.riskLevel === 'low' ? 'border-green-400' :
              result.riskLevel === 'moderate' ? 'border-yellow-400' :
              result.riskLevel === 'high' ? 'border-orange-400' :
              'border-red-400'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold font-heading">
                  Health Score: {result.score}
                </h3>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  result.riskLevel === 'low' ? 'bg-green-100' :
                  result.riskLevel === 'moderate' ? 'bg-yellow-100' :
                  result.riskLevel === 'high' ? 'bg-orange-100' :
                  'bg-red-100'
                }`}>
                  {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} Risk
                </span>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-lg mb-1 font-heading">Recommendations</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="text-sm text-primary">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="btn btn-secondary" disabled title="Coming soon">Export</button>
                <button className="btn btn-tertiary" disabled title="Coming soon">Share</button>
              </div>
            </div>
        )}
    </div>
  );
};

export default HealthScoreForm;

