import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Sites() {
  const [sites, setSites] = useState([]);

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [projectId, setProjectId] = useState("");

  async function loadSites() {
    try {
      const response = await api.get("/sites");
      setSites(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/sites", {
        name,
        latitude: Number(latitude),
        longitude: Number(longitude),
        project_id: Number(projectId),
      });

      setName("");
      setLatitude("");
      setLongitude("");
      setProjectId("");

      loadSites();

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data, null, 2));
      }
    }
  }

  useEffect(() => {
    loadSites();
  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <div className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-700">
            Sites
          </h1>
        </div>

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">

            <h2 className="text-2xl font-bold mb-6">
              Create Site
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                placeholder="Site Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-lg p-3 w-full mb-4"
                required
              />

              <input
                type="number"
                step="any"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="border rounded-lg p-3 w-full mb-4"
                required
              />

              <input
                type="number"
                step="any"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="border rounded-lg p-3 w-full mb-4"
                required
              />

              <input
                type="number"
                placeholder="Project ID"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="border rounded-lg p-3 w-full mb-4"
                required
              />

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Create Site
              </button>

            </form>

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-6">
              Site List
            </h2>

            <table className="w-full border">

              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Latitude</th>
                  <th className="p-3">Longitude</th>
                  <th className="p-3">Project ID</th>
                </tr>
              </thead>

              <tbody>

                {sites.map((site) => (

                  <tr key={site.id} className="border-b">

                    <td className="p-3">{site.id}</td>
                    <td className="p-3">{site.name}</td>
                    <td className="p-3">{site.latitude}</td>
                    <td className="p-3">{site.longitude}</td>
                    <td className="p-3">{site.project_id}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Sites;