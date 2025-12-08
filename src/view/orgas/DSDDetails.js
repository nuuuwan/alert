import LandslideWarningView from "../atoms/LandslideWarningView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import PlaceDetails from "../orgas/PlaceDetails";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function DSDDetails({ region }) {
  if (!(region instanceof DSD)) {
    throw new Error("region is not a DSD");
  }

  const [centroidPlace, setCentroidPlace] = useState(null);
  useEffect(() => {
    (async () => {
      const place = await region.loadCentroidPlace();
      await place.loadDetails();
      setCentroidPlace(place);
    })();
  }, [region]);

  return (
    <Box>
      <LandslideWarningView
        level={region.latestLandslideWarningLevel}
        timeUt={region.latestLandslideWarningTimeUt}
      />
      <Divider sx={{ my: 2 }} />
      <Typography variant="caption" display="block" gutterBottom>
        The details below are rendered for the centroid of the region.
      </Typography>
      {centroidPlace && <PlaceDetails place={centroidPlace} />}
    </Box>
  );
}
