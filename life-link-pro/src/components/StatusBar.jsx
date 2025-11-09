import { formatTime } from "../utils/time";
import { useState, useEffect } from "react";

export default function StatusBar() {
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [batteryLevel, setBatteryLevel] = useState(null);

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Get battery level
  useEffect(() => {
    let battery;

    async function updateBattery() {
      if (navigator.getBattery) {
        battery = await navigator.getBattery();
        setBatteryLevel(Math.round(battery.level * 100));

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      }
    }

    updateBattery();

    return () => {
      if (battery) battery.removeEventListener("levelchange", () => {});
    };
  }, []);

  return (
    <div className="flex justify-between items-center text-xs px-4 py-1 bg-gray-100 text-gray-700">
      <span>📶 LTE</span>
      <span>{currentTime}</span>
      <span>🔋 {batteryLevel !== null ? `${batteryLevel}%` : "—"}</span>
    </div>
  );
}