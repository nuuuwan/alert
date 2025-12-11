import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import NaturalDisasterRisk from "../moles/NaturalDisasterRisk";

export default function PlaceDetails({ place }) {
  return (
    <Box sx={{ p: 1, m: 1, mb: 10 }}>
      {place instanceof HydrometricStation && (
        <HydrometricStationDetails place={place} />
      )}
      <NaturalDisasterRisk place={place} />
      <OpenElevationView place={place} />
      <OpenMeteoView place={place} />
      <SatelliteImageView place={place} />
    </Box>
  );
}
