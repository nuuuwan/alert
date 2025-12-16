import { useEffect, useState } from "react";
import MapPlaceView from "../moles/MapPlaceView";
import HydrometricStation from "../../nonview/core/ents/places/HydrometricStation";
import Box from "@mui/material/Box";

export default function MapViewInner({ selectedEnt }) {
  const [HydrometricStations, setHydrometricStations] = useState([]);

  // Default Multiple Ent Loading

  useEffect(() => {
    async function fetch() {
      const HydrometricStations = await HydrometricStation.loadWithAlerts();
      setHydrometricStations(HydrometricStations);
    }
    fetch();
  }, []);

  return (
    <Box>
      {[selectedEnt, ...HydrometricStations].map(
        (station) =>
          station &&
          station.latLng && <MapPlaceView key={station.id} place={station} />
      )}
    </Box>
  );
}
