import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

export default function Shelters({ navigate }) {
  const [userPos, setUserPos] = useState(null);

  // Hardcoded emergency shelters
  const shelters = [
    {
      id: 1,
      name: "Hamilton Community Shelter",
      lat: 43.2550,
      lng: -79.8712,
      capacity: "200 people",
    },
    {
      id: 2,
      name: "Westdale Emergency Center",
      lat: 43.2644,
      lng: -79.9070,
      capacity: "150 people",
    },
    {
      id: 3,
      name: "Downtown Relief Hub",
      lat: 43.2541,
      lng: -79.8648,
      capacity: "300 people",
    },
  ];

  const userIcon = new L.Icon({
    iconUrl: "/icons/user.png",
    iconSize: [34, 34],
  });

  const shelterIcon = new L.Icon({
    iconUrl: "/icons/shelters.png",
    iconSize: [40, 40],
  });

  // Track GPS location
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.log("GPS error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="h-full w-full flex flex-col">

      {/* Header */}
      <div className="relative p-4 border-b bg-gray-50">
        <button
          onClick={() => navigate("home")}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-medium"
        >
          ← Back
        </button>

        <h2 className="text-lg font-bold text-center text-gray-800">
          Nearby Shelters
        </h2>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={[43.25, -79.87]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* User Position */}
          {userPos && (
            <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Shelter Markers */}
          {shelters.map((s) => (
            <Marker
              key={s.id}
              position={[s.lat, s.lng]}
              icon={shelterIcon}
            >
              <Popup>
                <div className="text-sm space-y-1">
                  <div className="font-bold">{s.name}</div>
                  <div><strong>Capacity:</strong> {s.capacity}</div>
                  <div><strong>Lat:</strong> {s.lat.toFixed(4)}</div>
                  <div><strong>Lng:</strong> {s.lng.toFixed(4)}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
