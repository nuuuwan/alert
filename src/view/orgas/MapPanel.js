import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import MapViewInner from "./MapViewInner";
import LatLng from "../../nonview/base/geos/LatLng";
import GeoLocation from "../../nonview/base/GeoLocation";
import Place from "../../nonview/core/ents/places/Place";
import { useNavigate } from "react-router-dom";

function MapEventHandler({ onMapClickOrMoveEnd }) {
  useMapEvents({
    click(e) {
      const centre = e.latlng;
      const latLng = LatLng.fromRaw([
        parseFloat(centre.lat),
        parseFloat(centre.lng),
      ]);
      onMapClickOrMoveEnd(latLng);
    },
  });
  return null;
}

function MapCenterUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    map.panTo(center);
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
  setCenterLatLng,
  //
  onMapClickOrMoveEnd,
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
        setCenterLatLng(latLng);
        navigate(place.url);
      }
    }
    fetchBrowserLocation();
  }, [hasSomeEntParam, navigate, setCenterLatLng]);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "33vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapCenterUpdater center={center} zoom={zoom} />
      <MapEventHandler onMapClickOrMoveEnd={onMapClickOrMoveEnd} />

      <MapViewInner
        dsdNameId={dsdNameId}
        hydrometricStationNameId={hydrometricStationNameId}
        cityNameId={cityNameId}
        placeLatLngId={placeLatLngId}
        //
        setCenterLatLng={setCenterLatLng}
        //
        selectedEnt={selectedEnt}
        setSelectedEnt={setSelectedEnt}
      />

      <div id="map-crosshairs"></div>
    </MapContainer>
  );
}
