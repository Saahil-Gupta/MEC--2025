// stores/sosStore.js
let sosList = JSON.parse(localStorage.getItem("sosList") || "[]");
let listeners = [];

function update() {
  localStorage.setItem("sosList", JSON.stringify(sosList));
  listeners.forEach(cb => cb([...sosList]));
}

export function sendSOS(sos) {
  sosList.push(sos);
  update();

  // broadcast
  localStorage.setItem("sos-broadcast", JSON.stringify(sos));
}

export function subscribeSOS(callback) {
  listeners.push(callback);
  callback([...sosList]);
}

window.addEventListener("storage", (e) => {
  if (e.key === "sos-broadcast") {
    const sos = JSON.parse(e.newValue);
    sosList.push(sos);
    update();
  }
});
