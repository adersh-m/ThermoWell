import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResourcesService from '../services/ResourcesService';
import type { Resource, ExternalLink } from '../services/ResourcesService';

const resourceImages: Record<string, string> = {
  'Heatwave': '/images/heat-warning.svg',
  'Hydration': '/images/stay-hydrated.svg',
  'Protection': '/images/heat-protection.svg',
  'Community': '/images/community.svg',
  'default': '/images/hero-banner.svg',
};

const ResourcesPage: React.FC = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('all');
  const [resources, setResources] = useState<Resource[]>([]);
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle section parameter from URL
    const urlParams = new URLSearchParams(location.search);
    const section = urlParams.get('section');
    if (section === 'heat-level' || location.pathname.includes('heatwave')) {
      setActiveSection('heatwave');
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resourcesData, linksData] = await Promise.all([
          ResourcesService.fetchResources(),
          ResourcesService.fetchExternalLinks()
        ]);
        setResources(resourcesData);
        setExternalLinks(linksData);
      } catch (error) {
        console.error('Error fetching resources data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
        <img 
          src="/images/hero-banner.jpg" 
          alt="ThermoWell Resources Banner" 
          className="w-full h-48 object-cover object-center" 
        />
      </div>
      <h2 className="text-2xl font-bold mb-6">Resources</h2>

      {/* Section Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1 rounded text-sm ${activeSection === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            All Resources
          </button>
          <button
            onClick={() => setActiveSection('heatwave')}
            className={`px-3 py-1 rounded text-sm ${activeSection === 'heatwave' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Heatwave Info
          </button>
          <button
            onClick={() => setActiveSection('general')}
            className={`px-3 py-1 rounded text-sm ${activeSection === 'general' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            General Safety
          </button>
        </div>
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64"
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
            filteredResources.map((resource, index) => {
              const imgSrc = resourceImages[resource.category] || resourceImages['default'];
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col">
                  <img src={imgSrc} alt={`${resource.category || 'Resource'} illustration`} className="w-full h-28 object-contain mb-4 bg-gray-50 rounded" loading="lazy" />
                  <div className="text-blue-600 text-xs font-semibold mb-2 uppercase tracking-wide">{resource.type}</div>
                  <h3 className="text-xl font-semibold mb-2 flex-grow">{resource.title}</h3>
                  <div className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{resource.description}</div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full text-sm mt-auto" onClick={() => handleResourceAction(resource)}>
                    {resource.action}
                  </button>
                </div>
              );
            })
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
                className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center hover:bg-blue-50 hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 hover:border-blue-200"
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
                <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
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
