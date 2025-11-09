import { useEffect, useState, useRef } from "react";
import Logo from "/icons/logo_logo.png";
import Logo_text from "/icons/logo_text.png";

export default function Home({ navigate, alert }) {
  const [weather, setWeather] = useState(null);
  const alarmRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);



    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=Hamilton`
        );
        const data = await res.json();
        setWeather({
          temp: Math.round(data.current.temp_c),
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          location: data.location.name,
        });
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    };

    fetchWeather();

  const playSiren = () => {
    // Create audio instance if needed
    if (!alarmRef.current) {
      // change the path below if your file has a different name or is in a subfolder of public/
      alarmRef.current = new Audio("/siren.mp3");
      alarmRef.current.preload = "auto";
      alarmRef.current.loop = true; // keep siren looping until paused
    }

    const audio = alarmRef.current;

    if (!isPlaying) {
      // play
      const p = audio.play();
      if (p && typeof p.catch === "function") p.catch((e) => console.warn("Audio play failed:", e));
      setIsPlaying(true);
    } else {
      // pause
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (alarmRef.current) {
        try {
          alarmRef.current.pause();
          alarmRef.current.currentTime = 0;
        } catch (e) {
          // ignore
        }
        alarmRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">

      {/* Header */}
    <div className="p-5 border-b bg-gray-50">
      <div className="flex items-center justify-between">

        {/* LEFT — Logo + Text */}
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="App Logo"
            className="h-13 w-auto object-contain"   // BIGGER LOGO
          />

          <img
            src={Logo_text}
            alt="Life-Link Live"
            className="h-13 w-auto object-contain ml-3"  // BIGGER TEXT LOGO
          />
        </div>

        {/* RIGHT — Profile Icon */}
        <button
          onClick={() => navigate("profile")}
          className="text-gray-600 hover:text-gray-800"
        >
          <img src="/icons/user.png" className="w-8 h-8" alt="Profile" /> 
        </button>

      </div>
    </div>

      {/* Status Section */}
      <div className="p-3">
        <div className="bg-gray-100 rounded-xl shadow-sm p-4 space-y-0.5">
          <h2 className="text-sm font-semibold text-gray-700">
            Current Status
          </h2>

          {/* Random Disaster Alert */}
          {alert ? (
            <div className={`border rounded-lg p-3 ${alert.color} transition-all`}>
              <p className="font-bold text-lg">⚠️ {alert.event}</p>
              <p className="text-sm mt-1">{alert.desc}</p>
              <p className="text-xs text-gray-600 mt-2">
                Issued by: {alert.sender}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">✅ No active alerts.</p>
          )}

          {/* Weather */}
          {weather ? (
            <div className="flex items-center gap-4">
              <img src={weather.icon} alt="Weather Icon" className="w-10 h-10" />
              <p className="text-sm text-gray-700">
                {weather.location}: {weather.condition}, {weather.temp}°C
              </p>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Fetching weather...</p>
          )}

          {/* Siren Button */}

      </div>

      {/* Main Buttons */}
      <div className="flex-1 p-4 space-y-3">

        {/* SEND SOS - Large prominent button */}
        <button
          onClick={() => navigate("sos")}
          className="w-full bg-red-600 border-4 border-red-400 text-white py-7 rounded-2xl text-3xl font-bold shadow-2xl hover:bg-red-700 transition-all hover:scale-105 animate-pulse"
        >
          SEND SOS
        </button>

        {/* Top Row - Siren + Shelters */}
        <div className="grid grid-cols-2 gap-3">

          {/* ✅ Siren Button (icon on top) */}
          <button
            onClick={playSiren}
            className="bg-yellow-500 border-2 border-yellow-400 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-lg hover:bg-yellow-400 transition-all hover:scale-105"
          >
            <img 
              src="/icons/siren.png"
              alt="Siren" 
              className="w-12 h-12 object-contain"
            />
            <span className="font-semibold text-sm text-center text-black">
              {isPlaying ? "Pause Siren" : "Play Siren"}
            </span>
          </button>

          {/* Shelters button (unchanged) */}
          <button
            onClick={() => navigate("shelters")}
            className="bg-purple-600 border-2 border-purple-400 rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
          >
            <img 
              src="/icons/shelter.png" 
              alt="Shelter" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-center text-white">
              <div className="font-semibold text-sm">Find Nearby</div>
              <div className="text-xs">Shelters</div>
            </div>
          </button>
        </div>

        {/* ✅ Hazard Reports now at the bottom with left icon + right text */}
        <button
          onClick={() => navigate("hazards")}
          className="w-full bg-blue-600 border-2 border-blue-400 rounded-xl p-4 py-6 flex items-center gap-4 shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
        >
          <img
            src="/icons/hazard.png"
            alt="Hazard Reports"
            className="w-12 h-12 object-contain"
          />

          {/* This wrapper centers the text properly */}
          <div className="flex-1 text-center">
            <span className="text-white font-semibold text-2xl">
              Hazard Reports
            </span>
          </div>
        </button>


      </div>
      </div>
    </div>
  );
}