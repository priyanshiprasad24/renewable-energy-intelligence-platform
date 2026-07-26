import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Report() {
  const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState(null);

  async function handleGenerate(e) {
    e.preventDefault();

    try {
     const response = await api.post("/report/generate", {
  latitude: Number(latitude),
  longitude: Number(longitude),
});

      setResult(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        alert("Report generation failed.");
      }
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <div className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-700">
            Resource Assessment Report
          </h1>
        </div>

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-md p-6 max-w-xl">

            <h2 className="text-2xl font-bold mb-6">
              Generate Report
            </h2>

            <form onSubmit={handleGenerate}>

             <input
  type="number"
  step="0.0001"
  placeholder="Latitude"
  value={latitude}
  onChange={(e) => setLatitude(e.target.value)}
  className="border rounded-lg p-3 w-full mb-4"
  required
/>

<input
  type="number"
  step="0.0001"
  placeholder="Longitude"
  value={longitude}
  onChange={(e) => setLongitude(e.target.value)}
  className="border rounded-lg p-3 w-full mb-4"
  required
/>

           

              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
              >
                Generate Report
              </button>

            </form>

          </div>

          {result && (

            <div className="bg-white rounded-xl shadow-md mt-8 p-6 max-w-xl">

              <h2 className="text-2xl font-bold mb-5">
                Assessment Result
              </h2>

             <div className="grid grid-cols-2 gap-4">

  <p><strong>Location:</strong></p>
  <p>{result.location}</p>

  <p><strong>Solar Score:</strong></p>
  <p>{result.solar_score}</p>

  <p><strong>Solar Suitability:</strong></p>
  <p>{result.solar_suitability}</p>

  <p><strong>Wind Score:</strong></p>
  <p>{result.wind_score}</p>

  <p><strong>Wind Suitability:</strong></p>
  <p>{result.wind_suitability}</p>

  <p><strong>Overall Recommendation:</strong></p>
  <p className="font-semibold text-green-700">
    {result.overall_recommendation}
  </p>

</div>


            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default Report;