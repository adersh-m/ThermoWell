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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                min="0"
                max="120"
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours spent outdoors today</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                value={outdoorHours}
                onChange={(e) => setOutdoorHours(Number(e.target.value))}
                placeholder="Hours outside"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cups of water consumed</label>
              <input
                type="number"
                min="0"
                max="24"
                step="0.5"
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                value={hydration}
                onChange={(e) => setHydration(Number(e.target.value))}
                placeholder="Cups of water"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="low">Low - Mostly Resting</option>
                <option value="moderate">Moderate - Light Activities</option>
                <option value="high">High - Intense Activities</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Pre-existing Conditions</label>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {['Heart Disease', 'Diabetes', 'Respiratory Issues', 'High Blood Pressure'].map((condition) => (
                  <label key={condition} className="flex items-center">
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
                    <span className="ml-3 text-sm text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Current Symptoms</label>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-lg">
                {Object.entries(symptoms).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-opacity-50"
                      checked={value}
                      onChange={() => setSymptoms(s => ({ ...s, [key]: !s[key as keyof Symptoms] }))}
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div>
          <button
            onClick={calculateScore}
            className="w-full bg-heat text-white font-medium px-6 py-3 rounded-lg hover:bg-heat/90 focus:outline-none focus:ring-2 focus:ring-heat focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Calculate Health Score
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-6">
            <div className={`p-6 rounded-lg border ${
              result.riskLevel === 'low' ? 'bg-green-50 border-green-200 text-green-800' :
              result.riskLevel === 'moderate' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
              result.riskLevel === 'high' ? 'bg-orange-50 border-orange-200 text-orange-800' :
              'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Health Score: {result.score}
                </h3>
                <span className="px-3 py-1 text-sm font-medium rounded-full ${
                  result.riskLevel === 'low' ? 'bg-green-100' :
                  result.riskLevel === 'moderate' ? 'bg-yellow-100' :
                  result.riskLevel === 'high' ? 'bg-orange-100' :
                  'bg-red-100'
                }">
                  {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} Risk
                </span>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Recommendations:</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthScoreForm;
