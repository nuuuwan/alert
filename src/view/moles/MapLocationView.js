import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import { LocationIcon } from "../atoms";

export default function MapLocationView({ locations }) {
  return (
    <MapMarkerView
      items={locations}
      markerType="location"
      radius={LOCATION_MARKER_RADIUS}
      pathOptions={{ color: "gray", fillColor: "white", fillOpacity: 1 }}
      labelStyle="color: #666;"
      renderPopupContent={(location) => null}
      formatLabel={(station) => ``}
      iconComponent={LocationIcon}
    />
  );
}
