import MapPlaceView from "../moles/MapPlaceView";
import Box from "@mui/material/Box";
import { useDataContext } from "../../nonview/core/DataContext";
import Place from "../../nonview/core/ents/places/Place";

export default function MapViewInner({ selectedEnt }) {
  const { data } = useDataContext();
  const HydrometricStations = data.hydrometricStations || [];
  const majorCities = data.majorCities || [];

  const places = [selectedEnt, ...HydrometricStations, ...majorCities];
  const deduplicatedPlaces = Place.dedupeByLatLng(places);
  const placesWithAlerts = deduplicatedPlaces.filter(
    (place) => place && place.alertLevel > 0
  );

  return (
    <Box>
      {placesWithAlerts.map(
        (place) =>
          place && place.latLng && <MapPlaceView key={place.id} place={place} />
      )}
    </Box>
  );
}
