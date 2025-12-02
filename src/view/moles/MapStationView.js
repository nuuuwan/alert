import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";

export default function MapStationView({ stations }) {
  return (
    <MapMarkerView
      items={stations}
      markerType="station"
      radius={STATION_MARKER_RADIUS}
      pathOptions={{
        color: "blue",
        fillColor: "white",
        fillOpacity: 1.0,
      }}
      labelStyle="color: #333; font-weight: 500;"
      formatLabel={(station) => `${station.name} Station`}
      renderPopupContent={(station) => (
        <>
          <strong>{station.name}</strong>
          <br />
          River: {station.riverName}
          <br />
          Alert Level: {station.alertLevelM}m
          <br />
          Minor Flood: {station.minorFloodLevelM}m
          <br />
          Major Flood: {station.majorFloodLevelM}m
        </>
      )}
    />
  );
}
