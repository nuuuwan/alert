import { MapContainer, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DB } from "../../nonview/core";
import MapPlaceView from "../moles/MapPlaceView";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CircularProgress from "@mui/material/CircularProgress";
import MapRegionView from "../moles/MapRegionView";

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
          <MapPlaceView
            key={place.id}
            place={place}
            eventClassNameToEventList={eventClassNameToEventList}
          />
        );
      })}

      {activeRegions.map(function (region) {
        const eventClassNameToEventList =
          idToEventNameToEventListMap[region.id];
        return (
          <MapRegionView
            key={region.id}
            region={region}
            eventClassNameToEventList={eventClassNameToEventList}
            pathOptions={{ fill: "red" }}
          />
        );
      })}
    </MapContainer>
  );
}
