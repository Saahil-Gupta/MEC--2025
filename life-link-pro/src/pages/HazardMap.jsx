import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import { subscribeHazards } from "../stores/hazardStore";

export default function HazardMap({ navigate }) {
  const [hazards, setHazards] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null);
  const highIcon = new L.Icon({
  iconUrl: "/icons/black-marker.png",
  iconSize: [32, 32],
  });
  const mediumIcon = new L.Icon({
    iconUrl: "/icons/red-marker.png",
    iconSize: [32, 32],
  });
  const lowIcon = new L.Icon({
    iconUrl: "/icons/yellow-marker.png",
    iconSize: [32, 32],
  });

  useEffect(() => {
    const unsub = subscribeHazards(setHazards);
    return () => unsub && unsub();
  }, []);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setSelectedPos(e.latlng); 
      },
    });
    return null;
  }

  const iconFor = (sev) =>
    sev === "high" ? highIcon : sev === "medium" ? mediumIcon : lowIcon;

  return (
    <div className="h-full w-full flex flex-col">

      {/* Header */}
      <div className="p-3 border-b flex items-center gap-3">
        <button onClick={() => navigate("home")} className="text-blue-600">
          ← Back
        </button>
        <h2 className="text-lg font-bold">Hazard Map</h2>
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

          <MapClickHandler />

          {hazards.map((h) => (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={iconFor(h.severity)}
            />
          ))}

          {selectedPos && (
            <Marker
              position={[selectedPos.lat, selectedPos.lng]}
              icon={iconFor("medium")}
            />
          )}
        </MapContainer>
      </div>

      {selectedPos && (
        <button
          onClick={() =>
            navigate("addHazard", { lat: selectedPos.lat, lng: selectedPos.lng })
          }
          className="m-3 py-3 rounded-xl bg-blue-600 text-white text-lg"
        >
          Add Hazard Here
        </button>
      )}
    </div>
  );
}