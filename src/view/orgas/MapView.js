import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import LatLng from "../../nonview/base/geos/LatLng";
import { useNavigate } from "react-router-dom";
import MapViewInner from "./MapViewInner";
import GeoLocation from "../../nonview/base/GeoLocation";
import Box from "@mui/material/Box";
import Place from "../../nonview/core/ents/places/Place";
import CustomDrawer from "../moles/CustomDrawer";
import EntDetails from "../moles/EntDetails";

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

    // moveend(e) {
    //   const centre = map.getCenter();
    //   const latLng = LatLng.fromRaw([
    //     parseFloat(centre.lat),
    //     parseFloat(centre.lng),
    //   ]);
    //   onMapClickOrMoveEnd(latLng);
    // },
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

export default function MapView({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  isDrawerOpen,
  setDrawerOpen,
}) {
  const [selectedEnt, setSelectedEnt] = useState(null);
  const navigate = useNavigate();
  const hasSomeEntParam =
    dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;

  const [centerLatLng, setCenterLatLng] = useState(
    LatLng.fromRaw(DEFAULT_CENTER)
  );

  const onMapClickOrMoveEnd = async (latLng) => {
    navigate(`/Place/${latLng.id}`);
  };

  const center = centerLatLng.raw() || DEFAULT_CENTER;
  const zoom = DEFAULT_ZOOM;

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
  }, [hasSomeEntParam, navigate]);

  const getFileName = () => {
    if (selectedEnt) {
      return `${selectedEnt.id}.png`;
    }
    return "location.png";
  };

  return (
    <Box>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "50vh", width: "100%" }}
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
      <CustomDrawer
        selectedEnt={selectedEnt}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
      />
    </Box>
  );
}
