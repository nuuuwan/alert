import Grid from "@mui/material/Grid";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import OpenElevationView from "../moles/OpenElevationView";
import RecentEarthquakesView from "../moles/RecentEarthquakesView";
import { CircularProgress } from "@mui/material";

export default function DataView({ selectedEnt }) {
  const place = selectedEnt;
  if (!place) {
    return <CircularProgress />;
  }
  return (
    <Grid container spacing={0}>
      {place instanceof HydrometricStation && (
        <Grid size={{ xs: 12, md: 6 }}>
          <HydrometricStationDetails place={place} />
        </Grid>
      )}

      <Grid size={{ xs: 12, md: 6 }}>
        <OpenMeteoView place={place} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <OpenElevationView place={place} />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <SatelliteImageView place={place} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <RecentEarthquakesView place={place} />
      </Grid>
    </Grid>
  );
}
