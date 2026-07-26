import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-green-800 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-8">
        🌍 RE Platform
      </h2>
      <nav className="space-y-4">

  <Link
    to="/dashboard"
    className="block p-3 rounded hover:bg-green-700"
  >
    📊 Dashboard
  </Link>

  <Link
    to="/projects"
    className="block p-3 rounded hover:bg-green-700"
  >
    📂 Projects
  </Link>

  <Link
    to="/sites"
    className="block p-3 rounded hover:bg-green-700"
  >
    📍 Sites
  </Link>

  {/* ---------- Milestone 2 ---------- */}

  <Link
    to="/environment"
    className="block p-3 rounded hover:bg-green-700"
  >
    🌍 Environmental Analysis
  </Link>

  <Link
    to="/solar"
    className="block p-3 rounded hover:bg-green-700"
  >
    ☀ Solar Prediction
  </Link>

  <Link
    to="/wind"
    className="block p-3 rounded hover:bg-green-700"
  >
    💨 Wind Prediction
  </Link>

  <Link
    to="/report"
    className="block p-3 rounded hover:bg-green-700"
  >
    📑 Resource Report
  </Link>

  {/* ------------------------------- */}

  <Link
    to="/map"
    className="block p-3 rounded hover:bg-green-700"
  >
    🗺 GIS Map
  </Link>

  <Link
    to="/profile"
    className="block p-3 rounded hover:bg-green-700"
  >
    👤 Profile
  </Link>

</nav>

    </div>
  );
}

export default Sidebar;