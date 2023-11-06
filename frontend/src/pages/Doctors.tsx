import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const doctors = [
  {
    id: 1,
    name: 'Dr. Naznin Pervin',
    designation: 'Sr. Dental Surgeon',
    image: '/doctors/dr-naznin.jpg', // Updated image path
    degrees: ['BDS (CMC) PGT MPH (USA)'],
    medicalName: 'Asgar Ali Hospital',
  },
  {
    id: 2,
    name: 'Dr. M. Akhter Hossain',
    designation: 'Sr. Consultant - Chief Cardiac Surgeon',
    image: '/doctors/dr-akhter.webp', // Updated image path
    degrees: ['MBBS (DMC), MS (Cardiovascular & Thoracic Surgery)'],
    medicalName: 'Asgar Ali Hospital',
  },
  // Add more doctor profiles here
];

export default function Doctor() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar/>

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Meet Our Doctors</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
                <img src={doctor.image} alt={doctor.name} className="w-full h-auto rounded-lg" />
                <h2 className="text-xl font-semibold mt-4">{doctor.name}</h2>
                {doctor.designation && (
                    <div className="text-gray-600 font-semibold">{doctor.designation}</div>
                )}
                <div className="mt-2">
                  {doctor.degrees.map((degree, index) => (
                    <div key={index} className="text-gray-600">
                      {degree}
                    </div>
                  ))}
                  <p className="text-gray-600 mt-2">{doctor.medicalName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
