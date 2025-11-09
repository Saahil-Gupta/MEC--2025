// stores/hazardStore.js
let hazards = JSON.parse(localStorage.getItem("hazards") || "[]");
let listeners = [];

function update() {
  localStorage.setItem("hazards", JSON.stringify(hazards));
  listeners.forEach(cb => cb([...hazards]));
}

export function addHazard(hazard) {
  hazards.push(hazard);
  update();

  // simulate sync
  localStorage.setItem("hazard-broadcast", JSON.stringify(hazard));
}

export function subscribeHazards(callback) {
  listeners.push(callback);
  callback([...hazards]);
}

window.addEventListener("storage", (e) => {
  if (e.key === "hazard-broadcast") {
    const hazard = JSON.parse(e.newValue);
    hazards.push(hazard);
    update();
  }
});
