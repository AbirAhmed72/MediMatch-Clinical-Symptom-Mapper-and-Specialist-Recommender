import { TERipple } from "tw-elements-react";
import { useState, ChangeEvent, FormEvent } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function Signin(): JSX.Element {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { username, password } = formData;

    // Set up the request body parameters
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'password');
    requestBody.append('username', username);
    requestBody.append('password', password);
    requestBody.append('scope', 'your_scope'); // Replace 'your_scope' with the actual scope
    requestBody.append('client_id', 'your_client_id'); // Replace 'your_client_id' with the actual client ID
    requestBody.append('client_secret', 'your_client_secret'); // Replace 'your_client_secret' with the actual client secret

    try {
      // Send a POST request to the FastAPI token endpoint
      const response = await fetch('http://0.0.0.0/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody.toString(),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Save user details in localStorage or sessionStorage
        localStorage.setItem('session', JSON.stringify(responseData));
        console.log('User logged in successfully', localStorage.session);

        // redirect to home page
        window.location.href = '/home';
      } else {
        console.error('Error logging in:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };


  const handleRegisterButtonClick = () => {
    window.location.href = '/signup';
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <Navbar/>

      <div className="flex items-center space-x-4 md:pl-4 md:justify-center md:flex-1 pt-10 pb-10">
        <div className="flex items-center space-x-4 md:pl-4 md:justify-center md:flex-1 text-neutral-800 dark:text-neutral-200">
          <div className="w-auto">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="px-4">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
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

                    {/* <!--Login Form--> */}
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
                      <p className="mb-4 text-base">Please log in to your account</p>

                      <div className="mb-4">
                        <label htmlFor="username" className="block text-sm text-neutral-800 dark:text-neutral-200">
                          Email
                        </label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500 w-full"
                          placeholder="Enter your email"
                          autoComplete="off"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="block text-sm text-neutral-800 dark:text-neutral-200">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-danger-500 w-full"
                          placeholder="Enter your password"
                          autoComplete="off"
                        />
                      </div>

                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit" // Change the type to "submit" to trigger the onSubmit function
                            style={{
                              background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                        </TERipple>
                        <a href="#!">Forgot password?</a>
                      </div>

                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                          <button
                            type="button"
                            className="inline-block rounded-lg border-2  px-6 py-2 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out bg-gradient-to-r from-blue-300 to-blue-500 hover:border-blue-600 hover:bg-opacity-75 hover:text-blue-600 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:border-blue-700 active:text-blue-700 dark:hover:bg-opacity-75"
                            onClick={handleRegisterButtonClick}
                          >
                            Register
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

      <Footer/>
    </section>
  );
}
