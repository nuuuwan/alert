import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import NaturalDisasterView from "../moles/NaturalDisasterView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";
import NaturalDisasterOfficialView from "../moles/NaturalDisasterOfficialView";

export default function PlaceDetails({ place }) {
  return (
    <Box sx={{ p: 1, m: 1, mb: 10 }}>
      <NaturalDisasterOfficialView place={place} />
      <NaturalDisasterView place={place} />
      {place instanceof HydrometricStation && (
        <HydrometricStationDetails place={place} />
      )}
      <OpenMeteoView place={place} />
      <OpenElevationView place={place} />
      <SatelliteImageView place={place} />
      <RecentEarthquakesView place={place} />
    </Box>
  );
}
