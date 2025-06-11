// src/pages/AboutPage.tsx
import React from 'react';
import PageHeader from '../components/layout/PageHeader';

const AboutPage: React.FC = () => (
  <>
    <PageHeader title="About ThermoWell" subtitle="Protecting communities through innovation" />

    <div className="max-w-3xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
      <p>
        ThermoWell was created by a dedicated team of public health professionals, technologists,
        and community organizers. Our goal is to reduce the risks and impacts of extreme heat events through better information and timely support.
      </p>
      <p>
        By combining live weather data, community feedback, and health assessments, ThermoWell empowers users to make safer choices during heatwaves.
      </p>
      <p>
        This project is open-source and supported by local partnerships. We welcome your feedback to continue improving.
      </p>
    </div>
  </>
);

export default AboutPage;
