import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Station } from "../../nonview/core";

export default function MapView() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    Station.loadStations().then((loadedStations) => {
      setStations(loadedStations);
    });
  }, []);

  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station, index) => (
        <CircleMarker
          key={index}
          center={[station.latitude, station.longitude]}
          radius={8}
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
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
    </MapContainer>
  );
}
