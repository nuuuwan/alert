import DetailsHeader from "./DetailsHeader";
import PlaceDetails from "../orgas/PlaceDetails";
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
    return null;
  }
  throw new Error("Unknown ent class: " + ent.constructor.name);
}

export default function EntDetails({ ent }) {
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

  if (!entWithDetails) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <DetailsHeader ent={entWithDetails} />
      <EntChildDetails ent={entWithDetails} />
    </Box>
  );
}
