import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        {/* Top Navbar */}
        <div className="bg-white shadow-md p-6 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-green-700">
            Solar & Wind Deployment Intelligence
          </h1>

          <div className="text-lg font-semibold">
            👋 Welcome, Admin
          </div>

        </div>

        {/* Main Content */}
        <div className="p-8">

  <h2 className="text-2xl font-bold mb-2">
    Dashboard
  </h2>

  <p className="text-gray-600 mb-8">
    Renewable Energy Intelligence Platform
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Environmental */}
    <Link to="/environment">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
        <h3 className="text-xl font-bold text-green-700">
          🌍 Environmental Analysis
        </h3>
        <p className="text-gray-600 mt-2">
          Analyze terrain, weather, land type, elevation and infrastructure.
        </p>
      </div>
    </Link>

    {/* Solar */}
    <Link to="/solar">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
        <h3 className="text-xl font-bold text-yellow-600">
          ☀ Solar Prediction
        </h3>
        <p className="text-gray-600 mt-2">
          Predict solar energy potential for the selected location.
        </p>
      </div>
    </Link>

    {/* Wind */}
    <Link to="/wind">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
        <h3 className="text-xl font-bold text-blue-600">
          💨 Wind Prediction
        </h3>
        <p className="text-gray-600 mt-2">
          Analyze wind resources and estimate wind energy suitability.
        </p>
      </div>
    </Link>

    {/* Report */}
    <Link to="/report">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition cursor-pointer">
        <h3 className="text-xl font-bold text-purple-700">
          📑 Resource Report
        </h3>
        <p className="text-gray-600 mt-2">
          Generate a complete renewable energy assessment report.
        </p>
      </div>
    </Link>

  </div>

</div>

      </div>

    </div>
  );
}

export default Dashboard;