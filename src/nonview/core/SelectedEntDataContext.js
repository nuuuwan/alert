import { createContext, useContext, useState, useEffect } from "react";
import Place from "./ents/places/Place";
import LatLng from "../base/geos/LatLng";
import GeoLocation from "../base/GeoLocation";
import HydrometricStation from "./ents/places/HydrometricStation";
import City from "./ents/places/City";
import Hospital from "./ents/places/Hospital";
import PoliceStation from "./ents/places/PoliceStation";
import FireStation from "./ents/places/FireStation";
import Nearby from "./Nearby";

const SelectedEntDataContext = createContext();

export const useSelectedEntDataContext = () => {
  return useContext(SelectedEntDataContext);
};

export function SelectedEntDataProvider({
  children,
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  hospitalNameId,
  policeStationNameId,
  fireStationNameId,
  placeLatLngId,
  setMapLatLng,
}) {
  const [selectedEnt, setSelectedEnt] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const hasSomeEntParam =
      dsdNameId ||
      hydrometricStationNameId ||
      cityNameId ||
      policeStationNameId ||
      fireStationNameId ||
      hospitalNameId ||
      placeLatLngId;

    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
        await place.loadDetails();
        setMapLatLng(latLng);
        setSelectedEnt(place);
      }
    }
    fetchBrowserLocation();
  }, [
    dsdNameId,
    hydrometricStationNameId,
    cityNameId,
    policeStationNameId,
    fireStationNameId,
    hospitalNameId,
    placeLatLngId,
    setMapLatLng,
  ]);

  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationNameId) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationNameId,
        );
        if (hydrometricStation) {
          await hydrometricStation.loadDetails();
          setSelectedEnt(hydrometricStation);
          setMapLatLng(hydrometricStation.latLng);
        }
      }
    }
    fetchHydrometricStation();
  }, [hydrometricStationNameId, setMapLatLng]);

  useEffect(() => {
    async function fetchCity() {
      if (cityNameId) {
        const city = await City.loadFromName(cityNameId);
        if (city) {
          await city.loadDetails();
          setSelectedEnt(city);
          setMapLatLng(city.latLng);
        }
      }
    }
    fetchCity();
  }, [cityNameId, setMapLatLng]);

  useEffect(() => {
    async function fetchHospital() {
      if (hospitalNameId) {
        const hospital = await Hospital.loadFromName(hospitalNameId);
        if (hospital) {
          await hospital.loadDetails();
          setSelectedEnt(hospital);
          setMapLatLng(hospital.latLng);
        }
      }
    }
    fetchHospital();
  }, [hospitalNameId, setMapLatLng]);

  useEffect(() => {
    async function fetchPoliceStation() {
      if (policeStationNameId) {
        const policeStation =
          await PoliceStation.loadFromName(policeStationNameId);
        if (policeStation) {
          await policeStation.loadDetails();
          setSelectedEnt(policeStation);
          setMapLatLng(policeStation.latLng);
        }
      }
    }
    fetchPoliceStation();
  }, [policeStationNameId, setMapLatLng]);

  useEffect(() => {
    async function fetchFireStation() {
      if (fireStationNameId) {
        const fireStation = await FireStation.loadFromName(fireStationNameId);
        if (fireStation) {
          await fireStation.loadDetails();
          setSelectedEnt(fireStation);
          setMapLatLng(fireStation.latLng);
        }
      }
    }
    fetchFireStation();
  }, [fireStationNameId, setMapLatLng]);

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
    const fetchNearbyPlaces = async () => {
      if (selectedEnt) {
        const latLng = selectedEnt.latLng;
        const nearby = await Nearby.findNearbyPlaces(latLng);
        setNearbyPlaces(nearby);
      }
    };

    fetchNearbyPlaces();
  }, [selectedEnt]);

  return (
    <SelectedEntDataContext.Provider value={{ selectedEnt, nearbyPlaces }}>
      {children}
    </SelectedEntDataContext.Provider>
  );
}
