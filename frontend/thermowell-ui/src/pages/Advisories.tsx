import { Link, useParams } from "react-router-dom";
import { mockAdvisories } from "../data/mockAdvisories";

const AdvisoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const advisory = mockAdvisories.find(a => a.id === Number(id));

  if (!advisory) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600">Advisory Not Found</h2>
        <p className="mt-2 text-gray-600">Please check the URL or go back to the dashboard.</p>
      </div>
    );
  }

  const severityStyles = {
    High: "bg-red-100 text-red-800 border-red-300",
    Moderate: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-green-100 text-green-800 border-green-300",
  };

  return (
    <>
      <Link to="/" className="text-blue-600 underline my-6 block">
        ← Back to Dashboard
      </Link><div className={`p-6 border-l-4 ${severityStyles[advisory.severity]} rounded`}>
        <h2 className="text-2xl font-bold mb-2">{advisory.title}</h2>
        <p className="mb-4 text-gray-700">{advisory.message}</p>
        <span className="inline-block px-3 py-1 text-sm font-semibold rounded bg-opacity-75">
          Severity: {advisory.severity}
        </span>
      </div></>
  );
};

export default AdvisoryPage;
