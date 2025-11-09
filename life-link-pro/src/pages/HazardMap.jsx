import { useEffect, useState } from "react";
import { subscribeHazards } from "../stores/hazardStore";

export default function HazardMap({ navigate }) {
  const [hazards, setHazards] = useState([]);

  useEffect(() => {
    const unsub = subscribeHazards(setHazards);
    return () => unsub && unsub();
  }, []);

  const colorFor = (sev) =>
    sev === "high" ? "bg-red-600"
    : sev === "medium" ? "bg-yellow-500"
    : "bg-green-600";

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <button onClick={() => navigate("home")} className="text-blue-600">← Back</button>
        <h2 className="text-xl font-bold">Hazard Reports</h2>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1 rounded-xl border bg-gray-50 p-3 overflow-y-auto">
          {hazards.length === 0 && (
            <div className="text-sm text-gray-500">No hazards reported yet.</div>
          )}
          <ul className="space-y-2">
            {hazards.map((h) => (
              <li key={h.id} className="flex items-start gap-3 rounded-lg border bg-white p-3">
                <span className={`inline-block h-3 w-3 rounded-full mt-1 ${colorFor(h.severity)}`}/>
                <div className="text-sm">
                  <div className="font-semibold capitalize">{h.severity} hazard</div>
                  <div className="text-gray-600">
                    📍 ({h.lat}, {h.lng}) • {new Date(h.id).toLocaleTimeString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl text-lg"
          onClick={() => navigate("addHazard")}
        >
          + Add Hazard
        </button>
      </div>
    </div>
  );
}
