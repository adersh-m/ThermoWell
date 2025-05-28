import React from 'react';

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
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Heatwave Resources
      </h1>

      {/* Main Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="text-heat text-xs font-semibold mb-1">{resource.type}</div>
            <div className="font-semibold text-lg mb-1">{resource.title}</div>
            <div className="text-gray-700 text-sm mb-2">{resource.description}</div>
            <button className="btn-primary w-fit mt-2">{resource.action}</button>
          </div>
        ))}
      </div>

      {/* External Links */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          External Links
        </h2>
        <div className="flex flex-col gap-4">
          {externalLinks.map((link, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <div className="text-2xl bg-gray-100 rounded w-12 h-12 flex items-center justify-center">{link.icon}</div>
              <div>
                <div className="font-semibold text-base mb-1">{link.title}</div>
                <div className="text-gray-700 text-sm">{link.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
