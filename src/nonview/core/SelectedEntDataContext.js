import { createContext, useContext, useEffect, useState } from "react";
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

export const useSelectedEntDataContext = () =>
  useContext(SelectedEntDataContext);

export function SelectedEntDataProvider({
  children,
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
  const [selectedStatus, setSelectedStatus] = useState("loading");
  const [selectedError, setSelectedError] = useState(null);
  const [nearbyStatus, setNearbyStatus] = useState("loading");
  const [reloadVersion, setReloadVersion] = useState(0);

  const reloadSelectedEnt = () => setReloadVersion((version) => version + 1);

  useEffect(() => {
    let isCurrent = true;

    async function loadSelectedEnt() {
      setSelectedStatus("loading");
      setSelectedError(null);
      setSelectedEnt(null);

      try {
        let entity;
        if (hydrometricStationNameId) {
          entity = await HydrometricStation.loadFromName(
            hydrometricStationNameId,
          );
        } else if (cityNameId) {
          entity = await City.loadFromName(cityNameId);
        } else if (hospitalNameId) {
          entity = await Hospital.loadFromName(hospitalNameId);
        } else if (policeStationNameId) {
          entity = await PoliceStation.loadFromName(policeStationNameId);
        } else if (fireStationNameId) {
          entity = await FireStation.loadFromName(fireStationNameId);
        } else {
          const latLng = placeLatLngId
            ? LatLng.fromId(placeLatLngId)
            : await GeoLocation.getCurrentLatLng();
          entity = await Place.load({ latLng });
        }

        if (!entity) {
          throw new Error("The selected location could not be found.");
        }
        await entity.loadDetails();

        if (isCurrent) {
          setSelectedEnt(entity);
          setMapLatLng(entity.latLng);
          setSelectedStatus("success");
        }
      } catch (error) {
        if (isCurrent) {
          setSelectedError(error);
          setSelectedStatus("error");
        }
      }
    }

    loadSelectedEnt();
    return () => {
      isCurrent = false;
    };
  }, [
    hydrometricStationNameId,
    cityNameId,
    hospitalNameId,
    policeStationNameId,
    fireStationNameId,
    placeLatLngId,
    setMapLatLng,
    reloadVersion,
  ]);

  useEffect(() => {
    let isCurrent = true;
    const fetchNearbyPlaces = async () => {
      if (!selectedEnt) return;
      setNearbyStatus("loading");
      try {
        const nearby = await Nearby.findNearbyPlaces(selectedEnt.latLng);
        if (isCurrent) {
          setNearbyPlaces(nearby);
          setNearbyStatus(nearby.length > 0 ? "success" : "empty");
        }
      } catch (error) {
        if (isCurrent) {
          setNearbyPlaces([]);
          setNearbyStatus("error");
        }
      }
    };
    fetchNearbyPlaces();
    return () => {
      isCurrent = false;
    };
  }, [selectedEnt]);

  return (
    <SelectedEntDataContext.Provider
      value={{
        selectedEnt,
        nearbyPlaces,
        setSelectedEnt,
        selectedStatus,
        selectedError,
        nearbyStatus,
        reloadSelectedEnt,
      }}
    >
      {children}
    </SelectedEntDataContext.Provider>
  );
}
