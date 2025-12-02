import { Polyline, Popup } from "react-leaflet";

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
            positions[i + 1],
          );
          if (i === 0) {
            angledPositions.push(...segmentPoints);
          } else {
            angledPositions.push(...segmentPoints.slice(1));
          }
        }

        return (
          <Polyline
            key={`river-${index}`}
            positions={angledPositions}
            pathOptions={{ color: "blue", weight: 4, opacity: 0.6 }}
          >
            <Popup>
              <strong>{river.name}</strong>
              <br />
              Basin: {river.basinName}
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
