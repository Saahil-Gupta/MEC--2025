import { addHazard, pendingHazardPos } from "../stores/hazardStore";
import { useState } from "react";
import { getUser } from "../stores/userStore";

export default function AddHazard({ navigate }) {

  // ✅ Get lat/lng from global store (set in HazardMap)
  const { lat, lng } = pendingHazardPos || {};

  // ✅ Safety check (should never show unless something breaks)
  if (typeof lat !== "number" || typeof lng !== "number") {
    return (
      <div className="p-5">
        <h2 className="text-lg font-bold text-red-600 mb-3">
          No location selected!
        </h2>
        <p className="text-gray-700">
          Please go back to the map and tap a location to add a hazard.
        </p>

        <button
          onClick={() => navigate("hazards")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          ← Back to Map
        </button>
      </div>
    );
  }

  const [severity, setSeverity] = useState("Low");
  const user = getUser();

  const submit = () => {
    addHazard({
      id: Date.now(),
      lat,
      lng,
      severity,
      reportedBy: user?.name || "Anonymous",
      role: user?.role || "Citizen",
      medical: user?.medical || "",
    });
    navigate("hazards");
  };

  const SevBtn = ({ value, label }) => (
    <button
      onClick={() => setSeverity(value)}
      className={`flex-1 py-3 rounded-xl border ${
        severity === value ? "bg-black text-white" : "bg-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full w-full flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <button onClick={() => navigate("hazards")} className="text-blue-600">
          ← Back
        </button>
        <h2 className="text-xl font-bold">Add Hazard</h2>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5">

        <div>
          <div className="text-sm font-semibold mb-2">Severity</div>
          <div className="flex gap-3">
            <SevBtn value="Low" label="Low" />
            <SevBtn value="Medium" label="Medium" />
            <SevBtn value="High" label="High" />
          </div>
        </div>

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg"
        >
          Confirm Hazard
        </button>
      </div>
    </div>
  );
}
