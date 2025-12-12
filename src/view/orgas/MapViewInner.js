import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import MapRegionView from "../moles/MapRegionView";
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
  setSelectedLatLng,
  //
  setMapLatLng,
  selectedEnt,
  setSelectedEnt,
}) {
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
          setSelectedLatLng(dsd.getCentroidLatLng());
          setMapLatLng(dsd.getCentroidLatLng());
        }
      }
    }
    fetchSelectedDsd();
  }, [dsdNameId, setSelectedLatLng, setSelectedEnt, setMapLatLng]);

  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationNameId) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationNameId
        );
        if (hydrometricStation) {
          await hydrometricStation.loadDetails();
          setSelectedEnt(hydrometricStation);
          setSelectedLatLng(hydrometricStation.latLng);
          setMapLatLng(hydrometricStation.latLng);
        }
      }
    }
    fetchHydrometricStation();
  }, [
    hydrometricStationNameId,
    setSelectedLatLng,
    setSelectedEnt,
    setMapLatLng,
  ]);

  useEffect(() => {
    async function fetchCity() {
      if (cityNameId) {
        const city = await City.loadFromName(cityNameId);
        if (city) {
          await city.loadDetails();
          setSelectedEnt(city);
          setSelectedLatLng(city.latLng);
          setMapLatLng(city.latLng);
        }
      }
    }
    fetchCity();
  }, [cityNameId, setSelectedLatLng, setSelectedEnt, setMapLatLng]);

  useEffect(() => {
    async function fetchPlace() {
      if (placeLatLngId) {
        const latLng = LatLng.fromId(placeLatLngId);
        const place = await Place.load({ latLng });
        if (place) {
          await place.loadDetails();
          setSelectedEnt(place);
          setSelectedLatLng(place.latLng);
        }
      }
    }
    fetchPlace();
  }, [placeLatLngId, setSelectedLatLng, setSelectedEnt, setMapLatLng]);

  return (
    <Box>
      {[selectedEnt, ...HydrometricStations].map(
        (station) =>
          station &&
          station.latLng && <MapPlaceView key={station.id} place={station} />
      )}

      {dsdEnts &&
        dsdEnts.map((dsd) => <MapRegionView key={dsd.id} region={dsd} />)}
    </Box>
  );
}
