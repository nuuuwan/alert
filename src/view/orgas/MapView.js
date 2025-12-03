import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DB } from "../../nonview/core";
import MapLocationView from "../moles/MapLocationView";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";

export default function MapView() {
  const [places, setPlaces] = useState([]);

  console.debug(places);
  useEffect(() => {
    DB.load().then((data) => {
      setPlaces(data.places);
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

      <MapLocationView locations={places} />
    </MapContainer>
  );
}
