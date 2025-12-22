import { createContext, useContext, useState, useEffect } from "react";
import Place from "./ents/places/Place";
import LatLng from "../base/geos/LatLng";
import GeoLocation from "../base/GeoLocation";
import HydrometricStation from "./ents/places/HydrometricStation";
import City from "./ents/places/City";
import Nearby from "./Nearby";
import toast, { Toaster } from "react-hot-toast";

const SelectedEntDataContext = createContext();

export const useSelectedEntDataContext = () => {
  return useContext(SelectedEntDataContext);
};

export function SelectedEntDataProvider({
  children,
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
  setMapLatLng,
}) {
  const [selectedEnt, setSelectedEnt] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  useEffect(() => {
    const hasSomeEntParam =
      dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;

    async function fetchBrowserLocation() {
      if (hasSomeEntParam) return;
      const { latLng, isDefault } = await GeoLocation.getCurrentLatLng();
      // if the user denied the location permission
      if (isDefault) {
        toast.error(
          "Location access denied. Using default location (Colombo).",
          { duration: 5000, id: 'location-denied' }
        );
      } else {
        // if the user give the permission to access location
        toast.success("Location accessed!", { duration: 5000, id: 'location-accessed' })
      }
      if (latLng) {
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
  <>
    <Toaster position="top-center"/>
    <SelectedEntDataContext.Provider value={{ selectedEnt, nearbyPlaces }}>
      {children}
    </SelectedEntDataContext.Provider>
  </>
  );
}
