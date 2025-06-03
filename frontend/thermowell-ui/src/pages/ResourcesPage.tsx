import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ResourcesService from '../services/ResourcesService';
import type { Resource, ExternalLink } from '../services/ResourcesService';

const resourceImages: Record<string, string> = {
  'Heatwave': '/images/heatwave-alert.jpg',
  'Hydration': '/images/hydration-tips.jpg',
  'Protection': '/images/heat-protection-tips.jpg',
  'Community': '/images/community-support.jpg',
  'default': '/images/hero-banner.jpg',
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
          src="/images/heat-protection-tips.jpg" 
          alt="ThermoWell Resources Banner" 
          className="w-full h-48 object-cover object-center" 
        />
      </div>
      {/* Accent Bar and Intro */}
      <div className="h-2 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4 mx-auto" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 font-heading">Guides & Resources</h1>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">Download official guides, checklists, and find trusted links to help you prepare for and respond to extreme heat events.</p>

      {/* Section Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSection('all')}
            className={`btn btn-secondary text-sm ${activeSection === 'all' ? 'btn-primary' : ''}`}
          >
            All Resources
          </button>
          <button
            onClick={() => setActiveSection('heatwave')}
            className={`btn btn-secondary text-sm ${activeSection === 'heatwave' ? 'btn-primary' : ''}`}
          >
            Heatwave Info
          </button>
          <button
            onClick={() => setActiveSection('general')}
            className={`btn btn-secondary text-sm ${activeSection === 'general' ? 'btn-primary' : ''}`}
          >
            General Safety
          </button>
        </div>
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-primary"
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
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full text-sm mt-auto" onClick={() => handleResourceAction(resource)} disabled={resource.action === 'Read More' || resource.action === 'Learn More'} title={resource.action === 'Read More' || resource.action === 'Learn More' ? 'Coming soon' : undefined}>
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
                href={link.url}
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
    </div>
  );
};

export default ResourcesPage;
