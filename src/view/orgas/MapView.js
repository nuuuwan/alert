import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DB } from "../../nonview/core";
import MapLocationView from "../moles/MapLocationView";
import MapStationView from "../moles/MapStationView";
import LandslideWarningView from "../moles/LandslideWarningView";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [stationToLatest, setStationToLatest] = useState({});
  const [stationToAlert, setStationToAlert] = useState({});
  const [riverWaterLevelIdx, setRiverWaterLevelIdx] = useState({});
  const [locationToWeather, setLocationToWeather] = useState({});

  useEffect(() => {
    DB.load().then((data) => {
      setStations(data.stations);
      setLocations(data.locations);
      setStationToLatest(data.stationToLatest);
      setStationToAlert(data.stationToAlert);
      setRiverWaterLevelIdx(data.riverWaterLevelIdx);
      setLocationToWeather(data.locationToWeather);
    });
  }, []);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LandslideWarningView />
      <MapLocationView
        locations={locations}
        locationToWeather={locationToWeather}
      />
      <MapStationView
        stations={stations}
        stationToLatest={stationToLatest}
        stationToAlert={stationToAlert}
        riverWaterLevelIdx={riverWaterLevelIdx}
      />
    </MapContainer>
  );
}
