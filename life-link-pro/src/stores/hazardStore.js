// src/stores/hazardStore.js
import { uid } from "../utils/id";
import { getData, setData, broadcast } from "../utils/storage";

let hazards = getData("hazards"); // Load from localStorage safely
let listeners = [];

// 🔁 Notify all subscribers and save to storage
function updateHazards() {
  setData("hazards", hazards);
  listeners.forEach((cb) => cb([...hazards]));
}

// ➕ Add new hazard
export function addHazard(hazard) {
  const newHazard = { id: uid(), ...hazard };
  hazards.push(newHazard);
  updateHazards();
  broadcast("hazard", newHazard); // Simulated P2P sync
}

// 👂 Subscribe to hazard updates
export function subscribeHazards(callback) {
  listeners.push(callback);
  callback([...hazards]); // Initial load
}

// 🌐 Sync hazards between tabs
window.addEventListener("storage", (e) => {
  if (e.key === "hazard-broadcast" && e.newValue) {
    try {
      const h = JSON.parse(e.newValue);
      hazards.push(h);
      updateHazards();
    } catch (err) {
      console.error("Failed to parse hazard broadcast", err);
    }
  }
});