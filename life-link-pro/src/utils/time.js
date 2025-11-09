// utils/time.js
// Formats timestamps nicely for UI display.

export function formatTime(iso) {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}