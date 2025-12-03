import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import PlaceDetails from "./PlaceDetails";
import { LocationIcon } from "../atoms";
import { COLORS, OPACITY } from "../_cons/StyleConstants";

export default function MapPlaceView({ places }) {
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
      renderPopupContent={(place) => <PlaceDetails place={place} />}
      iconComponent={LocationIcon}
    />
  );
}
