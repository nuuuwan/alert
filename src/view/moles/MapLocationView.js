import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import LocationDetails from "./LocationDetails";
import { LocationIcon } from "../atoms";
import { COLORS, OPACITY } from "../_cons/StyleConstants";

export default function MapLocationView({ locations, locationToWeather }) {
  return (
    <MapMarkerView
      items={locations}
      markerType="location"
      radius={LOCATION_MARKER_RADIUS}
      pathOptions={{
        color: COLORS.markerGray,
        fillColor: COLORS.markerWhite,
        fillOpacity: OPACITY.full,
      }}
      labelStyle={`color: ${COLORS.markerLabel};`}
      renderPopupContent={(location) => (
        <LocationDetails
          location={location}
          locationToWeather={locationToWeather}
        />
      )}
      formatLabel={(location) => location.name}
      iconComponent={LocationIcon}
    />
  );
}
