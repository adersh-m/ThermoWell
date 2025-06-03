import React, { useState, useEffect } from 'react';
import HelpService from '../services/HelpService';
import type { FAQ, ContactMethod } from '../services/HelpService';

const contactImages = [
  '/images/heat-protection.svg',
  '/images/community.svg',
  '/images/stay-hydrated.svg',
  '/images/heat-warning.svg',
];

const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [faqsData, contactData] = await Promise.all([
          HelpService.fetchFAQs(),
          HelpService.fetchContactMethods()
        ]);
        setFaqs(faqsData);
        setContactMethods(contactData);
      } catch (error) {
        console.error('Error fetching help data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading help content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero Banner */}
      <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
        <img 
          src="/images/hero-banner.jpg" 
          alt="ThermoWell Help Banner" 
          className="w-full h-40 object-cover object-center" 
        />
      </div>
      <h2 className="text-2xl font-bold mb-6">Help & FAQs</h2>
      
      {/* FAQ Section */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="text-blue-600 font-bold text-xl">{expandedFaq === index ? '-' : '+'}</span>
              </button>
              {expandedFaq === index && (
                <p className="mt-3 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Contact Methods */}
      <section>
        <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
              <img src={contactImages[index % contactImages.length]} alt="Contact method illustration" className="w-14 h-14 object-contain bg-gray-50 rounded-lg border" loading="lazy" />
              <div>
                <p className="font-semibold text-lg">{method.method}</p>
                <p className="text-gray-600">{method.details}</p>
              </div>
            </div>
          ))}
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

export default HelpPage;
