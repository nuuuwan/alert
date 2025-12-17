import { createContext, useContext, useState, useEffect } from "react";
import Place from "./ents/places/Place";
import LatLng from "../base/geos/LatLng";
import GeoLocation from "../base/GeoLocation";
import HydrometricStation from "./ents/places/HydrometricStation";
import City from "./ents/places/City";

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
  const [dsd, setDSD] = useState(null);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);

  // Fetch browser location on initial load
  useEffect(() => {
    const hasSomeEntParam =
      dsdNameId || hydrometricStationNameId || cityNameId || placeLatLngId;

    async function fetchBrowserLocation() {
      const latLng = await GeoLocation.getCurrentLatLng();
      if (!hasSomeEntParam && latLng) {
        const place = await Place.load({ latLng });
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

  // Fetch hydrometric station
  useEffect(() => {
    async function fetchHydrometricStation() {
      if (hydrometricStationNameId) {
        const hydrometricStation = await HydrometricStation.loadFromName(
          hydrometricStationNameId
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

  // Fetch city
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

  // Fetch place by LatLng
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

  return (
    <SelectedEntDataContext.Provider
      value={{ selectedEnt, dsd, district, province }}
    >
      {children}
    </SelectedEntDataContext.Provider>
  );
}
