import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import EntDetails from "../moles/EntDetails";
import Typography from "@mui/material/Typography";

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

        <OpenMeteoView openMeteoData={place.openMeteoData} />
        <SatelliteImageView latLng={place.latLng} name={place.name} />
      </Box>
    </Box>
  );
}
