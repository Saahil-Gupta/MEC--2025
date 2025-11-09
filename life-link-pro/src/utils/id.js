// Generates a short unique identifier for new entries like SOS or hazard reports.

export function uid() {
  // Combines a random string + timestamp in base36 for uniqueness
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}
