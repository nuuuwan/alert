import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CustomDrawer from "../moles/CustomDrawer";
import Place from "../../nonview/core/ents/places/Place";
import LatLng from "../../nonview/base/geos/LatLng";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import MapPlaceView from "../moles/MapPlaceView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import MapRegionView from "../moles/MapRegionView";
import EntDetails from "../moles/EntDetails";
import { useNavigate } from "react-router-dom";
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat.toFixed(4), e.latlng.lng.toFixed(4)]);
    },
  });
  return null;
}

function MapCenterZoomUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
    if (zoom) {
      map.setZoom(zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({
  dsdName,
  hydrometricStationName,
  placeLatLng,
}) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(
    dsdName || hydrometricStationName || placeLatLng ? true : false
  );
  const [selectedEnt, setSelectedEnt] = useState(null);
  const [HydrometricStations, setHydrometricStations] = useState([]);
  const [dsdEnts, setDsdEnts] = useState([]);

  useEffect(() => {
    async function fetch() {
      const HydrometricStations = await HydrometricStation.loadWithAlerts();
      setHydrometricStations(HydrometricStations);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetchDsdEnts() {
      const dsdEnts = await DSD.loadWithAlerts();
      await Promise.all(dsdEnts.map((dsd) => dsd.loadDetails()));
      setDsdEnts(dsdEnts);
    }
    fetchDsdEnts();
  }, []);

  useEffect(() => {
    async function fetchSelectedDsd() {
      if (dsdName) {
        const dsd = await DSD.loadFromName(dsdName);
        if (dsd) {
          await dsd.loadDetails();
          setSelectedEnt(dsd);
          setDrawerOpen(true);
        }
      }
    }
    fetchSelectedDsd();
  }, [dsdName]);

  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationName) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationName
        );
        if (hydrometricStation) {
          await hydrometricStation.loadDetails();
          setSelectedEnt(hydrometricStation);
          setDrawerOpen(true);
        }
      }
    }
    fetchHydrometricStation();
  }, [hydrometricStationName]);

  useEffect(() => {
    async function fetchPlace() {
      if (placeLatLng) {
        const [lat, lng] = placeLatLng.split(",").map(Number);
        const place = await Place.load({ latLng: LatLng.fromRaw([lat, lng]) });
        if (place) {
          await place.loadDetails();
          setSelectedEnt(place);
          setDrawerOpen(true);
        }
      }
    }
    fetchPlace();
  }, [placeLatLng]);

  const handleMapClick = async (latLng) => {
    navigate(`/alert/Place/${latLng[0]},${latLng[1]}`);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => {
    if (selectedEnt) {
      return `${selectedEnt.id}.png`;
    }
    return "location.png";
  };

  let center = DEFAULT_CENTER;
  let zoom = DEFAULT_ZOOM;

  if (selectedEnt && selectedEnt.latLng) {
    center = [selectedEnt.latLng.lat, selectedEnt.latLng.lng];
    zoom = 14;
  }

  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <MapCenterZoomUpdater center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onMapClick={handleMapClick} />

        {HydrometricStations &&
          HydrometricStations.map((station) => (
            <MapPlaceView key={station.id} place={station} />
          ))}

        {dsdEnts &&
          dsdEnts.map((dsd) => <MapRegionView key={dsd.id} region={dsd} />)}
      </MapContainer>

      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={selectedEnt}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
      />
    </>
  );
}
