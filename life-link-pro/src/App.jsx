import { useState } from "react";
import MobileFrame from "./components/MobileFrame";

import Home from "./pages/Home";
import SOS from "./pages/SOS";
import HazardMap from "./pages/HazardMap";
import AddHazard from "./pages/AddHazard";
import FirstAid from "./pages/FirstAid";
import Profile from "./pages/Profile";
import Shelters from "./pages/Shelters";
import EmergencyFAQ from "./pages/EmergencyFAQ";

export default function App() {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState(null);

  function navigate(p, data = null) {
    setParams(data);
    setPage(p);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blur-overlay">
      <MobileFrame navigate={navigate} current={page}>
        {page === "home" && <Home navigate={navigate} />}
        {page === "sos" && <SOS navigate={navigate} />}
        {page === "hazards" && <HazardMap navigate={navigate} />}
        {page === "addHazard" && <AddHazard navigate={navigate} />}
        {page === "firstAid" && <FirstAid navigate={navigate} />}
        {page === "faq" && <EmergencyFAQ navigate={navigate} />}
        {page === "profile" && <Profile navigate={navigate} />}
        {page === "shelters" && <Shelters navigate={navigate} />}
      </MobileFrame>
    </div>
  );
}
