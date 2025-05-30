import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  
  const faqs = [
    {
      question: 'What is a heatwave?',
      answer: 'A heatwave is a period of abnormally hot weather generally lasting more than two days. Heat waves can occur with or without high humidity, and have the potential to cover a large area, exposing a high number of people to hazardous heat.'
    },
    {
      question: 'How do I read the heat index?',
      answer: 'The heat index is what the temperature feels like to the human body when relative humidity is combined with the air temperature. When the body gets too hot, it cools itself by sweating. If the humidity is high, this cooling is reduced, causing the body to feel warmer.'
    },
    {
      question: 'Who is most at risk during a heatwave?',
      answer: 'Those most vulnerable include the elderly, infants and young children, pregnant women, people with chronic medical conditions, and outdoor workers. People without access to air conditioning are also at increased risk.'
    },
    {
      question: 'How can I prepare for extreme heat?',
      answer: 'Stay hydrated, wear lightweight clothing, use air conditioning or fans, limit outdoor activities during peak heat, check on vulnerable neighbors and relatives, never leave children or pets in vehicles, and stay updated on local heat advisories.'
    },
    {
      question: 'What is the difference between a heat advisory and excessive heat warning?',
      answer: 'A heat advisory is issued when conditions are expected to cause significant discomfort but may not be life-threatening if precautions are taken. An excessive heat warning is issued when the heat index values are dangerous for the entire population.'
    }
  ];

  const contactMethods = [
    {
      method: 'Email Support',
      details: 'help@heatwavehealth.org',
      icon: '✉️'
    },
    {
      method: 'Emergency Hotline',
      details: '+1 800-123-4567',
      icon: '📞'
    },
    {
      method: 'Live Chat',
      details: 'Available 24/7',
      icon: '💬'
    }
  ];

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="rounded-2xl shadow-lg bg-white text-gray-800 text-center p-10 mb-12">
        <h1 className="text-5xl font-bold mb-4">Help & FAQs</h1>
        <p className="text-lg font-normal max-w-2xl mx-auto mb-8">
          Find answers to common questions and learn how to stay safe during heatwaves.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <button className="w-full text-left font-medium text-lg text-gray-800 flex justify-between items-center">
                {faq.question}
                <span>{expandedFaq === index ? '-' : '+'}</span>
              </button>
              {expandedFaq === index && <div className="mt-3 text-gray-700 text-sm">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Methods */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Contact Us
        </h2>
        <div className="flex flex-col gap-4">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
              <div className="text-2xl bg-gray-100 rounded w-12 h-12 flex items-center justify-center">{method.icon}</div>
              <div>
                <div className="font-semibold text-base mb-1">{method.method}</div>
                <div className="text-gray-700 text-sm">{method.details}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
