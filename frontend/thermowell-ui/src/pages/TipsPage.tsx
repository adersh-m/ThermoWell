import { useEffect, useState } from "react";
import { mockTips, type Tip } from "../data/mockTips";
import TipCard from "../components/TipCard";

const TipsPage = () => {
  const [tips, setTips] = useState<Tip[]>([]);

  useEffect(() => {
    // Simulated API fetch
    setTimeout(() => {
      setTips(mockTips);
    }, 300);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Heatwave Health Tips</h2>
      {tips.map(tip => (
        <TipCard key={tip.id} tip={tip} />
      ))}
    </div>
  );
};

export default TipsPage;
