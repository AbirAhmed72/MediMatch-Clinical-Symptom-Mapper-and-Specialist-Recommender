import { TERipple } from "tw-elements-react";
import { useState, ChangeEvent, FormEvent } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Signup(): JSX.Element {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Extract relevant data from the form data
    const { name, email, password } = formData;
    // Prepare the data object to be sent in the request
    const requestData = {
      name,
      email,
      password,
    };
  
    try {
      // Send a POST request to the FastAPI endpoint
      const response = await fetch('http://0.0.0.0/patient_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('User signed up successfully');
        // Save user details in localStorage or sessionStorage
        const responseData = await response.json();
        localStorage.setItem('user', JSON.stringify(responseData));
        // redirect to sign in page
        window.location.href = '/signin';
      } else {
        // Handle errors or display error messages
        console.error('Error signing up:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  


  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <Navbar />

      <div className="flex items-center space-x-4 md:pl-4 md:justify-center md:flex-1 pt-10 pb-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-auto">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="px-4">
                <div className="md:mx-6 md:p-12">
                  <div className="text-center">
                    <img
                      className="mx-auto w-32"
                      src="/platform-icon.jpg"
                      alt="logo"
                    />
                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                      MediMatch
                    </h4>
                  </div>

                  <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                    <p className="mb-4 text-base">Create a new account</p>

                    <div className="mb-4 flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-sm text-neutral-800 dark:text-neutral-200"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500"
                        placeholder="Enter your name"
                        autoComplete="off"
                      />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label
                        htmlFor="gender"
                        className="text-sm text-neutral-800 dark:text-neutral-200"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500"
                      >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label
                        htmlFor="dateOfBirth"
                        className="text-sm text-neutral-800 dark:text-neutral-200"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500"
                      />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-sm text-neutral-800 dark:text-neutral-200"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500"
                        placeholder="Enter your email"
                        autoComplete="off"
                      />
                    </div>

                    <div className="mb-4 flex flex-col">
                      <label
                        htmlFor="password"
                        className="text-sm text-neutral-800 dark:text-neutral-200"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500"
                        placeholder="Enter your password"
                        autoComplete="off"
                      />
                    </div>

                    <div className="mb-12 pb-1 pt-1 text-center">
                      <TERipple
                        rippleColor="light"
                        className="w-full"
                      >
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Sign Up
                        </button>
                      </TERipple>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}
