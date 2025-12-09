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
import GeoLocation from "../../nonview/base/GeoLocation";
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      const latLng = LatLng.fromRaw([
        parseFloat(e.latlng.lat),
        parseFloat(e.latlng.lng),
      ]);
      onMapClick(latLng);
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
  dsdNameId,
  hydrometricStationNameId,
  placeLatLngId,
}) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(
    dsdNameId || hydrometricStationNameId || placeLatLngId ? true : false
  );
  const [selectedEnt, setSelectedEnt] = useState(null);
  const [HydrometricStations, setHydrometricStations] = useState([]);
  const [dsdEnts, setDsdEnts] = useState([]);
  const [browserLatLng, setBrowserLatLng] = useState(null);

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
      if (dsdNameId) {
        const dsd = await DSD.loadFromName(dsdNameId);
        if (dsd) {
          await dsd.loadDetails();
          setSelectedEnt(dsd);
          setDrawerOpen(true);
        }
      }
    }
    fetchSelectedDsd();
  }, [dsdNameId]);

  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationNameId) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationNameId
        );
        if (hydrometricStation) {
          await hydrometricStation.loadDetails();
          setSelectedEnt(hydrometricStation);
          setDrawerOpen(true);
        }
      }
    }
    fetchHydrometricStation();
  }, [hydrometricStationNameId]);

  useEffect(() => {
    async function fetchPlace() {
      if (placeLatLngId) {
        const latLng = LatLng.fromId(placeLatLngId);
        const place = await Place.load({ latLng });
        if (place) {
          await place.loadDetails();
          setSelectedEnt(place);
          setDrawerOpen(true);
        }
      }
    }
    fetchPlace();
  }, [placeLatLngId]);

  useEffect(() => {
    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      setBrowserLatLng(latLng);
    }
    fetchBrowserLocation();
  }, []);

  const handleMapClick = async (latLng) => {
    navigate(`/Place/${latLng.id}`);
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
  const zoom = DEFAULT_ZOOM;

  if (selectedEnt) {
    if (selectedEnt.latLng) {
      center = [selectedEnt.latLng.lat, selectedEnt.latLng.lng];
    }
    window.document.title = `ALERT - ${selectedEnt.title}`;
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

        {[selectedEnt, ...HydrometricStations].map(
          (station) =>
            station &&
            station.latLng && <MapPlaceView key={station.id} place={station} />
        )}

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
