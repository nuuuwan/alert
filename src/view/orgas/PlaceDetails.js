import Box from "@mui/material/Box";
import SatelliteImageView from "../atoms/SatelliteImageView";
import OpenMeteoView from "../moles/OpenMeteoView";
import HydrometricStationDetails from "../moles/HydrometricStationDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import NearbyPlacesView from "../moles/NearbyPlacesView";

export default function PlaceDetails({ place }) {
  return (
    <Box>
      <NearbyPlacesView latLng={place.latLng} />
      {place instanceof HydrometricStation && (
        <HydrometricStationDetails place={place} />
      )}
      <OpenMeteoView place={place} />
      <SatelliteImageView place={place} />
    </Box>
  );
}
