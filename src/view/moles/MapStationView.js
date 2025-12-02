import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import StationDetails from "./StationDetails";

export default function MapStationView({
  stations,
  stationToLatest,
  stationToAlert,
  riverWaterLevelIdx,
}) {
  const getFileName = (station) => {
    const latestLevel = stationToLatest[station.name];
    if (!latestLevel) return `${station.name}-station.png`;

    const date = latestLevel.date;
    const timestamp = date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${station.name}-${timestamp}.png`;
  };

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
            getFileName={getFileName}
          />
        );
      })}
    </>
  );
}
