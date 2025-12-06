import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CustomDrawer from "../moles/CustomDrawer";
import PlaceDetails from "../orgas/PlaceDetails";
import Place from "../../nonview/core/ents/places/Place";
import LatLng from "../../nonview/base/geos/LatLng";
import RiverStation from "../../nonview/core/ents/places/RiverStation";

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

  useEffect(() => {
    async function fetch() {
      const riverStations = await RiverStation.loadAll();
      setRiverStations(riverStations);
    }
    fetch();
  }, []);

  if (riverStations) {
    console.debug({ riverStations });
  }

  const handleMapClick = async (latLng) => {
    const place = await Place.load({ latLng: LatLng.fromLatLngFloats(latLng) });
    setSelectedPlace(place);
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
      </MapContainer>

      <CustomDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        selectedItem={selectedPlace}
        renderContent={(place) => <PlaceDetails place={place} />}
        getFileName={getFileName}
      />
    </>
  );
}
