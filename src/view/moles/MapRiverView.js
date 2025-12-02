import { Polyline, Popup } from "react-leaflet";

export default function MapRiverView({ rivers, locationMap }) {
  return (
    <>
      {rivers.map((river, index) => {
        const positions = river.locationNames
          .map((name) => locationMap[name])
          .filter((pos) => pos !== undefined);

        if (positions.length < 2) return null;

        return (
          <Polyline
            key={`river-${index}`}
            positions={positions}
            pathOptions={{ color: "blue", weight: 2, opacity: 0.6 }}
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
