import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Wind() {
  const [windSpeed, setWindSpeed] = useState("");
const [elevation, setElevation] = useState("");
  const [result, setResult] = useState(null);

  async function handlePredict(e) {
    e.preventDefault();

    try {
    const response = await api.post("/wind/predict", {
  wind_speed: Number(windSpeed),
  elevation: Number(elevation),
});

      setResult(response.data);
    }catch (error) {
  console.error(error);

  if (error.response) {
    console.log(error.response.data);
    alert(JSON.stringify(error.response.data, null, 2));
  } else {
    alert(error.message);
  }

    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-700">
            Wind Prediction
          </h1>
        </div>

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-md p-6 max-w-xl">

            <h2 className="text-2xl font-bold mb-6">
              Enter Location
            </h2>

            <form onSubmit={handlePredict}>

            <input
  type="number"
  step="0.1"
  placeholder="Wind Speed (m/s)"
  value={windSpeed}
  onChange={(e) => setWindSpeed(e.target.value)}
  className="border rounded-lg p-3 w-full mb-4"
  required
/>

            <input
  type="number"
  placeholder="Elevation (m)"
  value={elevation}
  onChange={(e) => setElevation(e.target.value)}
  className="border rounded-lg p-3 w-full mb-4"
  required
/>
              

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Predict Wind Potential
              </button>

            </form>

          </div>

          {result && (

            <div className="bg-white rounded-xl shadow-md mt-8 p-6 max-w-xl">

              <h2 className="text-2xl font-bold mb-5">
                Wind Prediction Result
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <p><strong>Wind Score:</strong></p>
                <p>{result.wind_score}</p>

                <p><strong>Suitability:</strong></p>
                <p>{result.suitability}</p>

                <p><strong>Recommendation:</strong></p>
                <p>{result.recommendation}</p>

              </div>

            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default Wind;