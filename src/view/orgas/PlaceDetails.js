import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import EntDetails from "../moles/EntDetails";

export default function PlaceDetails({ place }) {
  return (
    <Box>
      <EntDetails ent={place} />
      <OpenMeteoView openMeteoData={place.openMeteoData} />
      <SatelliteImageView latLng={place.latLng} name={place.name} />
    </Box>
  );
}
