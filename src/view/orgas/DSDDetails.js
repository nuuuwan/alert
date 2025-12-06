import LandslideWarningView from "../atoms/LandslideWarningView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import Box from "@mui/material/Box";

export default function DSDDetails({ region }) {
  if (!(region instanceof DSD)) return null;
  return (
    <Box>
      <LandslideWarningView level={region.latestLandslideWarningLevel} />
    </Box>
  );
}
