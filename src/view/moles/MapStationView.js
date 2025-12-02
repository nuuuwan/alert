import { STATION_MARKER_RADIUS } from "../_cons/MapConstants";
import MapMarkerView from "./MapMarkerView";

export default function MapStationView({
  stations,
  stationToLatest,
  stationToColor,
}) {
  return (
    <>
      {stations.map((station, index) => {
        const fillColor = stationToColor[station.name] || "white";
        return (
          <MapMarkerView
            key={`station-group-${index}`}
            items={[station]}
            markerType="station"
            radius={STATION_MARKER_RADIUS}
            pathOptions={{
              color: "blue",
              fillColor: fillColor,
              fillOpacity: 1.0,
            }}
            labelStyle="color: #333; font-weight: 500;"
            formatLabel={(station) => `${station.name} Station`}
            renderPopupContent={(station) => {
              const latestLevel = stationToLatest[station.name];
              if (latestLevel === undefined) {
                return null;
              }

              return (
                <>
                  <strong>{station.name}</strong>
                  <br />
                  River: {station.riverName}
                  <br />
                  {latestLevel && (
                    <>
                      <strong>Current Level: {latestLevel.waterLevelM}m</strong>
                      <br />
                      Time:{" "}
                      {latestLevel.date
                        ? latestLevel.date.toLocaleString()
                        : "N/A"}
                      <br />
                    </>
                  )}
                  Alert Level: {station.alertLevelM}m
                  <br />
                  Minor Flood: {station.minorFloodLevelM}m
                  <br />
                  Major Flood: {station.majorFloodLevelM}m
                </>
              );
            }}
          />
        );
      })}
    </>
  );
}
