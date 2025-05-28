import { AdvisoryService } from "../services/AdvisoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Advisory } from "../data/mockAdvisories";

const AdvisoryCard = ({ advisoryId }: { advisoryId: number }) => {
  const [advisory, setAdvisory] = useState<Advisory | null>(null);

  useEffect(() => {
    const fetchAdvisory = async () => {
      const data = await AdvisoryService.getAdvisoryById(advisoryId);
      setAdvisory(data);
    };
    fetchAdvisory();
  }, [advisoryId]);

  if (!advisory) {
    return <div>Loading...</div>;
  }

  const severityColorMap = {
    Low: "bg-green-100 text-green-800",
    Moderate: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const severityClass = severityColorMap[advisory.severity as keyof typeof severityColorMap];

  return (
    <Link to={`/advisories/${advisory.id}`}>
      <div className={`p-4 mb-4 border rounded shadow hover:shadow-md transition ${severityClass}`}>
        <h3 className="text-lg font-semibold">{advisory.title}</h3>
        <p className="text-sm">{advisory.message}</p>
        <p className="mt-2 text-xs font-bold">Severity: {advisory.severity}</p>
      </div>
    </Link>
  );
};

export default AdvisoryCard;
