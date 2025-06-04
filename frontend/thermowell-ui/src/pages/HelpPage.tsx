import React, { useState, useEffect } from 'react';
import HelpService from '../services/HelpService';
import type { FAQ, ContactMethod } from '../services/HelpService';
import Button from '../components/Button';

const contactImages = [
  '/images/heat-protection-tips.jpg',
  '/images/community-support.jpg',
  '/images/hydration-tips.jpg',
  '/images/heatwave-alert.jpg',
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
          src="/images/community-support.jpg" 
          alt="ThermoWell Help Banner" 
          className="w-full h-40 object-cover object-center" 
        />
      </div>
      {/* Accent Bar and Intro */}
      <div className="h-2 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4 mx-auto" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 font-heading">Help & Support</h1>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">Find answers to common questions or contact our team for personalized support during heatwaves and emergencies.</p>
      {/* FAQ Section */}
      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Button
                variant="secondary"
                className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="text-blue-600 font-bold text-xl">{expandedFaq === index ? '-' : '+'}</span>
              </Button>
              {expandedFaq === index && (
                <div className="mt-3 text-gray-700">
                  {faq.answer}
                  {/* Example: link to more info if available */}
                  <a href="/help/article/faq" className="link-primary ml-2 text-sm" style={{display:'inline'}}>Learn more</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      {/* Contact Methods */}
      <section>
        <h3 className="subheading mb-6">Contact Us</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => {
            let actionProps = {};
            if (method.method.toLowerCase().includes('email')) {
              actionProps = { href: `mailto:${method.details}`, className: "link-primary block" };
            } else if (method.method.toLowerCase().includes('hotline') || method.method.toLowerCase().includes('phone')) {
              actionProps = { href: `tel:${method.details.replace(/[^+\d]/g, '')}`, className: "link-primary block" };
            } else if (method.method.toLowerCase().includes('chat')) {
              actionProps = { href: '#live-chat', className: "link-primary block" };
            }
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-4">
                <img src={contactImages[index % contactImages.length]} alt="Contact method illustration" className="w-14 h-14 object-contain bg-gray-50 rounded-lg border" loading="lazy" />
                <div>
                  <p className="subheading">{method.method}</p>
                  {Object.keys(actionProps).length > 0 ? (
                    <a {...actionProps}>{method.details}</a>
                  ) : (
                    <p className="text-gray-600">{method.details}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
