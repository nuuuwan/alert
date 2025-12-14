import Grid from "@mui/material/Grid";
import NaturalDisasterOfficialView from "./NaturalDisasterOfficialView";
import NaturalDisasterView from "./NaturalDisasterView";

export default function AlertsView({ selectedEnt }) {
  const place = selectedEnt;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={6}>
        <NaturalDisasterOfficialView place={place} />
      </Grid>
      <Grid item xs={12} md={6}>
        <NaturalDisasterView place={place} />
      </Grid>
    </Grid>
  );
}
