// src/pages/HelpPage.tsx
import React from 'react';
import PageHeader from '../components/layout/PageHeader';

const faqs = [
  {
    question: 'What is ThermoWell?',
    answer: 'ThermoWell is a community-based platform for heat safety. It provides real-time alerts, personalized health scores, and resources during extreme heat events.',
  },
  {
    question: 'How do I get alerts?',
    answer: 'Enable notifications in the Settings page. You can receive alerts by email or SMS when heat advisories are active in your area.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes. We only use your information to personalize recommendations and do not share it with third parties.',
  },
];

const HelpPage: React.FC = () => (
  <>
    <PageHeader title="Help & Support" subtitle="Frequently Asked Questions" />
    <div className="max-w-3xl mx-auto space-y-6">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="font-semibold text-gray-900 dark:text-white">{faq.question}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{faq.answer}</p>
        </div>
      ))}
    </div>
  </>
);

export default HelpPage;
