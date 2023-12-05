import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Import your service images
import diseaseImage from '/services/1.webp';
import doctorImage from '/services/2.png';
import healthcareImage from '/services/3.webp';

export default function Services() {
  const services = [
    {
      title: 'Disease Detection with Machine Learning',
      description: 'Our advanced machine learning algorithms help identify potential diseases based on user-provided symptoms.',
      image: diseaseImage,
    },
    {
      title: 'Doctor Consultation Services',
      description: 'Access a network of experienced doctors for consultations, ensuring prompt and convenient healthcare services.',
      image: doctorImage,
    },
    {
      title: 'Healthcare Information and Recommendations',
      description: 'Receive personalized health information and recommendations to empower you in making informed decisions about your well-being.',
      image: healthcareImage,
    },
    // Add more services as needed
  ];

  return (
    <div>
      <Navbar />

      <div className="services-container p-8">
        <h1 className="text-3xl text-center font-bold mb-8 text-blue-600">Our Services</h1>
        <p className="text-center font-semibold mb-8">---------</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img className="w-full h-72 object-center" src={service.image} alt={service.title} />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
                <p className="text-gray-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
