import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

function Profile() {
const [user, setUser] = useState(null);
   useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex justify-center items-center min-h-screen">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <div className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-700">
            User Profile
          </h1>
        </div>

        <div className="p-8">

          <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">

            <h2 className="text-2xl font-bold mb-6">
              Profile Information
            </h2>

            <div className="space-y-5 text-lg">

              <p>
                <strong>Name:</strong> {user.full_name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Role:</strong> {user.role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;