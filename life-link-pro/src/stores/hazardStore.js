// // src/stores/hazardStore.js
// import { uid } from "../utils/id";
// import { getData, setData, broadcast } from "../utils/storage";

// let hazards = getData("hazards"); // Load from localStorage safely
// let listeners = [];
// export let pendingHazardPos = null;

// export function setPendingHazardPos(pos) {
//   pendingHazardPos = pos;
// }
// // 🔁 Notify all subscribers and save to storage
// function updateHazards() {
//   setData("hazards", hazards);
//   listeners.forEach((cb) => cb([...hazards]));
// }

// // ➕ Add new hazard
// export function addHazard(hazard) {
//   const newHazard = { id: uid(), ...hazard };
//   hazards.push(newHazard);
//   updateHazards();
//   broadcast("hazard", newHazard); // Simulated P2P sync
// }

// // 👂 Subscribe to hazard updates
// export function subscribeHazards(callback) {
//   listeners.push(callback);
//   callback([...hazards]); // Initial load
// }

// // 🌐 Sync hazards between tabs
// window.addEventListener("storage", (e) => {
//   if (e.key === "hazard-broadcast" && e.newValue) {
//     try {
//       const h = JSON.parse(e.newValue);
//       hazards.push(h);
//       updateHazards();
//     } catch (err) {
//       console.error("Failed to parse hazard broadcast", err);
//     }
//   }
// });
// src/stores/hazardStore.js

import { uid } from "../utils/id";
import { getData, setData, broadcast } from "../utils/storage";

/* ---------------------------------------
   ✅ 1. Always load hazards safely
--------------------------------------- */
let hazards = getData("hazards");

// If hazards is null, undefined, or corrupted → fix it
if (!Array.isArray(hazards)) {
  hazards = [];
}

/* ---------------------------------------
   ✅ 2. Global pending hazard location
--------------------------------------- */
export let pendingHazardPos = null;

export function setPendingHazardPos(pos) {
  // Ensure valid values
  if (
    pos &&
    typeof pos.lat === "number" &&
    typeof pos.lng === "number"
  ) {
    pendingHazardPos = pos;
  } else {
    pendingHazardPos = null;
  }
}

/* ---------------------------------------
   ✅ 3. Clean listener system
--------------------------------------- */
let listeners = [];

function updateHazards() {
  setData("hazards", hazards);
  listeners.forEach((cb) => cb([...hazards]));
}

/* ---------------------------------------
   ✅ 4. Safe hazard creation
--------------------------------------- */
export function addHazard(hazard) {
  // Reject hazards missing coords (CRASH-PROOF)
  if (
    typeof hazard.lat !== "number" ||
    typeof hazard.lng !== "number"
  ) {
    console.warn("❌ Ignored hazard with invalid lat/lng", hazard);
    return;
  }

  const newHazard = {
    id: uid(), // ✅ store generates the ID
    timestamp: Date.now(),
    ...hazard,
  };

  hazards.push(newHazard);
  updateHazards();

  // Optional P2P broadcast (does nothing right now)
  broadcast("hazard", newHazard);
}

/* ---------------------------------------
   ✅ 5. Subscribe system (reactive)
--------------------------------------- */
export function subscribeHazards(callback) {
  listeners.push(callback);

  // Immediately send clean hazards to subscriber
  callback([...hazards]);

  return () => {
    listeners = listeners.filter((cb) => cb !== callback);
  };
}

/* ---------------------------------------
   ✅ 6. Listen for other tabs / windows
--------------------------------------- */
window.addEventListener("storage", (e) => {
  if (e.key === "hazards") {
    try {
      const data = JSON.parse(e.newValue);

      if (Array.isArray(data)) {
        hazards = data;
        updateHazards();
      }
    } catch (err) {
      console.error("Failed to parse hazards from storage", err);
    }
  }

  if (e.key === "hazard-broadcast" && e.newValue) {
    try {
      const h = JSON.parse(e.newValue);

      // Safety check
      if (
        typeof h.lat === "number" &&
        typeof h.lng === "number"
      ) {
        hazards.push(h);
        updateHazards();
      }
    } catch (err) {
      console.error("Failed to parse hazard broadcast", err);
    }
  }
});
