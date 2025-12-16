import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import CustomTab from "../atoms/CustomTab";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";
import { CircularProgress } from "@mui/material";

export default function DataView({ selectedEnt }) {
  const [activeTab, setActiveTab] = useState(0);
  const place = selectedEnt;

  if (!place) {
    return <CircularProgress />;
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabIndex = {
    hydrometric: 0,
    weather: 1,
    elevation: 2,
    satellite: 3,
    earthquakes: 4,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {place instanceof HydrometricStation && (
          <CustomTab label="Hydrometric" />
        )}
        <CustomTab label="Weather" />
        <CustomTab label="Elevation" />
        <CustomTab label="Satellite" />
        <CustomTab label="Earthquakes" />
      </Tabs>

      <Box sx={{ p: 2 }}>
        {place instanceof HydrometricStation &&
          activeTab === tabIndex.hydrometric && (
            <HydrometricStationDetails place={place} />
          )}

        {activeTab ===
          (place instanceof HydrometricStation ? tabIndex.weather : 0) && (
          <OpenMeteoView place={place} />
        )}

        {activeTab ===
          (place instanceof HydrometricStation ? tabIndex.elevation : 1) && (
          <OpenElevationView place={place} />
        )}

        {activeTab ===
          (place instanceof HydrometricStation ? tabIndex.satellite : 2) && (
          <SatelliteImageView place={place} />
        )}

        {activeTab ===
          (place instanceof HydrometricStation ? tabIndex.earthquakes : 3) && (
          <RecentEarthquakesView place={place} />
        )}
      </Box>
    </Box>
  );
}
