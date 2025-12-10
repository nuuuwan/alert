import DetailsHeader from "./DetailsHeader";
import PlaceDetails from "../orgas/PlaceDetails";
import RegionDetails from "../orgas/RegionDetails";
import Place from "../../nonview/core/ents/places/Place";
import Region from "../../nonview/core/ents/regions/Region";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

function EntChildDetails({ ent }) {
  if (ent instanceof Place) {
    return <PlaceDetails place={ent} />;
  }
  if (ent instanceof Region) {
    return <RegionDetails region={ent} />;
  }
  throw new Error("Unknown ent class: " + ent.constructor.name);
}

export default function EntDetails({ ent, supertitleOverride }) {
  const [entWithDetails, setEntWithDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      if (ent) {
        const loadedEnt = await ent.loadDetails();
        setEntWithDetails(loadedEnt);
      }
    }
    fetchDetails();
  }, [ent]);

  if (!entWithDetails) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ m: 1, p: 1 }}>
      <Box sx={{ position: "relative", top: 0, left: 0, right: 0 }}>
        <DetailsHeader ent={ent} supertitleOverride={supertitleOverride} />
      </Box>
      <Box sx={{ overflowY: "scroll", maxHeight: "80vh", mt: 2 }}>
        <EntChildDetails ent={entWithDetails} />
      </Box>
    </Box>
  );
}
