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
              color: fillColor,
              fillColor: "white",
              fillOpacity: 1.0,
            }}
            labelStyle="color: #333; font-weight: 500;"
            formatLabel={(station) => `${station.name} Station`}
            renderPopupContent={(station) => {
              const latestLevel = stationToLatest[station.name];
              const alert = station.getAlert(latestLevel.waterLevelM);
              const [r, g, b] = alert.color;
              const alertColor = `rgb(${r * 255}, ${g * 255}, ${b * 255})`;

              const date = latestLevel.date;
              const formattedDate = date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <>
                  <h3>{station.riverName}</h3>
                  <h1>{station.name}</h1>

                  <h3>{latestLevel.waterLevelM.toFixed(2)}m</h3>
                  <p>
                    {"As of "}
                    <strong>{formattedDate}</strong>
                  </p>
                  <p style={{ color: alertColor }}>{alert.label}</p>
                </>
              );
            }}
          />
        );
      })}
    </>
  );
}
