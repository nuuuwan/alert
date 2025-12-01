import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Station, Location } from "../../nonview/core";

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Station.listAll().then((loadedStations) => {
      setStations(loadedStations);
    });
    Location.listAll().then((loadedLocations) => {
      setLocations(loadedLocations);
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
      {locations.map((location, index) => (
        <CircleMarker
          key={`location-${index}`}
          center={location.latLng}
          radius={6}
          pathOptions={{ color: "none", fillColor: "gray", fillOpacity: 0.4 }}
        >
          <Popup>
            <strong>{location.name}</strong>
          </Popup>
        </CircleMarker>
      ))}
      {stations.map((station, index) => (
        <CircleMarker
          key={`station-${index}`}
          center={station.latLng}
          radius={8}
          pathOptions={{ color: "none", fillColor: "red", fillOpacity: 0.5 }}
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
