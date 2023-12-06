import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const default_doctors = [
  {
    id: 1,
    name: "Dr. Naznin Pervin",
    designation: "Sr. Dental Surgeon",
    image: "/doctors/dr-naznin.jpg", // Updated image path
    degrees: ["BDS (CMC) PGT MPH (USA)"],
    medicalName: "Asgar Ali Hospital",
  },
  {
    id: 2,
    name: "Dr. M. Akhter Hossain",
    designation: "Sr. Consultant - Chief Cardiac Surgeon",
    image: "/doctors/dr-akhter.webp", // Updated image path
    degrees: ["MBBS (DMC), MS (Cardiovascular & Thoracic Surgery)"],
    medicalName: "Asgar Ali Hospital",
  },
  // Add more doctor profiles here
];

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

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/get_doctors_details?disease=${valueParam}`
        );
        const data: any[] = await response.json();
        console.log(data);

        // backend/datasets/doctor_images/2.png

        // const img_id = doctorData[1].split("-")[0];
        //
        // Assuming data is an array of arrays, map each inner array to an object
        const formattedData: DoctorData[] = data.map((doctorData, index) => ({
          id: index + 1, // You might want to use a better ID mechanism
          name: doctorData[1],
          designation: "Specialities - " + doctorData[3],
          image: "/doctor_images/" + doctorData[0].split("-")[1] + ".png",
          degrees: doctorData[2],
          medicalName: doctorData[4],
          // Add more properties based on your data structure
        }));

        setDoctors(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [valueParam]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl max-h mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Suggested Doctors
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8">
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
                  <div className="text-gray-600 font-semibold">
                    {doctor.designation}
                  </div>
                )}
                <div className="mt-2">
                  <div className="text- font-semibold">{doctor.degrees}</div>
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
