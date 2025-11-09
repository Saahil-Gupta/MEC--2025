import { useEffect, useState } from "react";

export default function Home({ navigate }) {
  const [weather, setWeather] = useState(null);

  // --- Weather API Fetch ---
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=2f174315328f40e0bae195832250911&q=Hamilton`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
        });
      } catch (err) {
        console.error("Weather fetch failed", err);
      }
    };

    fetchWeather();
  }, []);

  // --- Placeholder for Siren Sound ---
  const playSiren = () => {
    // When you add your siren file later, you can uncomment this:
    // const audio = new Audio("/siren.mp3");
    // audio.play();
    alert("🔊 Siren would play here (add your audio later).");
  };

  return (
    <div className="h-full w-full flex flex-col">
      {/* Header */}
      <div className="p-5 text-center border-b bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800">Life-Link Pro</h1>
        <p className="text-xs text-gray-500">Offline disaster response</p>
      </div>

      {/* Status Section */}
      <div className="p-4">
        <div className="bg-gray-100 rounded-xl shadow-sm p-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-700">
            Current Status
          </h2>

          {/* Alert */}
          <p className="text-sm text-red-600">
            ⚠️ Flood warning in effect — Stay indoors!
          </p>

          {/* Weather */}
          {weather ? (
            <div className="flex items-center gap-3">
              <img src={weather.icon} alt="Weather Icon" className="w-8 h-8" />
              <p className="text-sm text-gray-700">
                {weather.condition}, {weather.temp}°C
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Fetching weather...</p>
          )}

          {/* Siren Button */}
          <button
            onClick={playSiren}
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
          >
            🚨 Play Distress Siren
          </button>
        </div>
      </div>

      {/* Main Buttons */}
      <div className="flex-1 p-6 space-y-4">
        <button
          onClick={() => navigate("sos")}
          className="w-full bg-red-600 text-white py-5 rounded-xl text-xl font-semibold shadow-md hover:bg-red-700"
        >
          SEND SOS
        </button>

        <button
          onClick={() => navigate("hazards")}
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg shadow-md hover:bg-blue-700"
        >
          Hazard Reports
        </button>

        <button
          onClick={() => navigate("firstAid")}
          className="w-full bg-green-600 text-white py-4 rounded-xl text-lg shadow-md hover:bg-green-700"
        >
          First Aid Guide
        </button>
      </div>
    </div>
  );
}
