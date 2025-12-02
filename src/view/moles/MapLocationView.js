import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";

export default function MapLocationView({ locations }) {
  return (
    <MapMarkerView
      items={locations}
      markerType="location"
      radius={LOCATION_MARKER_RADIUS}
      pathOptions={{ color: "none", fillColor: "gray", fillOpacity: 1 }}
      labelStyle="color: #666;"
      renderPopupContent={(location) => <strong>{location.name}</strong>}
    />
  );
}
