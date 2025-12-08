import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import EntIcon from "../atoms/EntIcon";
import { COLORS } from "../_cons/StyleConstants";
import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";

function PlaceLink({ place, distanceM }) {
  let href = "";
  if (place instanceof HydrometricStation) {
    href = `/HydrometricStation/${place.name}`;
  } else if (place instanceof Place) {
    href = `/Place/${place.latLng.lat},${place.latLng.lng}`;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        padding: 1,
      }}
    >
      <EntIcon ent={place} size={18} />
      <Link href={href} underline="hover" sx={{ color: COLORS.neutral }}>
        {place.name}
      </Link>
      <Typography variant="body2" color="text.secondary">
        {(distanceM / 1000).toFixed(1)}km
      </Typography>
    </Box>
  );
}

export default PlaceLink;
