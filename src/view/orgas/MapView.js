import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CustomDrawer from "../moles/CustomDrawer";
import Place from "../../nonview/core/ents/places/Place";
import LatLng from "../../nonview/base/geos/LatLng";
import RiverStation from "../../nonview/core/ents/places/RiverStation";
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

export default function MapView() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [riverStations, setRiverStations] = useState([]);
  const [dsdEnts, setDsdEnts] = useState([]);

  useEffect(() => {
    async function fetch() {
      const riverStations = await RiverStation.loadAll();
      setRiverStations(riverStations);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetchDsdEnts() {
      const warningsData = await DSD.loadAllWarningData();
      const dsdIds = Object.keys(warningsData.dsdIDToLatestLandslideWarning);
      const dsdEnts = await DSD.loadFromIds(dsdIds);
      await Promise.all(dsdEnts.map((dsd) => dsd.loadDetails()));
      setDsdEnts(dsdEnts);
    }
    fetchDsdEnts();
  }, []);

  const handleMapClick = async (latLng) => {
    const place = await Place.load({ latLng: LatLng.fromRaw(latLng) });
    setSelectedPlace(place);
    setDrawerOpen(true);
  };

  const handleEntClick = (ent) => {
    setSelectedPlace(ent);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => {
    if (selectedPlace) {
      return `${selectedPlace.id}.png`;
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

        {riverStations.map((station) => (
          <MapPlaceView
            key={station.id}
            place={station}
            onClick={handleEntClick}
          />
        ))}

        {dsdEnts &&
          dsdEnts.map((dsd) => (
            <MapRegionView key={dsd.id} region={dsd} onClick={handleEntClick} />
          ))}
      </MapContainer>

      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={selectedPlace}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
      />
    </>
  );
}
