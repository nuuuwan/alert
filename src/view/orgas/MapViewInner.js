import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import Box from "@mui/material/Box";
import City from "../../nonview/core/ents/places/City";
import TimeUtils from "../../nonview/base/TimeUtils";

export default function MapViewInner({ selectedEnt }) {
  const [HydrometricStations, setHydrometricStations] = useState([]);
  const [majorCities, setMajorCities] = useState([]);

  useEffect(() => {
    async function fetch() {
      const HydrometricStations = await HydrometricStation.loadWithAlerts();
      setHydrometricStations(HydrometricStations);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      const majorCities = await City.loadAllMajor();
      Promise.all(
        majorCities.map(async (city) => {
          await city.loadDetails();
          await TimeUtils.sleep(0.5);
        })
      );
      setMajorCities(majorCities);
    }
    fetch();
  }, []);

  return (
    <Box>
      {[selectedEnt, ...HydrometricStations, ...majorCities].map(
        (station) =>
          station &&
          station.latLng && <MapPlaceView key={station.id} place={station} />
      )}
    </Box>
  );
}
