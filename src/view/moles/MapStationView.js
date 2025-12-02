import { CircleMarker, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";

export default function MapStationView({ stations }) {
  return (
    <>
      {stations.map((station, index) => (
        <>
          <CircleMarker
            key={`station-${index}`}
            center={station.latLng}
            radius={STATION_MARKER_RADIUS}
            pathOptions={{
              color: "blue",
              fillColor: "white",
              fillOpacity: 1.0,
            }}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              River: {station.riverName}
              <br />
              Alert Level: {station.alertLevelM}m
              <br />
              Minor Flood: {station.minorFloodLevelM}m
              <br />
              Major Flood: {station.majorFloodLevelM}m
            </Popup>
          </CircleMarker>
          <Marker
            key={`station-label-${index}`}
            position={station.latLng}
            icon={L.divIcon({
              className: "station-label",
              html: `<div style="font-size: ${
                STATION_MARKER_RADIUS * 2
              }px; color: #333; font-weight: 500; white-space: nowrap; margin-left: ${
                STATION_MARKER_RADIUS * 3
              }px;">${station.name}</div>`,
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
