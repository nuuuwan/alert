import { CircleMarker, Popup } from "react-leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons";

export default function MapLocationView({ locations }) {
  return (
    <>
      {locations.map((location, index) => (
        <CircleMarker
          key={`location-${index}`}
          center={location.latLng}
          radius={LOCATION_MARKER_RADIUS}
          pathOptions={{ color: "none", fillColor: "gray", fillOpacity: 1 }}
        >
          <Popup>
            <strong>{location.name}</strong>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}
