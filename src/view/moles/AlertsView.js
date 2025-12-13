import Grid from "@mui/material/Grid";
import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";
import DetailsHeader from "../moles/DetailsHeader";

export default function AlertsView({ selectedEnt }) {
  const place = selectedEnt;
  if (!place) {
    return null;
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <DetailsHeader ent={place} />
      </Grid>
      <Grid item xs={12} md={6}>
        <NaturalDisasterOfficialView place={place} />
      </Grid>
      <Grid item xs={12} md={6}>
        <NaturalDisasterView place={place} />
      </Grid>
    </Grid>
  );
}
