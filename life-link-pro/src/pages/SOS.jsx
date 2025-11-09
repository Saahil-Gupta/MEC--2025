import { useEffect, useState } from "react";
import { sendSOS, subscribeSOS, filterSOS, markResolved } from "../stores/sosStore";

export default function SOS({ navigate }) {
  const [feed, setFeed] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [showGuide, setShowGuide] = useState(false);

  // Subscribe and auto-refresh when list changes
  useEffect(() => {
    const unsubscribe = subscribeSOS((list) => {
      setFeed(sortByPriority(filterSOS(filter)));
    });
    return () => unsubscribe();
  }, [filter]);

  // Trigger SOS by severity
  const triggerSOS = (severity) => {
    sendSOS({
      severity,
      status:
        severity === "HIGH"
          ? "CRITICAL INJURY"
          : severity === "MEDIUM"
          ? "NEEDS HELP"
          : "SUPPLY REQUEST",
      timestamp: new Date().toISOString(),
      resolved: false,
    });
    setFeed(sortByPriority(filterSOS(filter)));
  };

  // Severity color themes
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case "HIGH":
        return "bg-red-100 border-red-300 text-red-700";
      case "MEDIUM":
        return "bg-yellow-100 border-yellow-300 text-yellow-700";
      case "LOW":
        return "bg-green-100 border-green-300 text-green-700";
      default:
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  // Priority sorting: HIGH → MEDIUM → LOW
  const sortByPriority = (list) => {
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return [...list].sort(
      (a, b) => (priorityOrder[b.severity] || 0) - (priorityOrder[a.severity] || 0)
    );
  };

  // Mark as resolved (remove immediately)
  const handleResolve = (id) => {
    markResolved(id);
    setFeed((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm">
        <button onClick={() => navigate("home")} className="text-blue-600 font-medium">
          ← Back
        </button>
        <h2 className="text-xl font-bold">SOS Broadcast</h2>
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="text-sm text-blue-600 font-medium underline"
        >
          {showGuide ? "Hide Guide" : "Severity Guide"}
        </button>
      </div>

      {/* Filter + Actions */}
      <div className="p-4 flex flex-col gap-3">
        <label className="font-medium text-sm text-gray-700">Filter by Severity</label>
        <select
          value={filter}
          onChange={(e) => {
            const newFilter = e.target.value;
            setFilter(newFilter);
            setFeed(sortByPriority(filterSOS(newFilter)));
          }}
          className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm text-sm"
        >
          <option value="ALL">All</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        {/* Severity Guide Section */}
        {showGuide && (
          <div className="mt-3 p-4 bg-white rounded-2xl shadow-sm border border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-800 text-base mb-1">
              🚦 Severity Guide
            </h3>

            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-xl border bg-red-50 border-red-200 text-red-800">
                <strong>🚨 HIGH:</strong> Critical or life-threatening emergencies (e.g., severe
                injury, fire, or danger to life).
              </div>

              <div className="p-3 rounded-xl border bg-yellow-50 border-yellow-200 text-yellow-800">
                <strong>⚠️ MEDIUM:</strong> Urgent but non-life-threatening situations (e.g., lost
                person, minor injury, trapped).
              </div>

              <div className="p-3 rounded-xl border bg-green-50 border-green-200 text-green-800">
                <strong>🩹 LOW:</strong> Minor issues or supply requests (e.g., water, first aid,
                status check).
              </div>
            </div>
          </div>
        )}

        {/* SOS Buttons */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl shadow active:scale-95 transition-transform"
            onClick={() => triggerSOS("HIGH")}
          >
            🚨 High
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl shadow active:scale-95 transition-transform"
            onClick={() => triggerSOS("MEDIUM")}
          >
            ⚠️ Medium
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow active:scale-95 transition-transform"
            onClick={() => triggerSOS("LOW")}
          >
            🩹 Low
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="font-semibold text-gray-700 mb-2">Incoming Signals</h3>
        <ul className="space-y-3">
          {feed.length === 0 && (
            <li className="text-gray-500 text-sm">No signals yet.</li>
          )}
          {feed.map((s) => (
            <li
              key={s.id}
              className={`border rounded-xl px-4 py-3 shadow-sm flex items-center justify-between ${getSeverityStyle(
                s.severity
              )}`}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{s.status}</span>
                <span className="text-xs text-gray-600">
                  {new Date(s.timestamp).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => handleResolve(s.id)}
                className="text-xs px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-sm"
              >
                Mark Resolved
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
