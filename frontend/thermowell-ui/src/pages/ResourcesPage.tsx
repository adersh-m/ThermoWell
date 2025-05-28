import React from 'react';
import { Link } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      type: 'Guides',
      title: 'Heat Safety Handbook',
      description: 'Comprehensive guide on heatwave preparedness and response.',
      action: 'Download PDF'
    },
    {
      type: 'Checklist',
      title: 'Emergency Kit List',
      description: 'Printable checklist for assembling a heat emergency kit.',
      action: 'View List'
    }
  ];

  const externalLinks = [
    {
      title: 'CDC: Extreme Heat',
      description: 'Official CDC guidance on heat safety.',
      icon: '🏥'
    },
    {
      title: 'Red Cross: Heatwave Tips',
      description: 'Red Cross resources for heat emergencies.',
      icon: '🚑'
    },
    {
      title: 'Local Cooling Centers',
      description: 'Find nearby cooling centers during heatwaves.',
      icon: '🏢'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Resources</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Access guides, checklists, and external links to stay prepared for heatwaves.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/advisories" className="btn-primary text-lg font-semibold">View Advisories</Link>
          <Link to="/tips" className="btn-secondary text-lg font-semibold">View Tips</Link>
        </div>
      </section>

      {/* Main Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {resources.map((resource, index) => (
          <div key={index} className="card bg-white shadow p-6">
            <div className="text-secondary text-xs font-semibold mb-1">{resource.type}</div>
            <div className="subheading mb-1">{resource.title}</div>
            <div className="text-gray-600 mb-2">{resource.description}</div>
            <button className="btn-primary w-fit mt-2">{resource.action}</button>
          </div>
        ))}
      </div>

      {/* External Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {externalLinks.map((link, index) => (
          <div key={index} className="card flex flex-col items-center text-center">
            <div className="text-4xl mb-2">{link.icon}</div>
            <div className="subheading mb-1">{link.title}</div>
            <div className="text-primary mb-2">{link.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
