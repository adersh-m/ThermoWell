import React from 'react';

const HelpPage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

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
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help & FAQs</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions and learn how to stay safe during heatwaves.
        </p>
      </section>
      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
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
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="border rounded-lg p-4 flex items-center gap-4">
              <div className="text-3xl bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                {method.icon}
              </div>
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
