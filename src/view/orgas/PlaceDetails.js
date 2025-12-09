import Box from "@mui/material/Box";
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
    <Box>
      <NominatimView latlng={place.latLng} />
      <NearbyPlacesView latLng={place.latLng} />
      {place instanceof HydrometricStation && (
        <HydrometricStationDetails place={place} />
      )}
      <NaturalDisasterRisk place={place} />
      <OpenMeteoView place={place} />
      <OpenElevationView place={place} />

      <SatelliteImageView place={place} />
    </Box>
  );
}
