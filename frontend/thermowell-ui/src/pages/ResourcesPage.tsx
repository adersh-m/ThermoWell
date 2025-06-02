import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('all');

  useEffect(() => {
    // Handle section parameter from URL
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section');
    if (section === 'heat-level' || location.pathname.includes('heatwave')) {
      setActiveSection('heatwave');
    }
  }, [location]);

  const resources = [
    {
      type: 'Guides',
      title: 'Heat Safety Handbook',
      description: 'Comprehensive guide on heatwave preparedness and response.',
      action: 'Download PDF',
      category: 'general'
    },
    {
      type: 'Checklist',
      title: 'Emergency Kit List',
      description: 'Printable checklist for assembling a heat emergency kit.',
      action: 'View List',
      category: 'general'
    },
    {
      type: 'Guide',
      title: 'Understanding Heatwave Risks',
      description: 'Learn how heatwaves impact health and safety, and what makes them dangerous.',
      action: 'Read More',
      category: 'heatwave'
    },
    {
      type: 'Information',
      title: 'Heat Index Explained',
      description: 'Understand the heat index and how it affects your body.',
      action: 'Learn More',
      category: 'heatwave'
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

  const [search, setSearch] = useState('');

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesSection = activeSection === 'all' || r.category === activeSection;
    return matchesSearch && matchesSection;
  });
  const filteredLinks = externalLinks.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  // Helper for resource actions
  const handleResourceAction = (resource: typeof resources[0]) => {
    if (resource.action === 'Download PDF') {
      // Simulate PDF download
      const blob = new Blob(['PDF content for ' + resource.title], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resource.title.replace(/\s+/g, '_')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (resource.action === 'View List') {
      window.location.href = '/resources/emergency-kit-list';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {      /* Hero Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">
          {activeSection === 'heatwave' ? 'Heatwave Resources' : 'Resources'}
        </h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          {activeSection === 'heatwave' 
            ? 'Learn about heatwave risks, safety measures, and how to protect yourself and your community.'
            : 'Access guides, checklists, and external links to stay prepared for heatwaves.'
          }
        </p>
      </section>

      {/* Section Filter */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection('all')}
            className={activeSection === 'all' ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
          >
            All Resources
          </button>
          <button
            onClick={() => setActiveSection('heatwave')}
            className={activeSection === 'heatwave' ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
          >
            Heatwave Info
          </button>
          <button
            onClick={() => setActiveSection('general')}
            className={activeSection === 'general' ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
          >
            General Safety
          </button>
        </div>
        {/* Search/Filter */}
        <input
          type="text"
          className="input-primary w-full sm:w-80 border rounded px-3 py-2 text-sm"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Main Resources */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {activeSection === 'heatwave' ? 'Heatwave Information' : 
           activeSection === 'general' ? 'Safety Guides & Checklists' : 
           'Guides & Checklists'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">No resources found.</div>
          ) : (
            filteredResources.map((resource, index) => (
              <div key={index} className="card bg-white shadow p-6 flex flex-col">
                <div className="text-secondary text-xs font-semibold mb-2 uppercase tracking-wide text-blue-600">{resource.type}</div>
                <div className="subheading mb-2 flex-grow">{resource.title}</div>
                <div className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{resource.description}</div>
                <button className="btn-primary w-full text-sm mt-auto" onClick={() => handleResourceAction(resource)}>
                  {resource.action}
                </button>
              </div>
            ))
          )}
        </div>
      </section>
      {/* External Links */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">External Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredLinks.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">No external links found.</div>
          ) : (
            filteredLinks.map((link, index) => (
              <a
                key={index}
                className="card bg-white shadow p-6 flex flex-col items-center text-center hover:bg-blue-50 hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200"
                href={
                  link.title.includes('CDC')
                    ? 'https://www.cdc.gov/disasters/extremeheat/index.html'
                    : link.title.includes('Red Cross')
                    ? 'https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/heat-wave-safety.html'
                    : 'https://www.google.com/maps/search/cooling+centers+near+me/'
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-4xl mb-3">{link.icon}</div>
                <div className="subheading mb-2">{link.title}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{link.description}</div>
              </a>
            ))
          )}
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 flex items-center">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
          AM
        </div>
        <div>
          <div className="font-semibold text-gray-900">Alex Morgan</div>
          <div className="text-gray-600 text-sm">Health Advisor</div>
        </div>
      </footer>
    </div>
  );
};

export default ResourcesPage;
