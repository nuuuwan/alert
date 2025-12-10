import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EntIcon from "../atoms/EntIcon";
import { COLORS } from "../_cons/StyleConstants";
import { Link } from "react-router-dom";

function PlaceLink({ place, distanceM, nameOverride }) {
  let to = place.url;

  const color = COLORS.neutral;
  return (
    <Link to={to} style={{ textDecoration: "none", color: color }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.125,
          borderRadius: 2,
          padding: 0.25,
          margin: 0.25,
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

        <Typography variant="caption" color="text.secondary">
          {distanceM > 1000 ? (distanceM / 1000).toFixed(0) + "km" : "<1km"}
        </Typography>
      </Box>
    </Link>
  );
}

export default PlaceLink;
