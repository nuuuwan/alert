import { Polyline, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { RIVER_LINE_WIDTH } from "../_cons/MapConstants";
import { Alert } from "../../nonview/core";

// Helper function to create intermediate points at 45-degree angles
function createAngledSegments(start, end) {
  const [lat1, lng1] = start;
  const [lat2, lng2] = end;

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const latDir = Math.sign(dLat);
  const lngDir = Math.sign(dLng);

  const absLat = Math.abs(dLat);
  const absLng = Math.abs(dLng);

  if (absLat > absLng) {
    const third = absLat / 3;
    const point1 = [lat1 + latDir * third, lng1];
    const point2 = [lat1 + latDir * 2 * third, lng1 + lngDir * absLng];
    return [start, point1, point2, end];
  } else {
    const third = absLng / 3;
    const point1 = [lat1, lng1 + lngDir * third];
    const point2 = [lat1 + latDir * absLat, lng1 + lngDir * 2 * third];
    return [start, point1, point2, end];
  }
}

export default function MapRiverView({ rivers, locationMap, stationToAlert }) {
  const getHigherAlert = (alert1, alert2) => {
    return alert1.level > alert2.level ? alert1 : alert2;
  };

  const alertToColor = (alert) => {
    const [r, g, b] = alert.color;
    return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
  };

  return (
    <>
      {rivers.map((river, index) => {
        const positions = river.locationNames
          .map((name) => locationMap[name])
          .filter((pos) => pos !== undefined);

        if (positions.length < 2) return null;

        // Build segments with their alerts
        const segments = [];
        for (let i = 0; i < positions.length - 1; i++) {
          const startName = river.locationNames[i];
          const endName = river.locationNames[i + 1];
          const startAlert = stationToAlert[startName] || Alert.NO_DATA;
          const endAlert = stationToAlert[endName] || Alert.NO_DATA;
          const segmentAlert = getHigherAlert(startAlert, endAlert);

          const segmentPoints = createAngledSegments(
            positions[i],
            positions[i + 1]
          );

          segments.push({
            points: segmentPoints,
            alert: segmentAlert,
            color: alertToColor(segmentAlert),
          });
        }

        // Flatten all positions for label calculation
        const angledPositions = [];
        segments.forEach((segment, i) => {
          if (i === 0) {
            angledPositions.push(...segment.points);
          } else {
            angledPositions.push(...segment.points.slice(1));
          }
        });

        const lastPoint = angledPositions[angledPositions.length - 1];
        const secondLastPoint = angledPositions[angledPositions.length - 2];
        const [lat1, lng1] = secondLastPoint;
        const [lat2, lng2] = lastPoint;

        const dLat = lat2 - lat1;
        const dLng = lng2 - lng1;
        const distance = Math.sqrt(dLat * dLat + dLng * dLng);
        const projectionFactor = 0.1;

        const labelLat = lat2 + (dLat / distance) * distance * projectionFactor;
        const labelLng = lng2 + (dLng / distance) * distance * projectionFactor;

        const transform = dLng >= 0 ? "translateX(0)" : "translateX(-100%)";

        return (
          <>
            {segments.map((segment, segIndex) => (
              <Polyline
                key={`river-${index}-segment-${segIndex}`}
                positions={segment.points}
                pathOptions={{
                  color: segment.color,
                  weight: RIVER_LINE_WIDTH,
                  opacity: 0.6,
                }}
              >
                <Popup>
                  <strong>{river.name}</strong>
                  <br />
                  {river.basinName} Basin
                </Popup>
              </Polyline>
            ))}
            <Marker
              key={`river-label-${index}`}
              position={[labelLat, labelLng]}
              icon={L.divIcon({
                className: "river-label",
                html: `<div style="font-family: 'Ubuntu Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: ${
                  RIVER_LINE_WIDTH * 2
                }px; color: grey; font-weight: 200; font-style: italic; white-space: nowrap; transform: ${transform}; display: inline-block;">${
                  river.name
                }</div>`,
                iconSize: [0, 0],
                iconAnchor: [0, 0],
              })}
              interactive={false}
            />
          </>
        );
      })}
    </>
  );
}
