import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DetailsHeader from "./DetailsHeader";
import { COLORS } from "../_cons/StyleConstants";
import { AdminRegionIcon } from "../atoms";

export default function RegionDetails({ region, fillColor }) {
  if (!region) {
    return null;
  }

  const iconColor = fillColor || COLORS.gray;

  // Format the admin region type for display
  const adminRegionType = region.entType
    ? region.entType.replace(/_/g, " ").toUpperCase()
    : "Administrative Region";

  return (
    <Box>
      <DetailsHeader
        overlineText={`ID: ${region.id}`}
        title={region.name}
        titleColor={fillColor}
        subtitle={adminRegionType}
        icon={AdminRegionIcon}
        iconColor={iconColor}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="caption" color="text.secondary">
        Administrative Region
      </Typography>
    </Box>
  );
}
