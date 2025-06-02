import { useEffect, useRef } from 'react';

export default function OnboardingModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-8 max-w-lg mx-4 shadow-2xl transform animate-slideIn relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        aria-describedby="onboarding-description"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close welcome modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 id="onboarding-title" className="text-2xl font-bold text-gray-900 mb-3">
            Welcome to ThermoWell! 🌡️
          </h2>
          <p id="onboarding-description" className="text-gray-600 mb-6 leading-relaxed">
            Your comprehensive heatwave companion. Get real-time heat advisories, personalized safety tips, 
            and access essential resources to stay cool and protected during extreme weather.
          </p>

          {/* Features list */}
          <div className="text-left mb-8 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Real-time heat level monitoring</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Personalized safety recommendations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Emergency resources and contacts</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="btn-primary flex-1 transform hover:scale-105 transition-transform duration-200"
              onClick={onClose}
            >
              Get Started
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 text-sm"
              onClick={onClose}
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}