import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface DoctorData {
  id: any;
  name: string;
  designation: string;
  image: string;
  degrees: string;
  medicalName: string;
}

export default function Doctor() {
  const { valueParam } = useParams();
  const [required_doctors, setDoctors] = useState<DoctorData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");

  const uniqueDesignations = new Set(
    required_doctors.map((doctor) => doctor.designation)
  );

  useEffect(() => {
    fetchData();
  }, [valueParam]);

  useEffect(() => {
    handleSearch(); // Trigger search when searchTerm changes
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const doctorInfoResponse = await axios.get(
        `http://127.0.0.1:8000/get_doctors_details?disease=${valueParam}`
      );

      const data = doctorInfoResponse.data.doctors;
      console.log(data);

      const formattedData: DoctorData[] = data.map(
        (doctorData: any[], index: number) => ({
          id: index + 1,
          name: doctorData[1],
          designation: "Specialities - " + doctorData[3],
          image: "/doctor_images/" + doctorData[0].split("-")[1] + ".png",
          degrees: doctorData[2],
          medicalName: doctorData[4],
        })
      );

      setDoctors(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDesignation(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      if (searchTerm === "" && selectedDesignation === "") {
        // If both search term and selected designation are empty, show all doctors
        fetchData();
      } else {
        // Filter doctors based on search term and selected designation
        let filteredDoctors = required_doctors;

        if (searchTerm !== "") {
          filteredDoctors = filteredDoctors.filter((doctor) =>
            doctor.medicalName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (selectedDesignation !== "") {
          filteredDoctors = filteredDoctors.filter(
            (doctor) => doctor.designation === selectedDesignation
          );
        }

        setDoctors(filteredDoctors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl max-h mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-blue-900">
            Suggested Doctors
          </h1>

          {/* Add a filter input and button */}
          <div className="my-4 flex items-center justify-center p-5">
            <label className="text-xl mr-2 text-gray-700 font-bold">
              Search by Location:
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 pl-8 focus:outline-none focus:border-blue-500 rounded-md shadow-md"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M21 21l-6-6M3 21l6-6M9 3l-6 6M21 3l-6 6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Add the dropdown list */}
          <div className="my-4 flex items-center justify-center p-5">
            <label className="text-xl mr-2 text-gray-700 font-bold">
              Filter by Designation:
            </label>
            <select
              value={selectedDesignation}
              onChange={handleDropdownChange}
              className="border p-2 focus:outline-none focus:border-blue-500 rounded-md shadow-md"
            >
              <option value="">Select Designation</option>
              {[...uniqueDesignations].map((designation, index) => (
                <option key={index} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="ml-2 px-4 py-2 transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Search
          </button>

          {/* Loading spinner */}
          <div className="items-center">
            {isLoading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-opacity-50"></div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-8">
            {required_doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-4 border border-gray-300 rounded-lg shadow-md"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-auto rounded-lg"
                  width={300}
                  height={300}
                />
                <h2 className="text-xl font-semibold mt-4">{doctor.name}</h2>
                {doctor.designation && (
                  <div className=" font-semibold text-blue-600">
                    {doctor.designation}
                  </div>
                )}
                <div className="mt-2">
                  <div className="text- font-semibold my-5 text-red-700">
                    {doctor.degrees}
                  </div>
                  <p className="font-bold mt-2 bg-gray-600 text-white">
                    {doctor.medicalName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
