# Life-Link Live  
A lightweight offline-first disaster response web app built for the MEC Hackathon.  
The app simulates a mobile emergency tool that works without internet and allows users to share hazard reports, find shelters, access first aid guides, and sync data across browser tabs.

---

## Live Demo

You can access the deployed version here:  
👉 **https://life-link-live.vercel.app/**

---

## Features

### 1. Offline-First Design
The entire app works without an internet connection. All hazard data and user actions are stored in localStorage.

### 2. Mobile Simulation Layout
Life-Link runs inside a centered mobile frame built using React and Tailwind.  
The layout replicates a 390 x 800px smartphone screen.

### 3. Hazard Reporting Map
Users can:
- Tap anywhere on the map to drop a marker
- Select severity (Low, Medium, High)
- Save hazards locally
- View hazard details by clicking markers
- See their own location with geolocation

### 4. First Aid Guide
A quick-access medical reference section with instructions for:
- CPR  
- Burns  
- Bleeding  
- Fractures  
- Unconsciousness  
- And general emergency steps

### 5. SOS Emergency Button
A full-screen red button that:
- Plays a siren sound
- Vibrates the device if supported
- Displays large emergency text

### 6. Random Simulated Disaster Alerts
Every time the app loads, a new disaster alert is shown:
- Earthquake
- Flood
- Tornado
- Storm
- Wildfire
- Hurricane

### 7. Nearby Shelter Locator
A map showing:
- The user's real location
- Multiple static nearby shelters
- Icons and labels for safety zones

### 8. Multi-Tab Sync
If a user adds a hazard in one tab, it automatically appears in all open tabs.

---

## Tech Stack

### Frontend
- React  
- Vite  
- Tailwind CSS  
- React Leaflet (OpenStreetMap)  

### Storage
- LocalStorage  
- BroadcastChannel API for real time sync  

### Icons and UI
- Custom PNG icon set  
- Clean minimal UI optimized for emergency usage  
