import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import NearbyPlacesView from "../moles/NearbyPlacesView";
import NominatimView from "../moles/NominatimView";
import OpenElevationView from "../moles/OpenElevationView";
import NaturalDisasterRisk from "../moles/NaturalDisasterRisk";

export default function PlaceDetails({ place }) {
  return (
    <Box sx={{ p: 1, m: 1, mb: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <NominatimView latlng={place.latLng} />
          <NearbyPlacesView latLng={place.latLng} />
          {place instanceof HydrometricStation && (
            <HydrometricStationDetails place={place} />
          )}
          <NaturalDisasterRisk place={place} />
          <OpenElevationView place={place} />
          <OpenMeteoView place={place} />
        </Grid>

        <Grid item xs={12} md={6}>
          <SatelliteImageView place={place} />
        </Grid>
      </Grid>
    </Box>
  );
}
