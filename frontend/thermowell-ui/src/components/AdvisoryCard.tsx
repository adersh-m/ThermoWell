import type { Advisory } from "../data/mockAdvisories";
import { Link } from "react-router-dom";

type Props = {
  advisory: Advisory;
};

const severityColorMap = {
  Low: "bg-green-100 text-green-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  High: "bg-red-100 text-red-800",
};

const AdvisoryCard = ({ advisory }: Props) => {
  const severityClass = severityColorMap[advisory.severity];

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
