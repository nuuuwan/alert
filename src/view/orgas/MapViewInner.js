import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import MapRegionView from "../moles/MapRegionView";
import CustomDrawer from "../moles/CustomDrawer";
import EntDetails from "../moles/EntDetails";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import Box from "@mui/material/Box";
import Place from "../../nonview/core/ents/places/Place";
import City from "../../nonview/core/ents/places/City";
import LatLng from "../../nonview/base/geos/LatLng";

export default function MapViewInner({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  //
  centerLatLng,
  setCenterLatLng,
  //
  isDrawerOpen,
  setDrawerOpen,
  //
}) {
  const [selectedEnt, setSelectedEnt] = useState(null);
  const [HydrometricStations, setHydrometricStations] = useState([]);
  const [dsdEnts, setDsdEnts] = useState([]);

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
          setCenterLatLng(dsd.getCentroidLatLng());
        }
      }
    }
    fetchSelectedDsd();
  }, [dsdNameId, setCenterLatLng]);

  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationNameId) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationNameId
        );
        if (hydrometricStation) {
          await hydrometricStation.loadDetails();
          setSelectedEnt(hydrometricStation);
          setCenterLatLng(hydrometricStation.latLng);
        }
      }
    }
    fetchHydrometricStation();
  }, [hydrometricStationNameId, setCenterLatLng]);

  useEffect(() => {
    async function fetchCity() {
      if (cityNameId) {
        const city = await City.loadFromName(cityNameId);
        if (city) {
          await city.loadDetails();
          setSelectedEnt(city);
          setCenterLatLng(city.latLng);
        }
      }
    }
    fetchCity();
  }, [cityNameId, setCenterLatLng]);

  useEffect(() => {
    async function fetchPlace() {
      if (placeLatLngId) {
        const latLng = LatLng.fromId(placeLatLngId);
        const place = await Place.load({ latLng });
        if (place) {
          await place.loadDetails();
          setSelectedEnt(place);
          setCenterLatLng(place.latLng);
        }
      }
    }
    fetchPlace();
  }, [placeLatLngId, setCenterLatLng]);

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
        selectedEnt={selectedEnt}
        renderContent={(ent) => <EntDetails ent={ent} />}
        getFileName={getFileName}
      />
    </Box>
  );
}
