import { useEffect, useState } from "react";
import StatusBar from "../components/StatusBar";
import BottomNav from "../components/BottomNav";

export default function MobileFrame({ children, navigate, current }) {
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
  }, []); 

  
  const enhancedChild = children
    ? Array.isArray(children)
      ? children.map((child) =>
          child.type && child.type.name === "Home"
            ? { ...child, props: { ...child.props, alert } }
            : child
        )
      : children.type && children.type.name === "Home"
      ? { ...children, props: { ...children.props, alert } }
      : children
    : null;

  return (
    <div className="w-full h-screen flex justify-center items-start bg-gray-200 overflow-auto">
      <div
        className="
          w-[390px]
          h-[800px]
          bg-white
          rounded-[40px]
          border-[12px]
          border-black
          shadow-2xl
          overflow-hidden
          mt-6
          flex flex-col
        "
      >
        <StatusBar />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {enhancedChild}
        </div>

        {/* BOTTOM NAV */}
        <BottomNav navigate={navigate} current={current} />
      </div>
    </div>
  );
}