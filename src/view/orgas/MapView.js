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

  const { ents, roleIdxNdx, eventIdxNdxTdx, alertIdxNdxTdx } = dbResults;

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

      {ents.map(function (place) {
        const roleNdx = roleIdxNdx[place.id] || {};
        const eventNdxIdx = eventIdxNdxTdx[place.id] || {};
        const alertNdxIdx = alertIdxNdxTdx[place.id] || {};
        const dbResultsForEnt = {
          roleNdx,
          eventNdxIdx,
          alertNdxIdx,
        };
        return (
          <MapEntView
            key={place.id}
            ent={place}
            dbResultsForEnt={dbResultsForEnt}
          />
        );
      })}
    </MapContainer>
  );
}
