import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
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
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapView({ dsdName, hydrometricStationName }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const handleMapClick = async (latLng) => {
    const place = await Place.load({ latLng: LatLng.fromRaw(latLng) });
    setSelectedEnt(place);
    setDrawerOpen(true);
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

  return (
    <>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
      >
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
