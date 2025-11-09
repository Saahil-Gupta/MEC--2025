// Central helper for managing localStorage safely.

export function getData(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (err) {
    console.error(`Error reading from localStorage key: ${key}`, err);
    return fallback;
  }
}

export function setData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing to localStorage key: ${key}`, err);
  }
}

// Broadcast an event to simulate peer-to-peer sync between tabs.
export function broadcast(key, data) {
  try {
    localStorage.setItem(`${key}-broadcast`, JSON.stringify(data));
  } catch (err) {
    console.error(`Error broadcasting key: ${key}`, err);
  }
}
