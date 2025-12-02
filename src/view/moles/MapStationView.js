import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import StationDetails from "./StationDetails";

export default function MapStationView({
  stations,
  stationToLatest,
  stationToAlert,
  riverWaterLevelIdx,
}) {
  return (
    <>
      {stations.map((station, index) => {
        const alert = stationToAlert[station.name];
        const fillColor = alert ? alert.colorRgb : "white";
        return (
          <MapMarkerView
            key={`station-group-${index}`}
            items={[station]}
            markerType="station"
            radius={STATION_MARKER_RADIUS}
            pathOptions={{
              color: fillColor,
              fillColor: "white",
              fillOpacity: 1.0,
            }}
            labelStyle="color: #333; font-weight: 500;"
            formatLabel={(station) => `${station.name} Station`}
            renderPopupContent={(station) => (
              <StationDetails
                station={station}
                stationToLatest={stationToLatest}
                riverWaterLevelIdx={riverWaterLevelIdx}
              />
            )}
          />
        );
      })}
    </>
  );
}
