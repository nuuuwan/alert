import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DetailsHeader from "./DetailsHeader";
import { COLORS } from "../_cons/StyleConstants";
import { LocationIcon } from "../atoms";

export default function RegionDetails({ region }) {
  if (!region) {
    return null;
  }

  return (
    <Box>
      <DetailsHeader
        overlineText={region.entType}
        title={region.name}
        subtitle={`ID: ${region.id}`}
        icon={LocationIcon}
        iconColor={COLORS.gray}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="caption" color="text.secondary">
        Administrative Region
      </Typography>
    </Box>
  );
}
