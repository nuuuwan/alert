import Grid from "@mui/material/Grid";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";

export default function DataView({ selectedEnt }) {
  const place = selectedEnt;
  if (!place) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      {place instanceof HydrometricStation && (
        <Grid item xs={12} md={6}>
          <HydrometricStationDetails place={place} />
        </Grid>
      )}

      <Grid item xs={12} md={6}>
        <OpenElevationView place={place} />
      </Grid>

      <Grid item xs={12} md={6}>
        <OpenMeteoView place={place} />
      </Grid>

      <Grid item xs={12} md={6}>
        <SatelliteImageView place={place} />
      </Grid>
      <Grid item xs={12} md={6}>
        <RecentEarthquakesView place={place} />
      </Grid>
    </Grid>
  );
}
