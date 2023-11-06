import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const WelcomePage: React.FC = () => {
  return (
    <>  
        <Navbar />
        <div className="bg-blue-900 text-white h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <img
                src="/platform-icon.jpg" // Replace with the path to your logo image
                alt="platform-icon"
                className="w-16 h-16 mx-auto mb-4"
                />
                <h1 className="text-4xl font-extrabold mb-4">Welcome to MediMatch Medical Support</h1>
                <p className="text-lg mb-8">
                Your trusted partner in healthcare, providing quality medical services.
                </p>
                <a
                href="/signin" // Replace with the link to your sign-in page
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                Get Started
                </a>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default WelcomePage;
