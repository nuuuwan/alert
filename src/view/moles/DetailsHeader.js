import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EntIcon from "../atoms/EntIcon";
import { COLORS, getAlertColor } from "../_cons/StyleConstants";
import NominatimView from "./NominatimView";
import Divider from "@mui/material/Divider";
import NearbyPlacesView from "./NearbyPlacesView";

export default function DetailsHeader({ ent, supertitleOverride }) {
  const size = 48;
  const color = getAlertColor(ent.alertLevel) || COLORS.neutral;
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <EntIcon ent={ent} size={size} />

        <Typography
          variant="h5"
          sx={{
            lineHeight: `${size}px`,
          }}
          color={color}
        >
          {ent.title}
        </Typography>
      </Box>
      <Typography variant="overline" color="text.secondary">
        {supertitleOverride ? supertitleOverride : ent.supertitle}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {ent.subtitle}
      </Typography>
      <NominatimView latlng={ent.latLng} />
      <NearbyPlacesView latLng={ent.latLng} />
      <Divider sx={{ my: 1 }} />
    </Box>
  );
}
