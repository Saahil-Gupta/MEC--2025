import { useEffect, useState } from "react";
import Logo from "/public/icons/logo_logo.png";
import Logo_text from "/public/icons/logo_text.png";

export default function Home({ navigate }) {
  const [weather, setWeather] = useState(null);
  const [alert, setAlert] = useState(null);

  const disasters = [
    {
      event: "Flood Warning",
      desc: "Heavy rainfall causing water levels to rise. Avoid low-lying areas.",
      sender: "National Weather Service",
      color: "bg-blue-100 text-blue-800 border-blue-400",
    },
    {
      event: "Earthquake Alert",
      desc: "Seismic activity detected nearby. Take cover under sturdy furniture.",
      sender: "Geological Safety Agency",
      color: "bg-yellow-100 text-yellow-800 border-yellow-400",
    },
    {
      event: "Hurricane Watch",
      desc: "High winds and heavy rain expected in coastal areas.",
      sender: "Disaster Response Unit",
      color: "bg-red-100 text-red-800 border-red-400",
    },
    {
      event: "Tornado Warning",
      desc: "Seek shelter immediately. Avoid windows and stay indoors.",
      sender: "Emergency Broadcast Center",
      color: "bg-orange-100 text-orange-800 border-orange-400",
    },
    {
      event: "Wildfire Risk",
      desc: "Dry conditions increase fire danger. Avoid open flames.",
      sender: "Forest Fire Management Authority",
      color: "bg-green-100 text-green-800 border-green-400",
    },
    {
      event: "Storm Alert",
      desc: "Severe thunderstorm expected. Stay indoors and unplug electronics.",
      sender: "Weather Safety Bureau",
      color: "bg-purple-100 text-purple-800 border-purple-400",
    },
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * disasters.length);
    setAlert(disasters[randomIndex]);

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
  }, []);

  const playSiren = () => {
    alert("🔊 Siren would play here!");
  };

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
            className="h-16 w-auto object-contain"   // BIGGER LOGO
          />

          <img
            src={Logo_text}
            alt="Life-Link Live"
            className="h-12 w-auto object-contain"  // BIGGER TEXT LOGO
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
      <div className="p-4">
        <div className="bg-gray-100 rounded-xl shadow-sm p-4 space-y-3">
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
            <div className="flex items-center gap-3">
              <img src={weather.icon} alt="Weather Icon" className="w-8 h-8" />
              <p className="text-sm text-gray-700">
                {weather.location}: {weather.condition}, {weather.temp}°C
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

        <button
          onClick={() => navigate("shelters")}
          className="w-full bg-purple-600 text-white py-4 rounded-xl text-lg shadow-md hover:bg-purple-700"
        >
          Find Nearby Shelters
        </button>

      </div>
    </div>
  );
}
