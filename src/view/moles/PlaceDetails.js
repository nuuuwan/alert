import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DetailsHeader from "./DetailsHeader";
import { SatelliteImageView, LocationIcon } from "../atoms";
import { COLORS } from "../_cons/StyleConstants";

export default function PlaceDetails({ place }) {
  return (
    <Box>
      <DetailsHeader
        title={place.name}
        subtitle="Place"
        icon={LocationIcon}
        iconColor={COLORS.gray}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 1,
          mb: 1,
        }}
      >
        <SatelliteImageView latLng={place.latLng} name={place.name} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="caption" color="text.secondary">
        Geographic Location
      </Typography>
    </Box>
  );
}
