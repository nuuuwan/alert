import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import MapViewInner from "./MapViewInner";
import MapCrosshair from "../atoms/MapCrosshair";
import LatLng from "../../nonview/base/geos/LatLng";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { COLORS } from "../_cons/StyleConstants";
function MapEventHandler({ onMapMoveEnd }) {
  useMapEvents({
    dragend: (e) => {
      const center = e.target.getCenter();
      onMapMoveEnd(LatLng.fromRaw([center.lat, center.lng]));
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
  pageMode,
}) {
  const onMapMoveEnd = (latLng) => {
    setMapLatLng(latLng);
    setSelectedEnt(null);
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
      <MapEventHandler onMapMoveEnd={onMapMoveEnd} />

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
