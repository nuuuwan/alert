import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EntIcon from "../atoms/EntIcon";
import { COLORS } from "../_cons/StyleConstants";
import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";

function PlaceLink({ place, distanceM, nameOverride }) {
  let href = "";
  if (place instanceof HydrometricStation) {
    href = `/HydrometricStation/${place.name}`;
  } else if (place instanceof Place) {
    href = `/Place/${place.latLng.lat},${place.latLng.lng}`;
  }

  const color = COLORS.neutral;
  return (
    <Button href={href} underline="hover" sx={{ color: color }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          border: "1px solid",
          borderColor: color,
          borderRadius: 2,
          padding: 0.6,
        }}
      >
        <EntIcon ent={place} size={18} />

        {nameOverride || place.title}

        {distanceM > 1000 && (
          <Typography variant="body2" color="text.secondary">
            {(distanceM / 1000).toFixed(0)}km
          </Typography>
        )}
      </Box>
    </Button>
  );
}

export default PlaceLink;
