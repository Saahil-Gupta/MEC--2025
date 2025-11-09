// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import { useState, useEffect } from "react";
// import { subscribeHazards } from "../stores/hazardStore";
// import { setPendingHazardPos } from "../stores/hazardStore";

// setPendingHazardPos(selectedPos);
// navigate("addHazard");
// export default function HazardMap({ navigate }) {
//   const [hazards, setHazards] = useState([]);
//   const [selectedPos, setSelectedPos] = useState(null);
//   const [userPos, setUserPos] = useState(null);
//   const userIcon = new L.Icon({
//     iconUrl: "/icons/user.png",
//     iconSize: [32, 32],
//   });
//   const highIcon = new L.Icon({
//   iconUrl: "/icons/black-marker.png",
//   iconSize: [32, 32],
//   });
//   const mediumIcon = new L.Icon({
//     iconUrl: "/icons/red-marker.png",
//     iconSize: [32, 32],
//   });
//   const lowIcon = new L.Icon({
//     iconUrl: "/icons/yellow-marker.png",
//     iconSize: [32, 32],
//   });

//   useEffect(() => {
//   if (!navigator.geolocation) return;

//   const watchId = navigator.geolocation.watchPosition(
//     (pos) => {
//       const lat = pos.coords.latitude;
//       const lng = pos.coords.longitude;

//       // ✅ Only set if valid numbers
//       if (typeof lat === "number" && typeof lng === "number") {
//         setUserPos({ lat, lng });
//       }
//     },
//     (err) => {
//       console.log("GPS error", err);
//     },
//     { enableHighAccuracy: true }
//   );

//   return () => navigator.geolocation.clearWatch(watchId);
// }, []);
//   useEffect(() => {
//     const unsub = subscribeHazards(setHazards);
//     return () => unsub && unsub();
//   }, []);

//   function MapClickHandler() {
//     useMapEvents({
//       click(e) {
//         setSelectedPos(e.latlng); 
//       },
//     });
//     return null;
//   }

//   const iconFor = (sev) =>
//     sev === "high" ? highIcon : sev === "medium" ? mediumIcon : lowIcon;

//   return (
//     <div className="h-full w-full flex flex-col">

//       {/* Header */}
//       <div className="p-3 border-b flex items-center gap-3">
//         <button onClick={() => navigate("home")} className="text-blue-600">
//           ← Back
//         </button>
//         <h2 className="text-lg font-bold">Hazard Map</h2>
//       </div>

//       {/* Map */}
//       <div className="flex-1">
//         <MapContainer
//           center={[43.25, -79.87]}
//           zoom={13}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             attribution="© OpenStreetMap"
//             url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           <MapClickHandler />

//           {hazards.map((h) => (
//             <Marker
//               key={h.id}
//               position={[h.lat, h.lng]}
//               icon={iconFor(h.severity)}
//             />
//           ))}

//           {selectedPos && (
//             <Marker
//               position={[selectedPos.lat, selectedPos.lng]}
//               icon={iconFor("medium")}
//             />
//           )}

//           {userPos &&
//             typeof userPos.lat === "number" &&
//             typeof userPos.lng === "number" && (
//               <Marker position={[userPos.lat, userPos.lng]} icon={userIcon} />
//             )
//           }
//         </MapContainer>
//       </div>

//       {/* {selectedPos && (
//         <button
//           onClick={() =>
//             navigate("addHazard", { lat: selectedPos.lat, lng: selectedPos.lng })
//           }
//           className="m-3 py-3 rounded-xl bg-blue-600 text-white text-lg"
//         >
//           Add Hazard Here
//         </button>
//       )} */}
//     </div>
//   );
// }


import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import {
  subscribeHazards,
  setPendingHazardPos,
} from "../stores/hazardStore";

export default function HazardMap({ navigate }) {
  const [hazards, setHazards] = useState([]);
  const [selectedPos, setSelectedPos] = useState(null);
  const [userPos, setUserPos] = useState(null);

  // ✅ Local marker icons
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

  const userIcon = new L.Icon({
    iconUrl: "/icons/user.png",
    iconSize: [32, 32],
  });

  const iconFor = (sev) =>
    sev === "High" ? highIcon :
    sev === "Medium" ? mediumIcon :
    lowIcon;

  // ✅ Load hazards on mount
  useEffect(() => {
    const unsub = subscribeHazards(setHazards);
    return () => unsub && unsub();
  }, []);

  // ✅ Map click handler
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (
          typeof e.latlng.lat === "number" &&
          typeof e.latlng.lng === "number"
        ) {
          setSelectedPos(e.latlng);
        }
      },
    });
    return null;
  }

  // ✅ USER LIVE LOCATION
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (typeof lat === "number" && typeof lng === "number") {
          setUserPos({ lat, lng });
        }
      },
      (err) => {
        console.log("GPS error:", err);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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

          {/* ✅ VALID hazards only */}
          {hazards
            .filter(
              (h) => typeof h.lat === "number" && typeof h.lng === "number"
            )
            .map((h) => (
              <Marker
                key={h.id}
                position={[h.lat, h.lng]}
                icon={iconFor(h.severity)}
              >
                <Popup>
                  <div className="text-sm space-y-1">

                    <div><strong>Severity:</strong> {h.severity}</div>

                    <div><strong>Reported By:</strong> {h.reportedBy}</div>

                    <div><strong>Role:</strong> {h.role}</div>

                    {h.medical && (
                      <div><strong>Medical Notes:</strong> {h.medical}</div>
                    )}

                    <div><strong>Lat:</strong> {h.lat.toFixed(4)}</div>
                    <div><strong>Lng:</strong> {h.lng.toFixed(4)}</div>

                    <div><strong>Time:</strong> {new Date(h.id).toLocaleString()}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* ✅ USER POSITION MARKER */}
          {userPos &&
            typeof userPos.lat === "number" &&
            typeof userPos.lng === "number" && (
              <Marker
                position={[userPos.lat, userPos.lng]}
                icon={userIcon}
              />
            )}

          {/* ✅ TEMP Marker for new hazard */}
          {selectedPos &&
            typeof selectedPos.lat === "number" &&
            typeof selectedPos.lng === "number" && (
              <Marker
                position={[selectedPos.lat, selectedPos.lng]}
                icon={iconFor("Medium")}
              />
            )}
        </MapContainer>
      </div>

      {/* ✅ Add hazard button */}
      {selectedPos && (
        <button
          onClick={() => {
            setPendingHazardPos({
              lat: selectedPos.lat,
              lng: selectedPos.lng,
            });
            navigate("addHazard");
          }}
          className="m-3 py-3 rounded-xl bg-blue-600 text-white text-lg"
        >
          Add Hazard Here
        </button>
      )}
    </div>
  );
}
