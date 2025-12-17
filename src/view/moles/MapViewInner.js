import MapPlaceView from "../moles/MapPlaceView";
import Box from "@mui/material/Box";
import { useDataContext } from "../../nonview/core/DataContext";
import Place from "../../nonview/core/ents/places/Place";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

export default function MapViewInner({ setPageMode }) {
  const { data } = useDataContext();
  const { selectedEnt } = useSelectedEntDataContext();

  const HydrometricStations = data.hydrometricStations || [];
  const majorCities = data.majorCities || [];

  const places = [...HydrometricStations, ...majorCities];
  const placesWithAlerts = places.filter(
    (place) => place && place.alertLevel > 0
  );
  const deduplicatedPlaces = Place.dedupeByLatLng([
    ...placesWithAlerts,
    selectedEnt,
  ]);

  if (!deduplicatedPlaces) {
    return <CircularProgress />;
  }

  return (
    <Box>
      {deduplicatedPlaces.map(
        (place) =>
          place &&
          place.latLng && (
            <MapPlaceView
              key={place.id}
              place={place}
              setPageMode={setPageMode}
            />
          )
      )}
    </Box>
  );
}
