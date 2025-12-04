import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DB } from "../../nonview/core";
import MapEntView from "../moles/MapEntView";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CircularProgress from "@mui/material/CircularProgress";

export default function MapView() {
  const [dbResults, setDBResults] = useState(null);

  useEffect(() => {
    const dbResults = async () => {
      const results = await DB.load();
      setDBResults(results);
    };
    dbResults();
  }, []);

  if (!dbResults) {
    return <CircularProgress />;
  }

  const { activePlaces, activeRegions, idToEventNameToEventListMap } =
    dbResults;

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

      {activePlaces.map(function (place) {
        const eventClassNameToEventList = idToEventNameToEventListMap[place.id];

        return (
          <MapEntView
            key={place.id}
            ent={place}
            eventClassNameToEventList={eventClassNameToEventList}
          />
        );
      })}

      {activeRegions.map(function (region) {
        const eventClassNameToEventList =
          idToEventNameToEventListMap[region.id];
        return (
          <MapEntView
            key={region.id}
            ent={region}
            eventClassNameToEventList={eventClassNameToEventList}
            pathOptions={{ fill: "red" }}
          />
        );
      })}
    </MapContainer>
  );
}
