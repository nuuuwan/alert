import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import MapEntView from "./MapEntView";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CircularProgress from "@mui/material/CircularProgress";
import Place from "../../nonview/core/ents/Place";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";

export default function MapView() {
  const [places, setPlaces] = useState([]);
  const [dsds, setDSDs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const places = (await Place.listAll()).slice(0, 10);
      const dsds = (await DSD.listAll()).slice(0, 10);
      setPlaces(places);
      setDSDs(dsds);
      setLoaded(true);
    }
    fetchData();
  }, []);

  if (!loaded) {
    return <CircularProgress />;
  }

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

      {places.map(function (place) {
        return <MapEntView key={place.id} ent={place} />;
      })}

      {dsds.map(function (region) {
        return <MapEntView key={region.id} ent={region} />;
      })}
    </MapContainer>
  );
}
