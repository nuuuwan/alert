import DetailsHeader from "./DetailsHeader";
import PlaceDetails from "../orgas/PlaceDetails";
import Place from "../../nonview/core/ents/places/Place";
import Region from "../../nonview/core/ents/regions/Region";
import Box from "@mui/material/Box";

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
  if (!ent) {
    return null;
  }

  return (
    <Box>
      <DetailsHeader ent={ent} />
      <EntChildDetails ent={ent} />
    </Box>
  );
}
