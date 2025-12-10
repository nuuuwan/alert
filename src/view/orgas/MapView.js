import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "../../nonview/cons/MapConstants";
import CustomDrawer from "../moles/CustomDrawer";
import Place from "../../nonview/core/ents/places/Place";
import LatLng from "../../nonview/base/geos/LatLng";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import City from "../../nonview/core/ents/places/City";
import MapPlaceView from "../moles/MapPlaceView";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import MapRegionView from "../moles/MapRegionView";
import EntDetails from "../moles/EntDetails";
import { useNavigate } from "react-router-dom";
import GeoLocation from "../../nonview/base/GeoLocation";
import Box from "@mui/material/Box";

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

function MapViewInner({
  centerLatLng,
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  isDrawerOpen,
  setDrawerOpen,
}) {
  const hasSomeEntParam =
    dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;
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
        }
      }
    }
    fetchHydrometricStation();
  }, [hydrometricStationNameId]);

  useEffect(() => {
    async function fetchCity() {
      if (cityNameId) {
        const city = await City.loadFromName(cityNameId);
        if (city) {
          await city.loadDetails();
          setSelectedEnt(city);
        }
      }
    }
    fetchCity();
  }, [cityNameId]);

  useEffect(() => {
    async function fetchPlace() {
      if (placeLatLngId) {
        const latLng = LatLng.fromId(placeLatLngId);
        const place = await Place.load({ latLng });
        if (place) {
          await place.loadDetails();
          setSelectedEnt(place);
        }
      }
    }
    fetchPlace();
  }, [placeLatLngId]);

  useEffect(() => {
    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      setBrowserLatLng(latLng);
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
        await place.loadDetails();
        setSelectedEnt(place);
      }
    }
    fetchBrowserLocation();
  }, [hasSomeEntParam]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getFileName = () => {
    if (selectedEnt) {
      return `${selectedEnt.id}.png`;
    }
    return "location.png";
  };

  if (selectedEnt) {
    // if (selectedEnt.latLng) {
    //   center = [selectedEnt.latLng.lat, selectedEnt.latLng.lng];
    //   zoom = DEFAULT_ZOOM + 4;
    // }
    window.document.title = `ALERT - ${selectedEnt.title}`;
  }

  return (
    <Box>
      {[selectedEnt, ...HydrometricStations].map(
        (station) =>
          station &&
          station.latLng && <MapPlaceView key={station.id} place={station} />
      )}

      {dsdEnts &&
        dsdEnts.map((dsd) => <MapRegionView key={dsd.id} region={dsd} />)}

      <CustomDrawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        selectedEnt={selectedEnt}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
        browserLatLng={browserLatLng}
      />
    </Box>
  );
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
