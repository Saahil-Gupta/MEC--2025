import { addHazard } from "../stores/hazardStore";
import { useState } from "react";

export default function AddHazard({ navigate }) {
  const [severity, setSeverity] = useState("low");
  // For MVP we use fixed coordinates; replace with Geolocation API if you want
  const [lat, setLat] = useState(43.25);
  const [lng, setLng] = useState(-79.87);

  const submit = () => {
    addHazard({
      id: Date.now(),
      lat,
      lng,
      severity,
    });
    navigate("hazards");
  };

  const SevBtn = ({ value, label }) => (
    <button
      onClick={() => setSeverity(value)}
      className={`flex-1 py-3 rounded-xl border ${severity === value ? "bg-black text-white" : "bg-white"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <button onClick={() => navigate("hazards")} className="text-blue-600">← Back</button>
        <h2 className="text-xl font-bold">Add Hazard</h2>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <div className="text-sm font-semibold mb-2">Severity</div>
          <div className="flex gap-3">
            <SevBtn value="low" label="Low" />
            <SevBtn value="medium" label="Medium" />
            <SevBtn value="high" label="High" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Latitude</label>
            <input
              className="mt-1 w-full rounded-lg border p-2"
              type="number"
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value))}
              step="0.0001"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Longitude</label>
            <input
              className="mt-1 w-full rounded-lg border p-2"
              type="number"
              value={lng}
              onChange={(e) => setLng(parseFloat(e.target.value))}
              step="0.0001"
            />
          </div>
        </div>

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg"
        >
          Submit Hazard
        </button>
      </div>
    </div>
  );
}
