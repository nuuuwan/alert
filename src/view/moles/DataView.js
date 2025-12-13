import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";

export default function DataView({ selectedEnt }) {
  const place = selectedEnt;
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        marginTop: "56px",
        zIndex: 200,
        overflow: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      {place instanceof HydrometricStation && (
        <HydrometricStationDetails place={place} />
      )}
      <OpenElevationView place={place} />
      <OpenMeteoView place={place} />
      <SatelliteImageView place={place} />
      <RecentEarthquakesView place={place} />
    </Box>
  );
}
