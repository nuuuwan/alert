import { Polyline, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { RIVER_LINE_WIDTH } from "../_cons/MapConstants";

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

export default function MapRiverView({ rivers, locationMap }) {
  return (
    <>
      {rivers.map((river, index) => {
        const positions = river.locationNames
          .map((name) => locationMap[name])
          .filter((pos) => pos !== undefined);

        if (positions.length < 2) return null;

        const angledPositions = [];
        for (let i = 0; i < positions.length - 1; i++) {
          const segmentPoints = createAngledSegments(
            positions[i],
            positions[i + 1]
          );
          if (i === 0) {
            angledPositions.push(...segmentPoints);
          } else {
            angledPositions.push(...segmentPoints.slice(1));
          }
        }

        const lastPoint = angledPositions[angledPositions.length - 1];
        const secondLastPoint = angledPositions[angledPositions.length - 2];
        const [lat1, lng1] = secondLastPoint;
        const [lat2, lng2] = lastPoint;

        const dLat = lat2 - lat1;
        const dLng = lng2 - lng1;
        const distance = Math.sqrt(dLat * dLat + dLng * dLng);
        const projectionFactor = 0.5;

        const labelLat = lat2 + (dLat / distance) * distance * projectionFactor;
        const labelLng = lng2 + (dLng / distance) * distance * projectionFactor;

        const transform = dLng >= 0 ? "translateX(0)" : "translateX(-100%)";

        return (
          <>
            <Polyline
              key={`river-${index}`}
              positions={angledPositions}
              pathOptions={{
                color: "blue",
                weight: RIVER_LINE_WIDTH,
                opacity: 0.6,
              }}
            >
              <Popup>
                <strong>{river.name}</strong>
                <br />
                Basin: {river.basinName}
              </Popup>
            </Polyline>
            <Marker
              key={`river-label-${index}`}
              position={[labelLat, labelLng]}
              icon={L.divIcon({
                className: "river-label",
                html: `<div style="font-size: ${
                  RIVER_LINE_WIDTH * 2
                }px; color: blue; font-weight: 200; font-style: italic; white-space: nowrap; transform: ${transform}; display: inline-block;">${
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
