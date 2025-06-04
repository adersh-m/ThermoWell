import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import Button from '../components/Button';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Simulate form submission
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted successfully:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Unable to submit your message. Please try again later.');
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Accent Bar and Intro */}
      <div className="h-2 w-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4 mx-auto" />
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 font-heading">Contact ThermoWell</h1>
      <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
        Reach out to our team for support, partnership, or media inquiries. We’re here to help you stay safe and informed during extreme heat events.
      </p>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
            <p className="text-gray-700 mb-6">
              Have questions about ThermoWell or need assistance? Our team is here to help.
              Fill out the form or reach us through one of our contact channels.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-blue-600 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-600">support@thermowell.org</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-blue-600 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-gray-600">+1 (800) HEAT-HELP</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-blue-600 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Address</div>
                  <div className="text-gray-600">
                    123 Climate Way<br />
                    San Francisco, CA 94110
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">Hours of Operation</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="font-medium">Monday - Friday:</div>
                <div>8:00 AM - 8:00 PM ET</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="font-medium">Saturday:</div>
                <div>9:00 AM - 5:00 PM ET</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="font-medium">Sunday:</div>
                <div>Closed</div>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                <p>* During extreme heat events, our support hours are extended to 24/7.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your message has been received. We'll get back to you as soon as possible.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="primary"
                className="w-full"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block caption mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-primary"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block caption mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-primary"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block caption mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnership Opportunity">Partnership Opportunity</option>
                  <option value="Media Inquiry">Media Inquiry</option>
                  <option value="Emergency Assistance">Emergency Assistance</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block caption mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-primary"
                />
              </div>
              {error && (
                <div className="text-red-500 caption py-2">
                  {error}
                </div>
              )}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full py-3 px-4"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  if (isAuthenticated) {
    return <Layout hideTopBar>{content}</Layout>;
  }
  return content;
};

export default ContactPage;
