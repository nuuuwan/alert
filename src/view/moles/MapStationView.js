import { CircleMarker, Popup } from "react-leaflet";

export default function MapStationView({ stations }) {
  return (
    <>
      {stations.map((station, index) => (
        <CircleMarker
          key={`station-${index}`}
          center={station.latLng}
          radius={8}
          pathOptions={{ color: "none", fillColor: "red", fillOpacity: 1.0 }}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            River: {station.riverName}
            <br />
            Alert Level: {station.alertLevelM}m
            <br />
            Minor Flood: {station.minorFloodLevelM}m
            <br />
            Major Flood: {station.majorFloodLevelM}m
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
}
