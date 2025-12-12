import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import MapViewInner from "./MapViewInner";
import LatLng from "../../nonview/base/geos/LatLng";
import GeoLocation from "../../nonview/base/GeoLocation";
import Place from "../../nonview/core/ents/places/Place";
import { useNavigate } from "react-router-dom";

function MapEventHandler({ onMapMoveEnd }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      onMapMoveEnd(LatLng.fromRaw([center.lat, center.lng]));
    },
  });
  return null;
}

function MapCenterUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(center);
  }, [map, center]);
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
  setSelectedLatLng,
  setMapLatLng,
  //
  center,
  zoom,
}) {
  const navigate = useNavigate();
  const hasSomeEntParam =
    dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;

  useEffect(() => {
    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
        setSelectedLatLng(latLng);
        setMapLatLng(latLng);
        navigate(place.url);
      }
    }
    fetchBrowserLocation();
  }, [hasSomeEntParam, navigate, setSelectedLatLng, setMapLatLng]);

  const onMapClick = async (latLng) => {
    navigate(`/Place/${latLng.id}`);
  };

  const onMapMoveEnd = (latLng) => {
    setMapLatLng(latLng);
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
      <MapEventHandler onMapClick={onMapClick} onMapMoveEnd={onMapMoveEnd} />

      <MapViewInner
        dsdNameId={dsdNameId}
        hydrometricStationNameId={hydrometricStationNameId}
        cityNameId={cityNameId}
        placeLatLngId={placeLatLngId}
        //
        setSelectedLatLng={setSelectedLatLng}
        //
        selectedEnt={selectedEnt}
        setSelectedEnt={setSelectedEnt}
        setMapLatLng={setMapLatLng}
      />

      <div id="map-crosshairs"></div>
    </MapContainer>
  );
}
