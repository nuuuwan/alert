import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Station, Location, River } from "../../nonview/core";
import MapLocationView from "../moles/MapLocationView";
import MapStationView from "../moles/MapStationView";
import MapRiverView from "../moles/MapRiverView";

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
      }
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
      <MapRiverView rivers={rivers} locationMap={locationMap} />
      <MapLocationView locations={locations} />
      <MapStationView stations={stations} />
    </MapContainer>
  );
}
