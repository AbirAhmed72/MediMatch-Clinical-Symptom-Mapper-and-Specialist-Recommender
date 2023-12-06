import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface DiseaseResponse {
  perceived_symptoms: string[];
  required_doctor: string;
  predicted_disease: string;
}

export default function Home() {
  const [showMedicalInfo, setShowMedicalInfo] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [medicalDiseases, setMedicalDiseases] = useState("");
  const [required_doctor, setRequiredDoctor] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleMedicalInfo = async () => {
    setShowSpinner(true);

    try {
      // Step 1: Make a GET request to get symptoms
      const symptomsResponse = await axios.get(
        `http://127.0.0.1:8000/get_symptoms/?patients_data=${encodeURIComponent(
          inputValue
        )}`
      );

      const perceivedSymptoms = symptomsResponse.data;

      const diseasesResponse = await axios.post<DiseaseResponse>(
        "http://127.0.0.1:8000/check_disease/",
        {
          perceived_symptoms: perceivedSymptoms,
        }
      );

      const predicted_disease = diseasesResponse.data.predicted_disease;
      const required_doctor = diseasesResponse.data.required_doctor;

      setMedicalDiseases(predicted_disease);
      setRequiredDoctor(required_doctor);

      console.log("Symptoms: ", symptomsResponse.data);

      setTimeout(() => {
        setShowSpinner(false);
        setShowMedicalInfo(true);
      }, 2000);
    } catch (error) {
      console.error("Error fetching medical information:", error);
      setShowSpinner(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Welcome to MediMatch
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Enter your health symptoms below to get information about your
              medical problems and find relevant medical doctors in your area.
            </p>

            <form className="mt-8">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:ring focus:ring-blue-400"
                placeholder="Enter your health problems..."
              />
              <button
                type="button"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleMedicalInfo}
              >
                Get Medical Information
              </button>
            </form>

            <p className="mt-6 text-base text-gray-500">
              Find answers and medical experts to help you with your health
              concerns.
            </p>

            <div className="items-center">
              {showSpinner && (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-opacity-50"></div>
                </div>
              )}
            </div>

            {showMedicalInfo && (
              <div className="mt-8 bg-white p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                  Your Possible Medical Diseases
                </h2>
                <ul className="mt-2">
                  <li key="1" className="text-gray-700 font-semibold ml-4">
                    {medicalDiseases}
                  </li>
                </ul>
                <Link to={`/doctors/${medicalDiseases}`}>
                  <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300 ease-in-out transform hover:scale-105">
                    Find Doctors Relevant to Your Diseases
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
