import DetailsHeader from "./DetailsHeader";
import PlaceDetails from "../orgas/PlaceDetails";
import RegionDetails from "../orgas/RegionDetails";
import Place from "../../nonview/core/ents/places/Place";
import Region from "../../nonview/core/ents/regions/Region";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";

function EntChildDetails({ ent }) {
  if (!ent) {
    return <CircularProgress />;
  }
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
      if (ent && typeof ent.loadDetails === "function") {
        const loadedEnt = await ent.loadDetails();
        setEntWithDetails(loadedEnt);
      } else {
        setEntWithDetails(ent);
      }
    }
    fetchDetails();
  }, [ent]);

  return (
    <Box>
      <DetailsHeader ent={ent} supertitleOverride={supertitleOverride} />
      <Divider sx={{ my: 2 }} />
      {<EntChildDetails ent={entWithDetails} />}
    </Box>
  );
}
