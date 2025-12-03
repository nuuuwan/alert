import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DetailsHeader from "./DetailsHeader";
import { SatelliteImageView, LocationIcon, AdminRegionIcon } from "../atoms";
import { COLORS } from "../_cons/StyleConstants";

export default function EntDetails({ ent, fillColor }) {
  if (!ent) {
    return null;
  }

  const hasLatLng = !!ent.latLng;

  const icon = hasLatLng ? LocationIcon : AdminRegionIcon;
  const iconColor = fillColor || COLORS.gray;

  const overlineText = ent.id !== ent.name ? ent.id : undefined;
  const subtitle = ent.constructor.getEntTypeTitle() || "Entity";

  return (
    <Box>
      <DetailsHeader
        overlineText={overlineText}
        title={ent.name}
        titleColor={fillColor}
        subtitle={subtitle}
        icon={icon}
        iconColor={iconColor}
      />

      {hasLatLng && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 1,
            mb: 1,
          }}
        >
          <SatelliteImageView latLng={ent.latLng} name={ent.name} />
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
