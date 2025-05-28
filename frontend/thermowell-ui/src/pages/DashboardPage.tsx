import React, { useEffect, useState } from "react";
import AdvisoryCard from "../components/AdvisoryCard";
import { AdvisoryService } from "../services/AdvisoryService";
import { DashboardService } from "../services/DashboardService";
import { Link, useNavigate } from "react-router-dom";
import type { Advisory } from "../data/mockAdvisories";

const DashboardPage: React.FC = () => {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AdvisoryService.fetchAdvisories().then((data: Advisory[]) => {
      setAdvisories(data);
      setLoading(false);
    });
  }, []);

  const statusCards = DashboardService.fetchStatusCards();
  const vulnerableGroups = DashboardService.fetchVulnerableGroups();
  const resources = DashboardService.fetchResources();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section className="text-center py-6">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 text-base">
          Insights into heatwave advisories and personalized recommendations.
        </p>
      </section>

      <section>
        <h1 className="section-title text-center mb-10">Current Heatwave Status</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statusCards.map((card, index) => (
            <div
              key={index}
              className="card items-center text-center bg-white shadow p-6"
              style={{ minHeight: "320px", justifyContent: "center" }}
            >
              <div className="text-5xl mb-4 text-gray-800">{card.icon}</div>
              <div className="font-bold text-2xl mb-2 text-gray-900">{card.title}</div>
              <div className="text-gray-600 text-base whitespace-pre-line mb-6">
                {card.subtitle}
              </div>
              <button
                className="btn-primary mt-auto"
                style={{ minWidth: "120px", minHeight: "48px" }}
                onClick={() => {
                  if (card.label === "Heat Level") navigate("/health-score");
                  else if (card.label === "Advisory") navigate("/advisories");
                  else if (card.label === "Alerts") navigate("/advisories");
                }}
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title text-center mb-6">Vulnerable Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vulnerableGroups.map((group, index) => (
            <div
              key={index}
              className="card flex flex-col items-center text-center bg-white shadow p-6"
            >
              <div className="text-3xl mb-2 text-gray-800">{group.icon}</div>
              <div className="font-semibold text-lg mb-1 text-gray-900">{group.title}</div>
              <div className="text-gray-600 text-sm text-center mb-2">
                {group.description}
              </div>
              <button
                className="btn-secondary mt-auto"
                onClick={() => navigate(`/tips?group=${group.label}`)}
              >
                Advice
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title text-center mb-6">Heatwave Map</h2>
        <div className="card text-gray-400 text-lg h-64 flex items-center justify-center bg-white shadow">
          Interactive Heatwave Map will be displayed here
        </div>
      </section>

      <section>
        <h2 className="section-title text-center mb-6">Educational Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="card flex flex-col items-center text-center bg-white shadow p-6"
            >
              <div className="text-2xl mb-2 text-gray-800">{resource.icon}</div>
              <div className="font-semibold text-lg mb-1 text-gray-900">{resource.title}</div>
              <div className="text-gray-600 text-sm text-center mb-2">
                {resource.description}
              </div>
              <button
                className="btn-secondary mt-auto"
                onClick={() => {
                  if (resource.label === "What is a Heatwave?") navigate("/resources");
                  else if (resource.label === "Prevention") navigate("/tips");
                }}
              >
                {resource.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title text-center mb-6">Latest Advisories</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading advisories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisories.map((adv: Advisory) => (
              <AdvisoryCard key={adv.id} advisoryId={adv.id} />
            ))}
          </div>
        )}
        <div className="text-right mt-4">
          <Link
            to="/advisories"
            className="link-primary inline-flex items-center gap-2 text-lg"
          >
            View All Advisories <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
