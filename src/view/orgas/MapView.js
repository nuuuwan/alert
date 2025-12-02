import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { DB } from "../../nonview/core";
import MapLocationView from "../moles/MapLocationView";
import MapStationView from "../moles/MapStationView";
import MapRiverView from "../moles/MapRiverView";

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [rivers, setRivers] = useState([]);
  const [locationMap, setLocationMap] = useState({});
  const [stationToLatest, setStationToLatest] = useState({});
  const [stationToAlert, setStationToAlert] = useState({});
  const [riverWaterLevelIdx, setRiverWaterLevelIdx] = useState({});

  useEffect(() => {
    DB.load().then((data) => {
      setStations(data.stations);
      setLocations(data.locations);
      setRivers(data.rivers);
      setLocationMap(data.locationMap);
      setStationToLatest(data.stationToLatest);
      setStationToAlert(data.stationToAlert);
      setRiverWaterLevelIdx(data.riverWaterLevelIdx);
    });
  }, []);

  return (
    <MapContainer
      center={[7.8731, 80.7718]}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapRiverView
        rivers={rivers}
        locationMap={locationMap}
        stationToAlert={stationToAlert}
      />
      <MapLocationView locations={locations} />
      <MapStationView
        stations={stations}
        stationToLatest={stationToLatest}
        stationToAlert={stationToAlert}
        riverWaterLevelIdx={riverWaterLevelIdx}
      />
    </MapContainer>
  );
}
