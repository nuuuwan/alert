import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EntIcon from "../atoms/EntIcon";
import { COLORS } from "../_cons/StyleConstants";
import Place from "../../nonview/core/ents/places/Place";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import { Link } from "react-router-dom";

function PlaceLink({ place, distanceM, nameOverride }) {
  let to = "";
  if (place instanceof HydrometricStation) {
    to = `/HydrometricStation/${place.getNameId()}`;
  } else if (place instanceof Place) {
    to = `/Place/${place.latLng.id}`;
  }

  const color = COLORS.neutral;
  return (
    <Link to={to} style={{ textDecoration: "none", color: color }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: 3,
          padding: 0.5,
          margin: 0.5,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: COLORS.primary,
            color: COLORS.white,
            transform: "scale(1.05)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <EntIcon ent={place} size={18} />

        <Typography variant="caption" noWrap>
          {nameOverride || place.title}
        </Typography>

        {distanceM > 1000 && (
          <Typography variant="caption" color="text.secondary">
            {(distanceM / 1000).toFixed(0)}km
          </Typography>
        )}
      </Box>
    </Link>
  );
}

export default PlaceLink;
