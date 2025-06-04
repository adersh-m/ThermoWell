import { AdvisoryService } from "../services/AdvisoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Advisory } from "../services/AdvisoryService";

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

  const severityConfig = {
    Low: {
      bg: "bg-white border-l-4 border-heat-safe",
      badge: "bg-heat-safe text-white",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-heat-safe" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    },
    Moderate: {
      bg: "bg-white border-l-4 border-heat-caution",
      badge: "bg-heat-caution text-gray-900",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-heat-caution" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    High: {
      bg: "bg-white border-l-4 border-heat-danger",
      badge: "bg-heat-danger text-white",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-heat-danger" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
  };

  const severityInfo = severityConfig[advisory.severity as keyof typeof severityConfig];

  return (
    <Link to={`/advisories/${advisory.id}`} className="block">
      <div className={`p-6 mb-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${severityInfo.bg} card`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`badge ${severityInfo.badge} flex items-center gap-1.5 px-3 py-1`}>
            {severityInfo.icon} {advisory.severity}
          </span>
        </div>
        <h3 className="subheading mb-2">{advisory.title}</h3>
        <p className="text-primary mb-4 line-clamp-2">{advisory.message}</p>
        <div className="mt-4 flex justify-end">
          <span className="text-primary-600 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
            View Details <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AdvisoryCard;
