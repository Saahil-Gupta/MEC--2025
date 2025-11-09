// src/stores/sosStore.js
import { uid } from "../utils/id";
import { getData, setData, broadcast } from "../utils/storage";

let sosList = getData("sosList"); // Load safely
let listeners = [];

// 🔁 Update and notify all subscribers
function updateSOS() {
  setData("sosList", sosList);
  listeners.forEach((cb) => cb([...sosList]));
}

// 🚨 Send new SOS message
export function sendSOS(msg) {
  const newSOS = { id: uid(), ...msg };
  sosList.push(newSOS);
  updateSOS();
  broadcast("sos", newSOS); // Simulated P2P sync
}

// 👂 Subscribe to updates
export function subscribeSOS(callback) {
  listeners.push(callback);
  callback([...sosList]); // Initial load
}

// 🌐 Sync SOS across tabs
window.addEventListener("storage", (e) => {
  if (e.key === "sos-broadcast" && e.newValue) {
    try {
      const sos = JSON.parse(e.newValue);
      sosList.push(sos);
      updateSOS();
    } catch (err) {
      console.error("Failed to parse SOS broadcast", err);
    }
  }
});