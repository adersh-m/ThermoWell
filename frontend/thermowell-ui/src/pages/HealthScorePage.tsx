// src/pages/HealthScorePage.tsx
import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';

const HealthScorePage: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState('');
  const [hasCondition, setHasCondition] = useState(false);
  const [outdoorWork, setOutdoorWork] = useState(false);
  const [hasCooling, setHasCooling] = useState(true);
  const [score, setScore] = useState<number | null>(null);

  const calculateScore = () => {
    let score = 100;

    if (ageGroup === 'senior') score -= 30;
    if (hasCondition) score -= 25;
    if (outdoorWork) score -= 20;
    if (!hasCooling) score -= 25;

    return Math.max(0, score);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScore(calculateScore());
  };

  const riskLevel = score === null
    ? null
    : score >= 75
    ? 'Low Risk'
    : score >= 50
    ? 'Moderate Risk'
    : 'High Risk';

  return (
    <>
      <PageHeader title="Health Score" subtitle="Assess your vulnerability to heat-related illness" />

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl mx-auto space-y-6"
      >
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
            Your Age Group
          </label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select</option>
            <option value="child">Under 18</option>
            <option value="adult">18–64</option>
            <option value="senior">65 or older</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            id="condition"
            type="checkbox"
            checked={hasCondition}
            onChange={(e) => setHasCondition(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="condition" className="text-sm text-gray-700 dark:text-gray-300">
            I have a chronic condition (e.g., heart/lung disease)
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="outdoor"
            type="checkbox"
            checked={outdoorWork}
            onChange={(e) => setOutdoorWork(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="outdoor" className="text-sm text-gray-700 dark:text-gray-300">
            I work outside regularly
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="cooling"
            type="checkbox"
            checked={hasCooling}
            onChange={(e) => setHasCooling(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="cooling" className="text-sm text-gray-700 dark:text-gray-300">
            I have reliable access to air conditioning/fans
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calculate My Health Score
        </button>
      </form>

      {score !== null && (
        <div className="mt-8 max-w-xl mx-auto bg-blue-50 dark:bg-blue-900 p-6 rounded-xl shadow text-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Your Health Score: <span className="text-blue-600 dark:text-blue-300">{score}</span>
          </p>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Risk Level: <strong>{riskLevel}</strong>
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {riskLevel === 'High Risk'
              ? 'Avoid outdoor activity during peak hours, stay cool, and hydrate frequently.'
              : riskLevel === 'Moderate Risk'
              ? 'Be cautious. Limit exposure and monitor your condition.'
              : 'Great! Keep hydrated and avoid overexertion in extreme heat.'}
          </p>
        </div>
      )}
    </>
  );
};

export default HealthScorePage;
