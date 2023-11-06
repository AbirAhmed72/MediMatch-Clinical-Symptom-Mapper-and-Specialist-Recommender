import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

interface FormData {
  name: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}

export default function Signup(){
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    gender: '',
    dateOfBirth: '',
  });

  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };


  const handleSignup = async () => {
    // try {
    //   // Make a POST request to your Express.js backend
    //   const response = await axios.post('http://localhost/user/signup', formData, {
    //     headers: {
    //       'Content-Type': 'application/json', // Set the content type to JSON
    //     },
    //   });
    //   // Handle the response as needed (e.g., show success modal or redirect to another page)
    //   console.log('Signup successful!', response.data);
    //   setSignupSuccess(true); // Set signupSuccess state to true
    //   setIsModalOpen(true); // Open the success modal
    //   setTimeout(() => {
    //     setIsModalOpen(false); // Close the modal after 3 seconds (adjust as needed)
    //     // Navigate back to the signin page
    //     window.location.href = '/Signin';
    //   }, 3000); // Adjust the delay (in milliseconds) as needed
    // } catch (error) {
    //   // Handle errors (e.g., display error message)
    //   console.error('Signup failed:', error);
    // }
  };


  return (
    <div className="bg-gray-200 md:container h-auto w-screen">
      <div className="container mx-auto">
        <img src="/platform-icon.jpg" alt="platform-logo" height={500} width={150} />
      </div>

      <div className="bg-white shadow-md rounded-md mx-auto p-8 w-96">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-700">Sign up to MediMatch</h1>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange} // Update the 'name' field in formData on input change
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gender"
            value={formData.gender}
            onChange={handleGenderChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange} // Update the 'dateOfBirth' field in formData on input change
          />
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
            value={formData.email}
            onChange={handleInputChange} // Update the 'email' field in formData on input change
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
            value={formData.password}
            onChange={handleInputChange} // Update the 'password' field in formData on input change
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignup} // Call handleSignup when the button is clicked
          >
            Sign up
          </button>
        </div>

        {/* Show the success modal when signup is successful */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)} // Close the modal if the user clicks outside it
          overlayClassName="fixed inset-0 flex items-center justify-center modal-overlay"
          className="modal-content p-4 rounded bg-green-500 text-white font-bold max-w-sm mx-auto"
          contentLabel="Signup Success Modal"
        >
          <div>Signup successful!</div>
        </Modal>
      </div>
    </div>
  );
};


