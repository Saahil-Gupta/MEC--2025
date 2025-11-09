// src/stores/userStore.js
import { getData, setData } from "../utils/storage";

let user = getData("user") || null;
let listeners = [];

/**
 * Save/update the user's profile
 */
export function saveUser(profile) {
  user = profile;
  setData("user", user);

  // Notify subscribers
  listeners.forEach(cb => cb(user));
}

/**
 * Get the current user profile
 */
export function getUser() {
  return user;
}

/**
 * Subscribe to user changes
 * Useful for live updates across pages or components
 */
export function subscribeUser(callback) {
  listeners.push(callback);
  callback(user); // initial fire

  return () => {
    listeners = listeners.filter(cb => cb !== callback);
  };
}
