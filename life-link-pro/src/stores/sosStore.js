// src/stores/sosStore.js
// Enhanced SOS Store with Severity, Auto Timer, Offline Queue, Resolution
import { uid } from "../utils/id";
import { getData, setData, broadcast } from "../utils/storage";

let sosList = getData("sosList") || [];
let listeners = [];
let offlineQueue = getData("sosQueue") || [];

// 🔁 Update and notify all subscribers
function updateSOS() {
  setData("sosList", sosList);
  listeners.forEach((cb) => cb([...sosList]));
}

// 🚨 Send SOS message with severity
export function sendSOS(msg) {
  const newSOS = { id: uid(), ...msg };

  sosList.push(newSOS);
  updateSOS();

  try {
    broadcast("sos", newSOS);
  } catch {
    offlineQueue.push(newSOS);
    setData("sosQueue", offlineQueue);
  }
}

// 🧩 Flush queued broadcasts (if any)
export function flushQueue() {
  offlineQueue.forEach((q) => broadcast("sos", q));
  offlineQueue = [];
  setData("sosQueue", []);
}

// 👂 Subscribe to updates
export function subscribeSOS(callback) {
  listeners.push(callback);
  callback([...sosList]);
  return () => (listeners = listeners.filter((l) => l !== callback));
}

// 🌐 Listen for cross-tab updates
window.addEventListener("storage", (e) => {
  if (e.key === "sos-broadcast" && e.newValue) {
    const sos = JSON.parse(e.newValue);
    sosList.push(sos);
    updateSOS();
  }
});

// 🎚️ Get alert tone based on severity (optional future use)
export function getAlertTone(severity) {
  switch (severity) {
    case "HIGH": return "alarm-high.mp3";
    case "MEDIUM": return "alarm-medium.mp3";
    case "LOW": return "alarm-low.mp3";
    default: return null;
  }
}

// 🔍 Filter SOS by severity
export function filterSOS(level) {
  if (level === "ALL") return [...sosList];
  return sosList.filter((s) => s.severity === level);
}

// 🧹 COMPLETELY DELETE SOS
export function markResolved(id) {
  sosList = sosList.filter((s) => s.id !== id);
  updateSOS();
}