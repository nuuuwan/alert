import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { DB } from "../../nonview/core";
import MapLocationView from "../moles/MapLocationView";
import MapStationView from "../moles/MapStationView";

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [stationToLatest, setStationToLatest] = useState({});
  const [stationToAlert, setStationToAlert] = useState({});
  const [riverWaterLevelIdx, setRiverWaterLevelIdx] = useState({});
  const [weatherList, setWeatherList] = useState([]);

  useEffect(() => {
    DB.load().then((data) => {
      setStations(data.stations);
      setLocations(data.locations);
      setStationToLatest(data.stationToLatest);
      setStationToAlert(data.stationToAlert);
      setRiverWaterLevelIdx(data.riverWaterLevelIdx);
      setWeatherList(data.weatherList);
    });
  }, []);

  console.debug({ weatherList });

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
