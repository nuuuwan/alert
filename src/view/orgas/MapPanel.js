import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import MapViewInner from "./MapViewInner";
import MapCrosshair from "../atoms/MapCrosshair";
import LatLng from "../../nonview/base/geos/LatLng";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { COLORS } from "../_cons/StyleConstants";
import AlertLegend from "../atoms/AlertLegend";
function MapEventHandler({ onMapMoveEnd, onMapClick }) {
  useMapEvents({
    dragend: (e) => {
      const center = e.target.getCenter();
      onMapMoveEnd(LatLng.fromRaw([center.lat, center.lng]));
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

export default function MapPanel({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  //
  selectedEnt,
  setSelectedEnt,
  setMapLatLng,
  //
  center,
  zoom,
  //
  onCurrentLocation,
  //
  setPageMode,
  pageMode,
}) {
  const [clickPoint, setClickPoint] = useState(null);

  const onMapMoveEnd = (latLng) => {
    setMapLatLng(latLng);
    setSelectedEnt(null);
  };

  const onMapClick = (containerPoint) => {
    setClickPoint(containerPoint);
    setTimeout(() => setClickPoint(null), 300);
  };

  return (
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

      <MapViewInner
        dsdNameId={dsdNameId}
        hydrometricStationNameId={hydrometricStationNameId}
        cityNameId={cityNameId}
        placeLatLngId={placeLatLngId}
        //
        selectedEnt={selectedEnt}
        setSelectedEnt={setSelectedEnt}
        setMapLatLng={setMapLatLng}
      />

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

          <Box
            sx={{
              position: "absolute",
              top: "72px",
              right: "16px",
              zIndex: 1000,
            }}
          >
            <AlertLegend onViewDetails={() => setPageMode("Alerts")} />
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: "56px",
              right: "0px",
              zIndex: 1000,
              margin: "16px",
            }}
          >
            <IconButton
              onClick={onCurrentLocation}
              sx={{
                backgroundColor: COLORS.neutralLightest,
                "&:hover": {
                  backgroundColor: COLORS.neutralLight,
                },
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            >
              <MyLocationIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </MapContainer>
  );
}
