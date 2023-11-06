import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyan-950 text-white p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">MediMatch Medical Support</h2>
            <p className="text-sm">
              Your trusted partner in healthcare.
            </p>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Doctors</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <address className="mt-2 not-italic">
              123 Medical Drive<br />
              Dhaka, Bangladesh<br />
              Phone: (+880) 456-7890<br />
              Email: info@medimatch.com
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-800 mt-6 pt-4">
        <div className="container mx-auto text-sm flex flex-col md:flex-row items-center justify-between">
          <p>&copy; {new Date().getFullYear()} MediMatch Medical Support. All rights reserved.</p>
          <div className="mt-2 md:mt-0">
            <a href="#" className="mx-2">Terms of Service</a>
            <a href="#" className="mx-2">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
