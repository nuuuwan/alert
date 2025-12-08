import LandslideWarningView from "../atoms/LandslideWarningView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import PlaceLink from "../atoms/PlaceLink";
import Divider from "@mui/material/Divider";
import SexAgeView from "../moles/SexAgeView";

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
      <SexAgeView
        sexAgeData={region.sexAgeData}
        areaSqKm={`${region.areaSqKm.toFixed(0)} km²`}
      />
      <LandslideWarningView
        level={region.latestLandslideWarningLevel}
        timeUt={region.latestLandslideWarningTimeUt}
      />
      <Divider sx={{ my: 2 }} />
      {centroidPlace && <PlaceLink place={centroidPlace} distanceM={0} />}
    </Box>
  );
}
