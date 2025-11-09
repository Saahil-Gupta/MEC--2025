import { useEffect, useState } from "react";
import { sendSOS, subscribe } from "../stores/sosStore";

export default function SOS({ navigate }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const unsub = subscribe(setFeed);
    return () => unsub && unsub();
  }, []);

  const triggerSOS = () => {
    sendSOS({
      id: Date.now(),
      status: "INJURED",
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <button onClick={() => navigate("home")} className="text-blue-600">← Back</button>
        <h2 className="text-xl font-bold">SOS Broadcast</h2>
      </div>

      <div className="p-5">
        <button
          className="bg-red-600 text-white text-3xl py-10 w-full rounded-2xl shadow"
          onClick={triggerSOS}
        >
          SEND SOS
        </button>

        <h3 className="mt-6 font-semibold">Incoming Signals</h3>
        <ul className="mt-2 space-y-2 max-h-[360px] overflow-y-auto">
          {feed.length === 0 && (
            <li className="text-gray-500 text-sm">No signals yet.</li>
          )}
          {feed.map((s) => (
            <li key={s.id} className="text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <span className="mr-2">🚨</span>
              <span className="font-medium">{s.status}</span>
              <span className="text-gray-500"> — {new Date(s.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
