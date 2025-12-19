import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import MapViewInner from "./MapViewInner";
import MapCrosshair from "../atoms/MapCrosshair";
import LatLng from "../../nonview/base/geos/LatLng";
import Box from "@mui/material/Box";
import AlertLegend from "../atoms/AlertLegend";
import CurrentLocationButton from "../atoms/CurrentLocationButton";
import Place from "../../nonview/core/ents/places/Place";
import { useNavigate } from "react-router-dom";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";

function MapEventHandler({ onMapMoveEnd }) {
  useMapEvents({
    dragend: (e) => {
      const latLng = LatLng.fromRaw([
        e.target.getCenter().lat,
        e.target.getCenter().lng,
      ]);
      onMapMoveEnd(latLng);
    },
    click: (e) => {
      const latLng = LatLng.fromRaw([e.latlng.lat, e.latlng.lng]);
      onMapMoveEnd(latLng);
    },
  });
  return null;
}

function MapCenterUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export default function MapView({
  mapLatLng,
  setMapLatLng,
  //
  setPageMode,
  pageMode,
}) {
  const [clickPoint, setClickPoint] = useState(null);
  const navigate = useNavigate();
  const center = mapLatLng.raw() || DEFAULT_CENTER;
  const zoom = DEFAULT_ZOOM;

  const onMapMoveEnd = async (latLng) => {
    const place = Place.fromLatLng(latLng);
    navigate(place.url);
    setMapLatLng(latLng);
  };

  const onMapClick = (containerPoint) => {
    setClickPoint(containerPoint);
    setTimeout(() => setClickPoint(null), 300);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 100,
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterUpdater center={center} />
        <MapEventHandler onMapMoveEnd={onMapMoveEnd} onMapClick={onMapClick} />

        <MapViewInner setPageMode={setPageMode} />

        {pageMode === "Map" && (
          <Box>
            <MapCrosshair />

            {clickPoint && (
              <Box
                sx={{
                  position: "absolute",
                  left: clickPoint.x,
                  top: clickPoint.y,
                  width: "20px",
                  height: "20px",
                  marginLeft: "-10px",
                  marginTop: "-10px",
                  border: "2px solid #d32f2f",
                  borderRadius: "50%",
                  boxShadow: "inset 0 0 4px #d32f2f",
                  pointerEvents: "none",
                  zIndex: 999,
                }}
              />
            )}

            <AlertLegend />
            <CurrentLocationButton />
          </Box>
        )}
      </MapContainer>
    </Box>
  );
}
