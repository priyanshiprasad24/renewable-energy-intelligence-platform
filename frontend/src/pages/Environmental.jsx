import { useState } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";

function Environmental() {

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [result, setResult] = useState(null);

  async function handleAnalyze(e) {

    e.preventDefault();

    try {

      const response = await api.post("/environment/analyze", {
        latitude: Number(latitude),
        longitude: Number(longitude)
      });

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Analysis Failed");

    }

}
return (
  <div className="flex">

    <Sidebar />

    <div className="flex-1 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="bg-white shadow-md p-6">
        <h1 className="text-3xl font-bold text-green-700">
          Environmental Analysis
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-8">

        <div className="bg-white rounded-xl shadow-md p-6 max-w-xl">

          <h2 className="text-2xl font-bold mb-6">
            Enter Location
          </h2>

          <form onSubmit={handleAnalyze}>

            <input
              type="number"
              step="0.0001"
              placeholder="Latitude"
              required
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="border rounded-lg p-3 w-full mb-4"
            />

            <input
              type="number"
              step="0.0001"
              placeholder="Longitude"
              required
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="border rounded-lg p-3 w-full mb-4"
            />
            <button
  type="submit"
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
>
  Analyze
</button>

          </form>

        </div>

        {result && (

         <div className="bg-white rounded-xl shadow-md p-6 mt-8">

  <h2 className="text-3xl font-bold mb-6">
    Environmental Report
  </h2>

  <div className="space-y-4 text-lg">

    <p>
      <strong>Temperature:</strong> {result.temperature} °C
    </p>

    <p>
      <strong>Humidity:</strong> {result.humidity} %
    </p>

    <p>
      <strong>Solar Radiation:</strong> {result.solar_radiation} kWh/m²/day
    </p>

    <p>
      <strong>Wind Speed:</strong> {result.wind_speed} m/s
    </p>

    <p>
      <strong>Elevation:</strong> {result.elevation} m
    </p>

    <p>
      <strong>Terrain:</strong> {result.terrain}
    </p>

    <p>
      <strong>Land Type:</strong> {result.land_type}
    </p>

    <p>
      <strong>Road Access:</strong> {result.road_access}
    </p>

    <p>
      <strong>Grid Connection:</strong> {result.grid_connection}
    </p>

  </div>

</div>
        )}

      </div>

    </div>

  </div>
);
}

export default Environmental;