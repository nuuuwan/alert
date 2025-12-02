import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
} from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Station, Location, River } from "../../nonview/core";

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [rivers, setRivers] = useState([]);
  const [locationMap, setLocationMap] = useState({});

  useEffect(() => {
    Promise.all([Station.listAll(), Location.listAll(), River.listAll()]).then(
      ([loadedStations, loadedLocations, loadedRivers]) => {
        setStations(loadedStations);
        setLocations(loadedLocations);
        setRivers(loadedRivers);

        // Create a map of location names to coordinates
        const map = {};
        loadedStations.forEach((station) => {
          map[station.name] = station.latLng;
        });
        loadedLocations.forEach((location) => {
          map[location.name] = location.latLng;
        });
        setLocationMap(map);
      },
    );
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
      {rivers.map((river, index) => {
        const positions = river.locationNames.map((name) => locationMap[name]);
        return (
          <Polyline
            key={`river-${index}`}
            positions={positions}
            pathOptions={{ color: "blue", weight: 2 }}
          >
            <Popup>
              <strong>{river.name}</strong>
              <br />
              Basin: {river.basinName}
            </Popup>
          </Polyline>
        );
      })}
      {locations.map((location, index) => (
        <CircleMarker
          key={`location-${index}`}
          center={location.latLng}
          radius={6}
          pathOptions={{ color: "none", fillColor: "gray", fillOpacity: 1 }}
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
    </MapContainer>
  );
}
