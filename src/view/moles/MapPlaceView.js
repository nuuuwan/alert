import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import LocationDetails from "./LocationDetails";
import { LocationIcon } from "../atoms";
import { COLORS, OPACITY } from "../_cons/StyleConstants";

export default function MapPlaceView({ places, placeToWeather }) {
  return (
    <MapMarkerView
      items={places}
      markerType="place"
      radius={LOCATION_MARKER_RADIUS}
      pathOptions={{
        color: COLORS.markerGray,
        fillColor: COLORS.markerWhite,
        fillOpacity: OPACITY.full,
      }}
      renderPopupContent={(place) => (
        <LocationDetails location={place} locationToWeather={placeToWeather} />
      )}
      iconComponent={LocationIcon}
    />
  );
}
