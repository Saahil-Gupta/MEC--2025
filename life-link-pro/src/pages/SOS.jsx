import { useEffect, useState } from "react";
import { sendSOS, subscribeSOS, filterSOS, markResolved } from "../stores/sosStore";

export default function SOS({ navigate }) {
  const [feed, setFeed] = useState([]);
  const [filter, setFilter] = useState("ALL");

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

  // 🔢 Priority sorting: HIGH → MEDIUM → LOW
  const sortByPriority = (list) => {
    const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return [...list].sort(
      (a, b) => (priorityOrder[b.severity] || 0) - (priorityOrder[a.severity] || 0)
    );
  };

  // ✅ Mark as resolved (remove immediately)
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
        <div></div>
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

        <div className="grid grid-cols-3 gap-3 mt-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl shadow"
            onClick={() => triggerSOS("HIGH")}
          >
            🚨 High
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 rounded-xl shadow"
            onClick={() => triggerSOS("MEDIUM")}
          >
            ⚠️ Medium
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow"
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
                className="text-xs px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
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
