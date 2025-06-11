import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => (
  <>
    <PageHeader
      title="Welcome to ThermoWell"
      subtitle="Protecting communities through advanced heat monitoring and health services"
    />

    <section className="relative bg-blue-600 text-white rounded-xl overflow-hidden mb-12">
      <div className="mx-auto px-6 py-16 md:flex md:items-center md:justify-between max-w-7xl">
        {/* Text */}
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Stay ahead of the heatwave
          </h2>
          <p className="mb-6 text-lg">
            Real-time advisories, personalized health scores, and community resources—all in one place.
          </p>
          <Link
            to="/advisories"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          >
            View Advisories
          </Link>
        </div>

        {/* Placeholder graphic */}
        <div className="hidden md:block md:w-1/2">
          <div className="w-full h-64 bg-blue-500 rounded-lg" />
        </div>
      </div>
    </section>

    <section className="mx-auto px-6 grid gap-8 md:grid-cols-3 max-w-7xl">
      {[
        {
          title: 'Live Heat Index',
          desc: 'Monitor current temperatures and humidity in your area.'
        },
        {
          title: 'Personal Health Score',
          desc: 'Get a risk assessment tailored to you and your family.'
        },
        {
          title: 'Community Resources',
          desc: 'Find cooling centers, emergency guides, and safety tips.'
        }
      ].map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{card.desc}</p>
        </div>
      ))}
    </section>
  </>
);

export default HomePage;
