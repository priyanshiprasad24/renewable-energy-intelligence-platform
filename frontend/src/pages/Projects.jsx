import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const [activeTab, setActiveTab] = useState("add");

  async function loadProjects() {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/projects", {
        name,
        description,
        location,
      });

      setName("");
      setDescription("");
      setLocation("");

      await loadProjects();

      // Automatically switch to View Projects
      setActiveTab("view");

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data, null, 2));
      }
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        {/* Header */}
        <div className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-700">
            Projects
          </h1>
        </div>

        <div className="p-8">

          {/* Tabs */}
          <div className="flex gap-4 mb-6">

            <button
              onClick={() => setActiveTab("add")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === "add"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Add Project
            </button>

            <button
              onClick={() => setActiveTab("view")}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === "view"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              View Projects
            </button>

          </div>

          {/* Add Project */}
          {activeTab === "add" && (
            <div className="bg-white rounded-xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-6">
                Create Project
              </h2>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded-lg p-3 w-full mb-4"
                  required
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded-lg p-3 w-full mb-4"
                  required
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border rounded-lg p-3 w-full mb-4"
                  required
                />

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                  Create Project
                </button>

              </form>

            </div>
          )}

          {/* View Projects */}
          {activeTab === "view" && (
            <div className="bg-white rounded-xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-6">
                Project List
              </h2>

              <table className="w-full border">

                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Project Name</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>

                <tbody>

                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b hover:bg-gray-100"
                      >
                        <td className="p-3">{project.id}</td>
                        <td className="p-3">{project.name}</td>
                        <td className="p-3">{project.description}</td>
                        <td className="p-3">{project.location}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center p-4"
                      >
                        No Projects Found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Projects;