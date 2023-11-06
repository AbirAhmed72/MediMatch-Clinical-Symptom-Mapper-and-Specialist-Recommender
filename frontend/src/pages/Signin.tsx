import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Footer from '../components/Footer';

interface FormData {
  email: string;
  password: string;
}

export default function  Signin(){
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignin = async () => {
    // try {
    //   console.log(formData);
    //   // Make a POST request to your backend API
    //   const response = await axios.post('http://localhost/user/signin', formData);

    //   // Save the JWT token in localStorage
    //   localStorage.setItem('token', response.data.token);

    //   // Convert user data to JSON string and save in localStorage
    //   localStorage.setItem('username', response.data.user.name);
    //   localStorage.setItem('email', response.data.user.email);

    //   // Handle the response as needed (e.g., show success message or redirect to home page)
    //   console.log('Signin successful!', response.data);

    //   // Show the modal for sign-in success
    //   setIsModalOpen(true);

    //   // Redirect to the home page (you should replace '/home' with the actual URL of your home page)
    //   window.location.href = '/Home';
    // } catch (error) {
    //   // Handle errors (e.g., display error message)
    //   console.error('Signin failed:', error);
    // }
  };

  return (
    <>
      <div className="bg-gray-200 md:container h-screen w-screen">
        <div className="container mx-auto">
          <img src="/platform-icon.jpg" alt="platform-logo" height={500} width={150} />
        </div>

        <div className="bg-white shadow-md rounded-md mx-auto p-8 w-96">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-700">Sign in to MediMatch</h1>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email address"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignin}
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>

          <div className="mt-8">
            <p className="text-gray-700">
              Don't have an account?{' '}
              <a className="font-bold text-blue-500 hover:text-blue-700" href="/Signup">
                Sign up now
              </a>
            </p>
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            overlayClassName="fixed inset-0 flex items-center justify-center modal-overlay"
            className="modal-content p-4 rounded bg-green-500 text-white font-bold max-w-sm mx-auto"
            contentLabel="Signup Success Modal"
          >
            <div>Signin successful!</div>
          </Modal>
        </div>
      </div>

      <Footer/>
    </>
   
  );
};


