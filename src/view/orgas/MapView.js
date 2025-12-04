import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import MapEntView from "../moles/MapEntView";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CircularProgress from "@mui/material/CircularProgress";
import DB from "../../nonview/core/DB";

export default function MapView() {
  const [dbResults, setDbResults] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const dbResults = await DB.load();
      setDbResults(dbResults);
    }
    fetchData();
  }, []);

  if (!dbResults) {
    return <CircularProgress />;
  }

  const { places, dsds } = dbResults;

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
