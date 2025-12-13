import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import MapRegionView from "../moles/MapRegionView";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import DSD from "../../nonview/core/ents/regions/admin_regions/DSD";
import Box from "@mui/material/Box";
import Place from "../../nonview/core/ents/places/Place";

export default function MapViewInner({
  dsdNameId,
  hydrometricStationNameId,
  cityNameId,
  placeLatLngId,
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
      let dsdEnts = await DSD.loadWithAlerts();
      if (selectedEnt) {
        if (selectedEnt instanceof DSD) {
          dsdEnts.push(selectedEnt);
        } else if (selectedEnt instanceof Place) {
          const dsd = selectedEnt.dsd;
          if (dsd) {
            dsdEnts.push(dsd);
          }
        }
      }
      await Promise.all(dsdEnts.map((dsd) => dsd.loadDetails()));
      setDsdEnts(dsdEnts);
    }
    fetchDsdEnts();
  }, [selectedEnt]);

  return (
    <Box>
      {[selectedEnt, ...HydrometricStations].map(
        (station) =>
          station &&
          station.latLng && <MapPlaceView key={station.id} place={station} />,
      )}

      {dsdEnts &&
        dsdEnts.map((dsd) => <MapRegionView key={dsd.id} region={dsd} />)}
    </Box>
  );
}
