import { useState } from "react";
import MobileFrame from "./components/MobileFrame";

import Home from "./pages/Home";
import SOS from "./pages/SOS";
import HazardMap from "./pages/HazardMap";
import AddHazard from "./pages/AddHazard";
import FirstAid from "./pages/FirstAid";

export default function App() {
  const [page, setPage] = useState("home");
  const [params, setParams] = useState(null);

  function navigate(p, data = null) {
    setParams(data);
    setPage(p);
  }

  return (
    <MobileFrame>
      {page === "home" && <Home navigate={navigate} />}

      {page === "sos" && <SOS navigate={navigate} />}

      {page === "hazards" && <HazardMap navigate={navigate} />}

      {page === "addHazard" && (
        <AddHazard navigate={navigate} lat={params.lat} lng={params.lng} />
      )}

      {page === "firstAid" && <FirstAid navigate={navigate} />}
    </MobileFrame>
  );
}
