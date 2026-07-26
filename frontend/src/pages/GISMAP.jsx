import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ position, setPosition }) {

  useMapEvents({
    click(e) {
      console.log("Map Clicked");

      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const p = e.target.getLatLng();
          setPosition([p.lat, p.lng]);
        },
      }}
    >
      <Popup>
        Selected Location
      </Popup>
    </Marker>
  );
}
function GISMap() {

  const [sites, setSites] = useState([]);

const [selectedPosition, setSelectedPosition] = useState([
  20.5937,
  78.9629,
]);
const [selectedSite, setSelectedSite] = useState(null);
   const saveLocation = async () => {

  if (!selectedSite) {
    alert("Please select a site first.");
    return;
  }

  try {

    await api.put(`/sites/${selectedSite.id}`, {
      name: selectedSite.name,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
    });

    alert("Location updated successfully!");

  } catch (error) {

    console.error(error);
    alert("Failed to update location.");

  }

};
  useEffect(() => {
    api.get("/sites")
      .then((response) => {
        setSites(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <div className="bg-white shadow-md p-6">
          <h1 className="text-3xl font-bold text-green-700">
            GIS Map
          </h1>
        </div>

        <div className="p-6">

          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{
              height: "600px",
              width: "100%",
            }}
          >


            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {sites.map((site) => (
               <Marker
  key={site.id}
  position={[site.latitude, site.longitude]}
  draggable={true}
eventHandlers={{
  click: () => {
    setSelectedSite(site);
    setSelectedPosition([
      site.latitude,
      site.longitude,
    ]);
  },

  dragend: (e) => {
    const marker = e.target;
    const position = marker.getLatLng();

    setSelectedSite(site);
    setSelectedPosition([
      position.lat,
      position.lng,
    ]);
  },
}}
>


                <Popup>

                  <strong>{site.name}</strong>

                  <br />

                  Latitude :
                  {site.latitude}

                  <br />

                  Longitude :
                  {site.longitude}

                  <br />

                  Project ID :
                  {site.project_id}

                </Popup>

              </Marker>

            ))}


          </MapContainer>
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
  <h2 className="text-xl font-bold mb-4">
    Selected Location
  </h2>

  <p>
    <strong>Latitude:</strong> {selectedPosition[0].toFixed(6)}
  </p>

  <p>
    <strong>Longitude:</strong> {selectedPosition[1].toFixed(6)}
  </p>

 <button
  onClick={saveLocation}
  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
>
  Save Location
</button>
    
</div>

        </div>

      </div>

    </div>
  );
}

export default GISMap;