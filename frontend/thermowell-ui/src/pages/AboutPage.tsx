import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const aboutImages = [
  '/images/heatwave-alert.jpg',
  '/images/hydration-tips.jpg',
  '/images/heat-protection-tips.jpg',
];
const partnerImages = [
  '/images/community-support.jpg',
  '/images/heatwave-alert.jpg',
  '/images/heat-protection-tips.jpg',
  '/images/hydration-tips.jpg',
];

const AboutPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const content = (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-lg animate-fadeIn">
        <img 
          src="/images/health-score-banner.jpg" 
          alt="About ThermoWell Banner" 
          className="w-full h-40 object-cover object-center" 
        />
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">About ThermoWell</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          ThermoWell is dedicated to protecting communities during extreme heat events by providing 
          real-time information, personalized safety recommendations, and critical resources when they matter most.
        </p>
        <p className="text-gray-700 mb-4">
          Our mission is to reduce heat-related illnesses and fatalities through education, 
          early warning systems, and accessible safety guidance for all community members, 
          especially those most vulnerable to heat stress.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2024 by a team of public health experts, meteorologists, and technologists, 
          ThermoWell emerged from a shared concern about the increasing frequency and severity of 
          heatwaves due to climate change.
        </p>
        <p className="text-gray-700 mb-4">
          Our diverse team combines expertise in heat-health science, emergency management, 
          user experience design, and software development to create an application that 
          makes life-saving information accessible to everyone.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">How ThermoWell Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src={aboutImages[0]} alt="Real-Time Data" className="w-16 h-16 object-contain mb-3" loading="lazy" />
            <div className="text-blue-600 text-3xl font-bold mb-2">1</div>
            <h3 className="text-xl font-medium mb-2">Real-Time Data</h3>
            <p className="text-gray-600">
              We aggregate data from multiple meteorological sources and heat monitoring 
              stations to provide accurate, up-to-date heat information.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src={aboutImages[1]} alt="Personalized Risk Assessment" className="w-16 h-16 object-contain mb-3" loading="lazy" />
            <div className="text-blue-600 text-3xl font-bold mb-2">2</div>
            <h3 className="text-xl font-medium mb-2">Personalized Risk Assessment</h3>
            <p className="text-gray-600">
              Our proprietary algorithm analyzes individual risk factors to generate 
              personalized heat vulnerability scores and safety recommendations.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <img src={aboutImages[2]} alt="Actionable Guidance" className="w-16 h-16 object-contain mb-3" loading="lazy" />
            <div className="text-blue-600 text-3xl font-bold mb-2">3</div>
            <h3 className="text-xl font-medium mb-2">Actionable Guidance</h3>
            <p className="text-gray-600">
              We translate complex heat health science into clear, practical steps 
              that help users stay safe during extreme heat events.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
        <p className="text-gray-700 mb-4">
          ThermoWell collaborates with leading public health organizations, meteorological 
          services, and emergency management agencies to ensure our information is accurate, 
          timely, and aligned with official guidance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {partnerImages.map((img) => (
            <div key={img} className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-24">
              <img src={img} alt="Partner logo/illustration" className="h-16 object-contain" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Join Our Effort</h2>
        <p className="text-gray-700 mb-4">
          We believe that everyone has the right to access life-saving heat safety information. 
          By creating an account with ThermoWell, you'll receive personalized heat alerts, 
          safety recommendations, and resources tailored to your specific needs.
        </p>
        <div className="mt-6">
          <a 
            href="/login" 
            className="btn btn-primary inline-block font-medium py-3 px-6"
          >
            Sign Up Today
          </a>
        </div>
      </section>
    </div>
  );
  if (isAuthenticated) {
    return <Layout hideTopBar>{content}</Layout>;
  }
  return content;
};

export default AboutPage;
