import { CircleMarker, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { LOCATION_MARKER_RADIUS } from "../_cons/MapConstants";

export default function MapLocationView({ locations }) {
  return (
    <>
      {locations.map((location, index) => (
        <>
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
          <Marker
            key={`location-label-${index}`}
            position={location.latLng}
            icon={L.divIcon({
              className: "location-label",
              html: `<div style="font-size: ${
                LOCATION_MARKER_RADIUS * 2
              }px; color: #666; white-space: nowrap; margin-left: ${
                LOCATION_MARKER_RADIUS * 4
              }px;">${location.name}</div>`,
              iconSize: [0, 0],
              iconAnchor: [0, 0],
            })}
            interactive={false}
          />
        </>
      ))}
    </>
  );
}
