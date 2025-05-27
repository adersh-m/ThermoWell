import { useState } from "react";

const HealthScoreForm = () => {
  const [age, setAge] = useState<number>(0);
  const [outdoorHours, setOutdoorHours] = useState<number>(0);
  const [hydration, setHydration] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<{ headache: boolean; dizziness: boolean }>({ headache: false, dizziness: false });
  const [score, setScore] = useState<number | null>(null);

  const calculateScore = () => {
    let baseScore = 100;
    if (age > 60) baseScore -= 20;
    if (outdoorHours > 3) baseScore -= 30;
    if (hydration < 4) baseScore -= 25;
    if (symptoms.headache || symptoms.dizziness) baseScore -= 25;

    setScore(Math.max(0, baseScore));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Age</label>
        <input type="number" className="border p-2 w-full" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      </div>

      <div>
        <label className="block font-medium">Hours spent outdoors today</label>
        <input type="number" className="border p-2 w-full" value={outdoorHours} onChange={(e) => setOutdoorHours(Number(e.target.value))} />
      </div>

      <div>
        <label className="block font-medium">Cups of water consumed</label>
        <input type="number" className="border p-2 w-full" value={hydration} onChange={(e) => setHydration(Number(e.target.value))} />
      </div>

      <div>
        <label className="block font-medium">Symptoms</label>
        <label className="block"><input type="checkbox" checked={symptoms.headache} onChange={() => setSymptoms(s => ({ ...s, headache: !s.headache }))} /> Headache</label>
        <label className="block"><input type="checkbox" checked={symptoms.dizziness} onChange={() => setSymptoms(s => ({ ...s, dizziness: !s.dizziness }))} /> Dizziness</label>
      </div>

      <button onClick={calculateScore} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Health Score
      </button>

      {score !== null && (
        <div className={`mt-4 p-4 rounded font-semibold ${score >= 70 ? "bg-green-100 text-green-700" : score >= 40 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
          Your Heat Health Score is: {score}
        </div>
      )}
    </div>
  );
};

export default HealthScoreForm;
