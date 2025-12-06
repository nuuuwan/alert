import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import EntDetails from "../moles/EntDetails";

export default function PlaceDetails({ place }) {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 1,
          mb: 1,
        }}
      >
        <EntDetails ent={place} />
        <OpenMeteoView latLng={place.latLng} name={place.name} />
        <SatelliteImageView latLng={place.latLng} name={place.name} />
      </Box>
    </Box>
  );
}
