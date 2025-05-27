import { useEffect, useState } from "react";
import { type Advisory, mockAdvisories } from "../data/mockAdvisories";
import AdvisoryCard from "../components/AdvisoryCard";

const Dashboard = () => {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setAdvisories(mockAdvisories);
    }, 500);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {advisories.length === 0 ? (
        <p>Loading advisories...</p>
      ) : (
        advisories.map((adv) => <AdvisoryCard key={adv.id} advisory={adv} />)
      )}
    </div>
  );
};

export default Dashboard;
