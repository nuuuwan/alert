import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import LatLng from "../../nonview/base/geos/LatLng";
import { useNavigate } from "react-router-dom";
import MapViewInner from "./MapViewInner"; // Updated import

function MapClickHandler({ onMapClick, setCenterLatLng }) {
  const map = useMapEvents({
    click(e) {
      const centre = e.latlng;
      const latLng = LatLng.fromRaw([
        parseFloat(centre.lat),
        parseFloat(centre.lng),
      ]);
      onMapClick(latLng);
      setCenterLatLng(latLng);
    },

    moveend(e) {
      const centre = map.getCenter();
      const latLng = LatLng.fromRaw([
        parseFloat(centre.lat),
        parseFloat(centre.lng),
      ]);
      onMapClick(latLng);
      setCenterLatLng(latLng);
    },
  });

  return null;
}

export default function MapView({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  isDrawerOpen,
  setDrawerOpen,
}) {
  const navigate = useNavigate();
  const [centerLatLng, setCenterLatLng] = useState(
    LatLng.fromRaw(DEFAULT_CENTER)
  );
  const mapRef = useRef();

  const handleMapClick = async (latLng) => {
    navigate(`/Place/${latLng.id}`);
  };

  let center = DEFAULT_CENTER;
  let zoom = DEFAULT_ZOOM;

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler
          onMapClick={handleMapClick}
          setCenterLatLng={setCenterLatLng}
        />

        <MapViewInner
          centerLatLng={centerLatLng}
          dsdNameId={dsdNameId}
          hydrometricStationNameId={hydrometricStationNameId}
          cityNameId={cityNameId}
          placeLatLngId={placeLatLngId}
          isDrawerOpen={isDrawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        <div id="map-crosshairs"></div>
      </MapContainer>
    </>
  );
}
