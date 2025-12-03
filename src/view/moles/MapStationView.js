import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";
import StationDetails from "./StationDetails";
import { GaugeStationIcon } from "../atoms";
import { COLORS, OPACITY } from "../_cons/StyleConstants";

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
        const fillColor = alert ? alert.colorRgb : COLORS.markerWhite;
        return (
          <MapMarkerView
            key={`station-group-${index}`}
            items={[station]}
            markerType="station"
            radius={STATION_MARKER_RADIUS}
            pathOptions={{
              color: fillColor,
              fillColor: COLORS.markerWhite,
              fillOpacity: OPACITY.full,
            }}
            renderPopupContent={(station) => (
              <StationDetails
                station={station}
                stationToLatest={stationToLatest}
                riverWaterLevelIdx={riverWaterLevelIdx}
              />
            )}
            getFileName={getFileName}
            iconComponent={GaugeStationIcon}
          />
        );
      })}
    </>
  );
}
