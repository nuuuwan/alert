import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import MapRegionView from "../moles/MapRegionView";
import CustomDrawer from "../moles/CustomDrawer";
import EntDetails from "../moles/EntDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import GeoLocation from "../../nonview/base/GeoLocation";
import Box from "@mui/material/Box";
import Place from "../../nonview/core/ents/places/Place";
import City from "../../nonview/core/ents/places/City";
import LatLng from "../../nonview/base/geos/LatLng";

export default function MapViewInner({
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

  // Default Multiple Ent Loading

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

  // Single Ent Loading

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
