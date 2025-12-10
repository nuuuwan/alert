import LandslideWarningView from "../atoms/LandslideWarningView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import Box from "@mui/material/Box";
import SexAgeView from "../moles/SexAgeView";

export default function DSDDetails({ region }) {
  if (!(region instanceof DSD)) {
    throw new Error("region is not a DSD");
  }

  return (
    <Box>
      <LandslideWarningView
        level={region.latestLandslideWarningLevel}
        timeUt={region.latestLandslideWarningTimeUt}
      />
      <SexAgeView
        sexAgeData={region.sexAgeData}
        areaSqKm={`${region.areaSqKm.toFixed(0)} km²`}
      />
    </Box>
  );
}
