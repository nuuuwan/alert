import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import RiverStationDetails from "../moles/RiverStationDetails";
import RiverStation from "../../nonview/core/ents/places/RiverStation";

export default function PlaceDetails({ place }) {
  return (
    <Box>
      {place instanceof RiverStation && <RiverStationDetails place={place} />}
      <OpenMeteoView place={place} />
      <SatelliteImageView place={place} />
    </Box>
  );
}
