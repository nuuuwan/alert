import { CircleMarker, Popup } from "react-leaflet";

export default function MapLocationView({ locations }) {
  return (
    <>
      {locations.map((location, index) => (
        <CircleMarker
          key={`location-${index}`}
          center={location.latLng}
          radius={6}
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
